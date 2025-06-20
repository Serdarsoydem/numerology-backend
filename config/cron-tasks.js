module.exports = {
  /**
   * Tekrarlayan ödemeleri her gün saat 02:00'de kontrol et ve işle
   */
  processRecurringPayments: {
    task: async ({ strapi }) => {
      try {
        await strapi.service('api::payment.payment').processRecurringPayments();
      } catch (error) {
        console.error('Error in recurring payments cron job:', error);
      }
    },
    options: {
      rule: '0 2 * * *', // Her gün saat 02:00'de çalış
      tz: 'Europe/Istanbul'
    }
  }
}; 