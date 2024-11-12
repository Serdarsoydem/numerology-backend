/**
 * news controller
 */

import { factories } from '@strapi/strapi'
import {findResourceBySlug} from "../../../utils";

export default factories.createCoreController('api::news.news',({ strapi }) => ({
  // Custom method to find a blog by slug
  async findBySlug(ctx) {
    const { slug } = ctx.params; // Get slug from request parameters
    const blog = await findResourceBySlug('news',slug,['image', 'video', 'category','tags','video','publishedAt','author']);

    if (!blog) return ctx.notFound('news not found');

    return blog; // Return the blog found by slug
  },
}));
