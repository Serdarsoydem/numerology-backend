// src/api/blog/routes/custom-blog.js

export default {
  routes: [
    {
      method: 'GET',
      path: '/blogs/slug/:slug',
      handler: 'blog.findBySlug', // Reference the custom controller method
      config: {
        auth: false,  // Set to true if you need authentication
      },
    },
  ],
};
