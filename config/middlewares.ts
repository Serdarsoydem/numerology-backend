module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      // Content Security Policy ayarlarını varsayılan şekilde açık tutuyoruz
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http:', 'ws:', 'wss:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:', 'http:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:', 'http:'],
          upgradeInsecureRequests: null,
        },
      },
      cors: {
        enabled: true,
        origin: [
          'http://localhost:3000',
          'http://127.0.0.1:3000',
          'http://localhost:1337',
          'http://127.0.0.1:1337',
          '*', // Dilersen '*' tüm originlere izin için ekleyebilirsin ama daha kısıtlı tutmak daha iyi
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
        headers: [
          'Content-Type',
          'Authorization',
          'Accept',
          'Origin',
          'User-Agent',
          'DNT',
          'Cache-Control',
          'X-Mx-ReqToken',
          'Keep-Alive',
          'X-Requested-With',
          'If-Modified-Since',
          'X-CSRF-Token',
        ],
        expose: ['WWW-Authenticate', 'Server-Authorization'],
        keepHeaderOnError: true,
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      includeUnparsed: true,
      formLimit: '256mb',
      jsonLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
