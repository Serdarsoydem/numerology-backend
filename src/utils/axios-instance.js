'use strict';

const axios = require('axios');

const createAxiosInstance = (config = {}) => {
  const instance = axios.create({
    baseURL: process.env.SIPAY_API_URL || 'https://app.sipay.com.tr',
    headers: {
      'Content-Type': 'application/json',
      'App-Key': process.env.SIPAY_APP_KEY,
      'App-Secret': process.env.SIPAY_APP_SECRET
    },
    ...config
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Sipay token'ı varsa ekle
      const token = process.env.SIPAY_TOKEN;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        // Log payment errors
        await strapi.service('api::payment-log.payment-log').create({
          data: {
            type: 'error',
            status: error.response.status,
            error_message: error.response.data?.message || error.message,
            error_details: JSON.stringify(error.response.data)
          }
        });

        // Token expired veya geçersiz
        if (error.response.status === 401) {
          // Token yenileme işlemi burada yapılabilir
          console.error('Sipay token expired or invalid');
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

module.exports = createAxiosInstance; 