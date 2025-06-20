import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::book-author.book-author', ({ strapi }: { strapi: any }) => ({
  async find(ctx: any) {
    // Populate Image alanını açıkça belirtiyoruz:
    ctx.query = {
      ...ctx.query,
      populate: {
        Image: true,
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));
