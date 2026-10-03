'use strict';

module.exports = {
  async me(ctx) {
    const auth = ctx.state.user;
    if (!auth) {
      return ctx.unauthorized();
    }

    const user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      auth.id,
      {
        populate: {
          payments: {
            populate: ['items'],
          },
        },
      }
    );

    if (!user) {
      return ctx.notFound();
    }

    const { password, resetPasswordToken, confirmationToken, ...safe } = user;
    ctx.body = safe;
  },
};