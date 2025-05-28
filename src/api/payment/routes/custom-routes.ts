export default {
    routes: [
      {
        method: 'POST',
        path: '/payment/generate-hash',
        handler: 'payment.generateHash',
        config: {
            policies: [],
            middlewares: [],
        },
      },
    ],
  };
  