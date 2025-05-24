'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/consultants',
      handler: 'author.find',
      config: {
        auth: false, // Make the endpoint publicly accessible
      },
    },
  ],
};
