// src/api/blog/routes/custom-blog.js

export default {
  routes: [
    {
      method: 'GET',
      path: '/newses/slug/:slug',
      handler: 'news.findBySlug', // Reference the custom controller method
      config: {
        auth: false,  // Set to true if you need authentication
      },
    },
  ],
};
