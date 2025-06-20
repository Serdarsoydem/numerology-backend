module.exports = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
    prefix: '/api'
  },
  routes: [
    {
      method: 'POST',
      path: '/payments/process-3d',
      handler: 'payment.process3DPayment',
      config: {
        auth: true,
        policies: ['is-authenticated']
      }
    }
  ]
}; 