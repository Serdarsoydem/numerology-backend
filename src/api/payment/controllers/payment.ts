import { factories } from '@strapi/strapi';
import { generateHash } from '../../../utils';

export default {
  async generateHash(ctx) {
    try {
      const { total, installment } = ctx.request.body;
      const currency_code = "TRY"

      if (!total || !installment) {
        return ctx.badRequest('Eksik parametre: total ve installment gerekli.');
      }

      // The generateHash function will handle the response
      await generateHash(ctx);
    } catch (error) {
      console.error("generateHash controller hatası:", error);
      return ctx.internalServerError('Bir hata oluştu');
    }
  },
};
