import { errors } from '@strapi/utils';
import {generateHash} from "../../../utils";
const { ApplicationError } = errors;
import{ SipayTokenResponse } from '../../../services/get_token';
export default {

  async generateHash(ctx) {
    try {
      const { total } = ctx.request.body;

      if (!total) {
        return ctx.badRequest('Eksik parametre: total ve installment gerekli.');
      }

      // The generateHash function will handle the response
      await generateHash(ctx);
    } catch (error) {
      console.error("generateHash controller hatası:", error);
      return ctx.internalServerError('Bir hata oluştu');
    }
  },
  async getSipayToken(ctx) {
    const sipaySecret=process.env.SIPAY_APP_SECRET;
    const sipayId=process.env.SIPAY_APP_ID;
    try {
      const response = await fetch(`${process.env.STRAPI_API_URL}/api/token`, {
        method: "POST",
        body: JSON.stringify({
          app_id:sipayId,
          secret_id:sipaySecret
        }),
      });

      const sipayTokenResponse = await response.json() as SipayTokenResponse;
      const token = sipayTokenResponse.data.token;
      ctx.send({
        token:token,
        // Geri dönüyorsun ki frontend'e iletilebilsin
      });
    }
    catch (error) {
      console.error("generateHash controller hatası:", error);
      return ctx.internalServerError('Bir hata oluştu');
    }
  },
  async initiate(ctx) {
    try {
      // Content-Type kontrolü
      if (!ctx.request.is('application/json')) {
        throw new ApplicationError('Invalid content type. Use application/json');
      }

      // Body parser hatası için try-catch
      let requestBody;
      try {
        requestBody = ctx.request.body;
      } catch (e) {
        throw new ApplicationError('Invalid JSON payload');
      }

      // Zorunlu alan kontrolü
      const requiredFields = ['amount', 'cardNumber', 'cardHolderName', 'expireMonth', 'expireYear', 'cvc'];
      const missingFields = requiredFields.filter(field => !requestBody[field]);

      if (missingFields.length > 0) {
        throw new ApplicationError(`Missing fields: ${missingFields.join(', ')}`);
      }

      // Service çağrısı
      const result = await strapi.service('api::payment.payment').initiate(requestBody);

      ctx.send({
        success: true,
        paymentUrl: result.paymentUrl,
        transactionId: result.transactionId
      });

    } catch (err) {
      ctx.throw(400, err.message);
    }
  },

  async handlePaymentCallback(ctx) {
    try {
      const result = await strapi.service('api::payment.payment').handlePaymentCallback(ctx.request.body);
      ctx.send(result);
    } catch (err) {
      ctx.throw(400, err.message);
    }
  }
};
