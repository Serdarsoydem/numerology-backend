import axios from 'axios';
import crypto from 'crypto';
import { errors } from '@strapi/utils';
const { ApplicationError } = errors;

export default ({ strapi }) => ({
  async initiate(paymentData) {
    const config = {
      baseUrl: process.env.SIPAY_API_URL || 'https://provisioning.sipay.com.tr',
      merchantKey: process.env.SIPAY_MERCHANT_KEY,
      appKey: process.env.SIPAY_APP_KEY,
      appSecret: process.env.SIPAY_APP_SECRET
    };

    // Ortam değişkenlerinin kontrolü
    if (!config.merchantKey || !config.appKey || !config.appSecret) {
      strapi.log.error('Sipay credentials missing!');
      throw new ApplicationError('Payment gateway configuration error');
    }

    try {
      const response = await axios.post(`${config.baseUrl}/ccpayment/v3/secure3d`, {
        merchant_key: config.merchantKey,
        amount: paymentData.amount,
        card_number: paymentData.cardNumber,
        card_holder_name: paymentData.cardHolderName,
        expire_month: paymentData.expireMonth,
        expire_year: paymentData.expireYear,
        cvc: paymentData.cvc,
        currency: paymentData.currency || 'TRY',
        return_url: `${process.env.FRONTEND_URL}/payment/return`,
        callback_url: `${process.env.BACKEND_URL}/api/payment/callback`,
        enable_3d: true
      }, {
        headers: {
          'App-Key': config.appKey,
          'App-Secret': config.appSecret,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000
      });

      // Yanıt kontrolü
      if (!response.data.payment_url) {
        throw new ApplicationError('Invalid response from payment gateway');
      }

      return {
        paymentUrl: response.data.payment_url,
        transactionId: response.data.transaction_id
      };

    } catch (error) {
      let errorMessage = 'Payment processing failed';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error_message ||
          error.response?.data?.message ||
          error.message;
      }

      strapi.log.error('Sipay API Error:', errorMessage);
      throw new ApplicationError(errorMessage);
    }
  },

  async handlePaymentCallback(data) {
    // İmza doğrulama
    if (!this.validateSignature(data, data.hash)) {
      throw new ApplicationError('Invalid signature');
    }

    // Ödeme durumu kontrolü
    if (data.status_code !== 100) {
      throw new ApplicationError(`Payment failed with code: ${data.status_code}`);
    }

    // Ödeme başarılı - DB işlemleri
    try {
      await strapi.db.query('api::order.order').update({
        where: { transactionId: data.transaction_id },
        data: { status: 'paid' }
      });

      return { success: true, transactionId: data.transaction_id };
    } catch (dbError) {
      strapi.log.error('Database update error:', dbError);
      return { success: false, error: 'Failed to update order status' };
    }
  },

  validateSignature(data: object, signature: string): boolean {
    const payload = Object.keys(data)
      .filter(key => key !== 'hash')
      .sort()
      .map(key => `${key}=${data[key]}`)
      .join('&');

    const expectedSignature = crypto
      .createHmac('sha256', process.env.SIPAY_APP_SECRET)
      .update(payload)
      .digest('hex');

    return signature === expectedSignature;
  }
});
