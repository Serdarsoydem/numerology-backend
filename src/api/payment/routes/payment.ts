'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/payment/hash',
      handler: 'payment.generateHash',
      config: {
        auth: { enabled: true }, // ✅
      },
    },
    {
      method: 'POST',
      path: '/payment/getSipayToken',
      handler: 'payment.getSipayToken',
      config: {
        auth: { enabled: true }, // ✅
      },
    },
    /*{
      method: 'POST',
      path: '/payment/process-3d',
      handler: 'payment.process3DPayment',
      config: {
        auth: { enabled: true }, // ✅
      },
    },*/
    {
      method: 'POST',
      path: '/payment/callback',
      handler: 'payment.handlePaymentCallback',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/payment/initiate',
      handler: 'payment.initiate',
      config: {
        auth: false,
      },
    },
  ],
};
