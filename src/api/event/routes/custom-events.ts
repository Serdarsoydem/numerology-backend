
export default {
  routes: [
    {
      method: 'GET',
      path: '/events/slug/:slug',
      handler: 'event.findBySlug', // Reference the custom controller method
      config: {
        auth: false,  // Set to true if you need authentication
      },
    },
    {
      method: "POST",
      path: "/events/:id/join",
      handler: "event.joinEvent",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
