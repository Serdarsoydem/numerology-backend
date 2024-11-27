export default {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  "0 */10 * * * *": async ({ strapi }) => {
    try {
      const formattedDate = new Date().toLocaleString('tr-TR', {
        dateStyle: 'full',
        timeStyle: 'short'
      })
      console.log("################################", formattedDate);

      await strapi.service('api::event.email').sendEventReminderEmails();
    } catch (error) {
      console.error('Error in scheduled event reminder job:', error);
    }
  },
};
