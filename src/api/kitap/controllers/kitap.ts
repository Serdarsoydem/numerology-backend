import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::kitap.kitap', ({ strapi }: { strapi: any }) => ({
  async find(ctx: any) {
    ctx.query = {
      ...ctx.query,
      populate: {
        Podcast: {
          populate: ['Image', 'Audio']
        }
      }

    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));
