import { Strapi } from '@strapi/strapi';
import { Context } from 'koa';
import { errors, sanitize } from '@strapi/utils';
import { z } from 'zod';

// Define the validation schema with Zod
const updateUserSchema = z.object({
  username: z.string()
    .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır')
    .max(50, 'Kullanıcı adı 50 karakteri geçemez')
    .regex(/^[a-zA-Z0-9_-]*$/, 'Kullanıcı adı sadece harf, rakam, alt çizgi ve tire içerebilir')
    .optional(),

  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim 50 karakteri geçemez')
    .regex(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]*$/, 'İsim sadece harf ve boşluk içerebilir')
    .optional(),

  lastName: z.string()
    .min(2, 'Soyisim en az 2 karakter olmalıdır')
    .max(50, 'Soyisim 50 karakteri geçemez')
    .regex(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]*$/, 'Soyisim sadece harf ve boşluk içerebilir')
    .optional(),

  phoneNumber: z.string()
    .regex(/^[0-9+\-\s()]*$/, 'Geçersiz telefon numarası formatı')
    .min(10, 'Telefon numarası en az 10 haneli olmalıdır')
    .max(15, 'Telefon numarası 15 haneyi geçemez')
    .optional(),
});

module.exports = (plugin) => {
  plugin.controllers.user.updateUser = async (ctx: Context) => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('Giriş yapmanız gerekmektedir');
    }

    const updateData = ctx.request.body;

    try {
      // Validate the update data using Zod
      const validationResult = updateUserSchema.safeParse(updateData);

      if (!validationResult.success) {
        return ctx.badRequest('Doğrulama Başarısız', {
          errors: validationResult.error.flatten().fieldErrors
        });
      }

      // Type-safe validated data
      const validatedData = validationResult.data;

      // Check if there are any fields to update
      if (Object.keys(validatedData).length === 0) {
        return ctx.badRequest('Güncellenecek geçerli alan bulunamadı');
      }

      // Perform the update
      const updatedUser = await strapi.entityService.update(
        'plugin::users-permissions.user',
        user.id,
        { data: validatedData }
      );

      return ctx.send(updatedUser);

    } catch (error) {
      console.error('Güncelleme hatası:', error);
      return ctx.badRequest('Güncelleme başarısız oldu', {
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      });
    }
  };

  plugin.routes['content-api'].routes.push({
    method: "PATCH",
    path: "/updateMe",
    handler: "user.updateUser",
  });

  return plugin;
};
