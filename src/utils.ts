import crypto from 'crypto';

export async function findResourceBySlug(entity : string, slug : string, populate : string[]) {
  return strapi.db.query(`api::${entity}.${entity}`).findOne({
    where: { slug },
    populate,
  });
}


export function generateHash(ctx) {
    try {
      const { total, installment } = ctx.request.body;
      const currency_code = "TRY";

      if (!total || !installment ) {
        return ctx.badRequest('Eksik parametre: total, installment  gerekli.');
      }

      // Merchant key backend'de saklı, örneğin Strapi config'ten:
      const merchant_key = process.env.MERCHANT_KEY || 'BURAYA_MERCHANT_KEY_YAZ';
      const app_secret = process.env.APP_SECRET || 'BURAYA_SECRET_KEY_YAZ';

      // Backend tarafından invoice ID üretelim (örnek olarak timestamp + random)
      const invoice_id = `INV-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      const data = total + '|' + installment + '|' + currency_code + '|' + merchant_key + '|' + invoice_id;

      const iv = crypto.createHash('sha1').update(String(Math.random())).digest('hex').slice(0, 16);
      const password = crypto.createHash('sha1').update(app_secret).digest('hex');
      const salt = crypto.createHash('sha1').update(String(Math.random())).digest('hex').slice(0, 4);
      const salt_with_password = crypto.createHash('sha256').update(password + salt).digest('hex').slice(0, 32);

      const cipher = crypto.createCipheriv('aes-256-cbc', salt_with_password, iv);

      let encrypted = cipher.update(data, 'binary', 'base64');
      encrypted += cipher.final('base64');

      const msg_encrypted_bundle = iv + ':' + salt + ':' + encrypted;
      const msg_encrypted_bundle_replaced = msg_encrypted_bundle.replace('/', '__');

      ctx.send({
        hash: msg_encrypted_bundle_replaced,
        invoice_id, // Geri dönüyorsun ki frontend'e iletilebilsin
      });

    } catch (err) {
      console.error('Hash oluşturulurken hata:', err);
      ctx.internalServerError('Bir hata oluştu.');
    }
};