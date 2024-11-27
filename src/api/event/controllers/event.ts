import { factories } from '@strapi/strapi'
import {findResourceBySlug} from "../../../utils";

export default factories.createCoreController('api::event.event',({ strapi }) => ({
  // Custom method to find a blog by slug
  async findBySlug(ctx) {
    const { slug } = ctx.params; // Get slug from request parameters
    const event = await findResourceBySlug('event',slug,
      ['storyMedia', 'image', 'category','tags','cta', 'location','video','schedule']);

    if (!event) return ctx.notFound('Event not found');

    return event; // Return the blog found by slug
  },
  async joinEvent(ctx) {
    const { id } = ctx.params;

    // Get the user making the request
    const user = ctx.state.user;
    console.log(user);

    if (!user) {
      return ctx.unauthorized("You must be logged in to join an event.");
    }

    try {
      console.log("about to find event", id);

      // Fetch the event
      const event = await strapi.entityService.findOne('api::event.event', id, {
        populate: { users: true , location : true}, // Populate relations if needed
      });

      if (!event) {
        return ctx.notFound("Event not found.");
      }

      console.log("about to update event", event);
      // Add the user to the event's attendees
      const updatedEvent = await strapi.entityService.update('api::event.event', id, {
        data: {
          users: [...(event.users || []).map((u) => u.id), user.id], // Ensure user IDs are used
        },
      });

      // Send confirmation email
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
          </p>
        `
        });
        console.log(`Confirmation email sent to ${user.email} for event ${event.title}`);
      } catch (emailError) {
        console.error(`Failed to send confirmation email for event ${event.title}:`, emailError);
        // Note: We don't throw this error to prevent blocking the event joining process
      }

      console.log("about to sanitize event", event.title);

      // Sanitize the updated event for the response
      const sanitizedEvent = await this.sanitizeOutput(updatedEvent, ctx);

      return ctx.send(sanitizedEvent);
    } catch (error) {
      console.error("Error joining event:", error);
      return ctx.internalServerError("Unable to join event.");
    }
  }

}));

const getEventLocation = (location: any[]) => {
  if (!location || location.length === 0) return 'Not specified';

  const firstLocation = location[0];

  // Handle online events
  if (firstLocation.__component === 'shared.online-location') {
    return firstLocation.url
      ? `${firstLocation.platform} Meeting: ${firstLocation.url}`
      : 'Online Event (Link not provided)';
  }

  // Handle on-site events
  if (firstLocation.__component === 'shared.on-site') {
    const addressParts = [
      firstLocation.address,
      firstLocation.district,
      firstLocation.city
    ].filter(Boolean);

    return addressParts.length > 0
      ? addressParts.join(', ')
      : 'Physical Location (Details not provided)';
  }

  return 'Not specified';
};
