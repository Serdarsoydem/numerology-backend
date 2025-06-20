import { factories, Strapi } from '@strapi/strapi';
import { findResourceBySlug } from '../../../utils';

export default factories.createCoreController('api::event.event', function (params: { strapi: Strapi }) {
  const { strapi } = params;

  return {
    async create(ctx: any) {
      try {
        const { data } = (ctx.request as any).body;

        if (
          data.location?.[0]?.__component === 'shared.online-location' &&
          data.location[0].platform === 'zoom'
        ) {
          const zoomService = strapi.service('api::event.zoom');
          const zoomMeeting = await zoomService.createZoomMeeting(data);

          data.zoomMeetingId = zoomMeeting.meetingId;
          data.zoomJoinUrl = zoomMeeting.joinUrl;
          data.location[0].url = zoomMeeting.joinUrl;
        }

        const response = await super.create(ctx);
        return response;
      } catch (error) {
        console.error('Error creating event:', error);
        ctx.throw(500, error);
      }
    },

    async delete(ctx: any) {
      try {
        const { id } = ctx.params;

        const event = await strapi.entityService.findOne('api::event.event', id, {
          populate: ['location'],
        });

        if (event?.zoomMeetingId) {
          const zoomService = strapi.service('api::event.zoom');
          await zoomService.deleteZoomMeeting(event.zoomMeetingId);
        }

        const response = await super.delete(ctx);
        return response;
      } catch (error) {
        console.error('Error deleting event:', error);
        ctx.throw(500, error);
      }
    },

    async findBySlug(ctx: any) {
      const { slug } = ctx.params;
      const event = await findResourceBySlug(
        'event',
        slug,
        ['storyMedia', 'image', 'category', 'tags', 'cta', 'location', 'video', 'schedule']
      );

      if (!event) return ctx.notFound('Event not found');

      return event;
    },

    async joinEvent(ctx: any) {
      const { id } = ctx.params;

      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('You must be logged in to join an event.');
      }

      try {
        const event = await strapi.entityService.findOne('api::event.event', id, {
          populate: { users: true, location: true },
        });

        if (!event) {
          return ctx.notFound('Event not found.');
        }

        const userIds = new Set((event.users || []).map((u: any) => u.id));
        userIds.add(user.id);

        const updatedEvent = await strapi.entityService.update(
          'api::event.event',
          id,
          {
            // Burada TS hatası almamak için "as any" kullanıyoruz:
            data: {
              users: Array.from(userIds),
            } as any,
          }
        );

        try {
          await strapi.plugins['email'].service('email').send({
            to: user.email,
            from: 'cayildiz01@gmail.com',
            subject: `Event Confirmation: ${event.title}`,
            html: `
              <h1>Event Confirmation</h1>
              <p>Hi ${user.username},</p>
              <p>You have successfully joined the event: <strong>${event.title}</strong>.</p>
              <p>Event Details:
                <br>Date: ${new Date(event.date).toLocaleString()}
                <br>Location: ${getEventLocation(event.location)}
                ${event.zoomJoinUrl ? `<br>Zoom Link: ${event.zoomJoinUrl}` : ''}
              </p>
            `,
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }

        const sanitizedEvent = await this.sanitizeOutput(updatedEvent, ctx);

        return ctx.send(sanitizedEvent);
      } catch (error) {
        console.error('Error joining event:', error);
        return ctx.internalServerError('Unable to join event.');
      }
    },
  };
});

const getEventLocation = (location: any[]) => {
  if (!location || location.length === 0) return 'Not specified';

  const firstLocation = location[0];

  if (firstLocation.__component === 'shared.online-location') {
    return firstLocation.url
      ? `${firstLocation.platform} Meeting: ${firstLocation.url}`
      : 'Online Event (Link not provided)';
  }

  if (firstLocation.__component === 'shared.on-site') {
    const addressParts = [firstLocation.address, firstLocation.district, firstLocation.city].filter(Boolean);

    return addressParts.length > 0 ? addressParts.join(', ') : 'Physical Location (Details not provided)';
  }

  return 'Not specified';
};
