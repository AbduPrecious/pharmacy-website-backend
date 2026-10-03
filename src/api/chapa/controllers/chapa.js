const axios = require('axios');

async function getUserIdFromToken(ctx) {
  try {
    // Koa exposes headers at ctx.request.headers (lowercase keys).
    // Try both forms in case of any Koa version quirk.
    const headers = ctx.request.headers || ctx.request.header || {};
    const auth = headers.authorization || headers.Authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      console.log('VERIFY: no Authorization header present');
      return null;
    }
    const token = auth.substring(7);
    const payload = await strapi
      .plugin('users-permissions')
      .service('jwt')
      .verify(token);
    console.log('VERIFY: resolved user id from token =', payload?.id);
    return payload?.id || null;
  } catch (err) {
    console.log('VERIFY: token verify failed =', err.message);
    return null;
  }
}

function sanitizeItems(rawItems) {
  if (!Array.isArray(rawItems)) return [];
  return rawItems
    .map((it) => ({
      name: String(it?.name || '').trim(),
      price: Number(it?.price) || 0,
      quantity: Number(it?.quantity) || 1,
      image: it?.image ? String(it.image) : null,
    }))
    .filter((it) => it.name.length > 0);
}

module.exports = {
  async initialize(ctx) {
    console.log('BODY RECEIVED:', ctx.request.body);
    const { amount, email, first_name, last_name, tx_ref } = ctx.request.body;

    const payload = {
      amount: String(amount),
      currency: 'ETB',
      email,
      first_name,
      last_name,
      tx_ref,
      callback_url: `${process.env.STRAPI_URL}/api/chapa/verify/${tx_ref}`,
      return_url: `${process.env.CLIENT_URL}/payment-success?tx_ref=${tx_ref}`,
    };

    console.log('SENDING TO CHAPA:', payload);

    try {
      const response = await axios.post(
        'https://api.chapa.co/v1/transaction/initialize',
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          },
        }
      );

      ctx.send(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      ctx.badRequest('Payment initialization failed', {
        error: err.response?.data,
      });
    }
  },

  async verify(ctx) {
    const { tx_ref } = ctx.params;

    try {
      const response = await axios.get(
        `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          },
        }
      );

      const status =
        response.data.data.status === 'success' ? 'success' : 'failed';

      const userId = await getUserIdFromToken(ctx);
      const items = sanitizeItems(ctx.request.body?.items);

      console.log('VERIFY: tx_ref =', tx_ref);
      console.log('VERIFY: userId =', userId, '| items count =', items.length);

      const existing = await strapi.db
        .query('api::payment.payment')
        .findOne({ where: { tx_ref } });

      if (existing) {
        const updateData = { status };
        // Always set user when we have one — don't gate on existing.user
        if (userId) {
          updateData.user = userId;
        }
        if (items.length > 0) {
          updateData.items = items;
        }

        await strapi.entityService.update(
          'api::payment.payment',
          existing.id,
          { data: updateData }
        );
        console.log('VERIFY: updated payment id', existing.id, '→', Object.keys(updateData));
      } else {
        const createData = {
          tx_ref,
          amount: response.data.data.amount,
          email: response.data.data.email,
          status,
          customer_name: `${response.data.data.first_name || ''} ${
            response.data.data.last_name || ''
          }`.trim(),
        };
        if (userId) createData.user = userId;
        if (items.length > 0) createData.items = items;

        const created = await strapi.entityService.create('api::payment.payment', {
          data: createData,
        });
        console.log('VERIFY: created payment id', created.id);
      }

      ctx.send(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      ctx.badRequest('Verification failed', { error: err.response?.data });
    }
  },
};