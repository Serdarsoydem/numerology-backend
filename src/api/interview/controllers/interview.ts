/**
 * interview controller
 */

import { factories } from '@strapi/strapi'
import {findResourceBySlug} from "../../../utils";

export default factories.createCoreController('api::interview.interview',({ strapi }) => ({
  // Custom method to find a blog by slug
  async findBySlug(ctx) {
    const { slug } = ctx.params; // Get slug from request parameters
    const blog = await findResourceBySlug('interview',slug,['image', 'video', 'category','tags','video','publishedAt','author']);

    if (!blog) return ctx.notFound('Interview not found');

    return blog; // Return the blog found by slug
  },
}));
