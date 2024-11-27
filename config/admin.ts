export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "Dashboard",
    },
    tr: {
      "app.components.LeftMenu.navbrand.title": "Kontrol Paneli",
    }
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  locales: ["tr", "en"],
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
