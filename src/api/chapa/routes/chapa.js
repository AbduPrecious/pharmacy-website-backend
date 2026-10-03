'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/chapa/initialize',
      handler: 'chapa.initialize',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/chapa/verify/:tx_ref',
      handler: 'chapa.verify',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/chapa/verify/:tx_ref',
      handler: 'chapa.verify',
      config: { auth: false },
    },
  ],
};