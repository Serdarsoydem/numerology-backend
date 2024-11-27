export default {
  config: {
    locales: ['tr', 'en'],
    translations: {
      tr: {
        // General translations
        'app.components.LeftMenu.navbrand.title': 'Kontrol Paneli',

        // Collection Type name in sidebar and headers
        'plugin.content-manager.single-types.blog.name': 'Blog',
        'plugin.content-manager.collection-types.blog.name': 'Blog',
        'plugin.content-manager.collection-types.news.name': 'Haberler',

        // List view headers
        'content-manager.containers.ListPage.table-headers.title': 'Başlık',
        'content-manager.containers.ListPage.table-headers.slug': 'URL',
        'content-manager.containers.ListPage.table-headers.content': 'İçerik',
        'content-manager.containers.ListPage.table-headers.image': 'Görsel',
        'content-manager.containers.ListPage.table-headers.category': 'Kategori',
        'content-manager.containers.ListPage.table-headers.tags': 'Etiketler',
        'content-manager.containers.ListPage.table-headers.video': 'Video',
        'content-manager.containers.ListPage.table-headers.author': 'Yazar',

        // Edit/Create view labels
        'content-manager.containers.EditView.label.title': 'Başlık',
        'content-manager.containers.EditView.label.slug': 'URL',
        'content-manager.containers.EditView.label.content': 'İçerik',
        'content-manager.containers.EditView.label.image': 'Görsel',
        'content-manager.containers.EditView.label.category': 'Kategori',
        'content-manager.containers.EditView.label.tags': 'Etiketler',
        'content-manager.containers.EditView.label.video': 'Video',
        'content-manager.containers.EditView.label.author': 'Yazar',

        // Create view labels
        'content-manager.containers.CreateView.label.title': 'Başlık',
        'content-manager.containers.CreateView.label.slug': 'URL',
        'content-manager.containers.CreateView.label.content': 'İçerik',
        'content-manager.containers.CreateView.label.image': 'Görsel',
        'content-manager.containers.CreateView.label.category': 'Kategori',
        'content-manager.containers.CreateView.label.tags': 'Etiketler',
        'content-manager.containers.CreateView.label.video': 'Video',
        'content-manager.containers.CreateView.label.author': 'Yazar',

        // Field descriptions/placeholders
        'content-manager.description.title': 'Blog başlığını giriniz',
        'content-manager.description.content': 'Blog içeriğini giriniz',
        'content-manager.description.slug': 'Blog URL\'i',
        'content-manager.description.image': 'Blog görseli',
        'content-manager.description.category': 'Blog kategorisi',
        'content-manager.description.tags': 'Blog etiketleri',
        'content-manager.description.video': 'Blog videosu',
        'content-manager.description.author': 'Blog yazarı',

        // Placeholders
        'content-manager.placeholder.title': 'Başlık giriniz...',
        'content-manager.placeholder.content': 'İçerik giriniz...',

        // Relation field labels
        'content-manager.relation.blog.category': 'Kategori Seç',
        'content-manager.relation.blog.tags': 'Etiketleri Seç',
        'content-manager.relation.blog.author': 'Yazar Seç',

        // Media field labels
        'content-manager.media.blog.image': 'Görsel Seç',
        'content-manager.media.blog.video': 'Video Seç',

        // Button texts
        'content-manager.button.blog.add': 'Blog Ekle',
        'content-manager.button.blog.create': 'Blog Oluştur',
        'content-manager.button.blog.save': 'Kaydet',
        'content-manager.button.blog.publish': 'Yayınla'
      },
    },
  },
  bootstrap(app: any) {
    console.log(app);
  },
};
