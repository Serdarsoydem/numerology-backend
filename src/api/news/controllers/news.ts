/**
 * news controller
 */

import { factories } from '@strapi/strapi'
import {findResourceBySlug} from "../../../utils";

export default factories.createCoreController('api::news.news',({ strapi }: { strapi: any }) => ({
  // Custom method to find a blog by slug
  async findBySlug(ctx: any) {
    const { slug } = ctx.params; // Get slug from request parameters
    const news = await findResourceBySlug('news',slug,['image', 'video', 'category','tags','video','publishedAt','author']);

    if (!news) return ctx.notFound('news not found');

    return news; // Return the blog found by slug
  },
}));
