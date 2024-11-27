export default {
  async sendJoinConfirmationEmail(user, event) {
    try {
      await strapi.plugins['email'].service('email').send({
        to: user.email,
        from: 'myemail@protonmail.com', // This will use the defaultFrom in your config
        subject: `Event Confirmation: ${event.title}`,
        html: `
          <h1>Kaydınız Alınmıştır</h1>
          <p>Hi ${user.username},</p>
          <p><strong>${event.title} etkinliğine başarıyla kaydınız alınmıştır.</strong>.</p>
          <p>Etkinlik Detayları:
            <br>Tarih: ${new Date(event.schedule).toLocaleString()}
            <br>Lokasyon: ${event.location || 'Belirlenmedi'}
          </p>
        `
      });
      console.log(`Confirmation email sent to ${user.email}`);
    } catch (error) {
      console.error('Failed to send join confirmation email:', error);
    }
  },

  async sendEventReminderEmails() {
    const currentDate = new Date();

    // Find events coming up soon (e.g., within the next 2 hours)
    const upcomingEvents = await strapi.entityService.findMany('api::event.event', {
      filters: {
        date: {
          $gte: currentDate,
          $lt: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours from now
        }
      },
      populate: { users: true }
    });

    // Track successful and failed emails
    const reminderStats = {
      totalEvents: upcomingEvents.length,
      successfulEmails: 0,
      failedEmails: 0
    };

    for (const event of upcomingEvents) {
      for (const user of event.users) {
        try {
          await this.sendEventReminderEmail(user, event);
          reminderStats.successfulEmails++;
        } catch (error) {
          console.error(`Failed to send reminder for event ${event.id} to user ${user.id}`, error);
          reminderStats.failedEmails++;
        }
      }
    }

    // Log reminder email statistics
    console.log('Event Reminder Email Statistics:', reminderStats);
    return reminderStats;
  },

  async sendEventReminderEmail(user, event) {
    try {
      const eventDate = new Date(event.schedule);
      const formattedDate = eventDate.toLocaleString('tr-TR', {
        dateStyle: 'full',
        timeStyle: 'short'
      });

      await strapi.plugins['email'].service('email').send({
        to: user.email,
        from: 'myemail@protonmail.com', // Uses defaultFrom from your config
        subject: `Reminder: Upcoming Event - ${event.title}`,
        html: `
          <h1>Hatırlatma</h1>
          <p>Hi ${user.username},</p>
          <p><strong>${event.title} Etkinliğine katılımınız için bir küçük bir hatırlatma mesajı</strong>.</p>
          <p>Etkinlik Detayları:
            <br>Tarih: ${formattedDate}
            <br>Lokasyon: ${event.location || 'Not specified'}
          </p>
          <p>Sizi aramızda görmeyi çok isteriz</p>
        `
      });

      console.log(`Reminder email sent to ${user.email}`);
    } catch (error) {
      console.error('Failed to send event reminder email:', error);
      throw error;
    }
  }
};
