import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    description: '';
    displayName: 'Blog';
    pluralName: 'blogs';
    singularName: 'blog';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    author: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'>;
    category: Attribute.Relation<
      'api::blog.blog',
      'manyToOne',
      'api::category.category'
    >;
    content: Attribute.Blocks & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.CustomField<
        'plugin::slug.slug',
        {
          pattern: 'title';
        }
      >;
    tags: Attribute.Relation<'api::blog.blog', 'manyToMany', 'api::tag.tag'>;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    video: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ApiBookAuthorBookAuthor extends Schema.CollectionType {
  collectionName: 'book_authors';
  info: {
    description: '';
    displayName: 'BookAuthor';
    pluralName: 'book-authors';
    singularName: 'book-author';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AuthorName: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::book-author.book-author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Description: Attribute.Text;
    Image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::book-author.book-author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    displayName: 'Category';
    pluralName: 'categories';
    singularName: 'category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    blogs: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::blog.blog'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    events: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::event.event'
    >;
    interview: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'api::interview.interview'
    >;
    news: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'api::news.news'
    >;
    slug: Attribute.String &
      Attribute.CustomField<
        'plugin::slug.slug',
        {
          pattern: 'title';
        }
      >;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactMessageContactMessage extends Schema.CollectionType {
  collectionName: 'contact_messages';
  info: {
    description: '';
    displayName: 'Contact Message';
    pluralName: 'contact-messages';
    singularName: 'contact-message';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-message.contact-message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.String & Attribute.Required;
    message: Attribute.Text & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::contact-message.contact-message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactContact extends Schema.SingleType {
  collectionName: 'contacts';
  info: {
    description: '';
    displayName: 'Contact';
    pluralName: 'contacts';
    singularName: 'contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    decription: Attribute.Text & Attribute.Required;
    email: Attribute.String & Attribute.Required;
    name: Attribute.String;
    phone: Attribute.String & Attribute.Required;
    publishedAt: Attribute.DateTime;
    socials: Attribute.Component<'shared.social', true>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    description: '';
    displayName: 'Event';
    pluralName: 'events';
    singularName: 'event';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Attribute.Relation<
      'api::event.event',
      'manyToOne',
      'api::category.category'
    >;
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date: Attribute.DateTime & Attribute.Required;
    image: Attribute.Media<'images'>;
    location: Attribute.DynamicZone<
      ['shared.on-site', 'shared.online-location']
    > &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          max: 1;
        },
        number
      >;
    maxCapacity: Attribute.Integer & Attribute.DefaultTo<-1>;
    publishedAt: Attribute.DateTime;
    schedule: Attribute.Component<'shared.cizelge', true>;
    slug: Attribute.String &
      Attribute.CustomField<
        'plugin::slug.slug',
        {
          pattern: 'title';
        }
      >;
    tags: Attribute.Relation<'api::event.event', 'oneToMany', 'api::tag.tag'>;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'api::event.event',
      'manyToMany',
      'plugin::users-permissions.user'
    > &
      Attribute.Private;
    video: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    zoomJoinUrl: Attribute.String;
    zoomMeetingId: Attribute.String & Attribute.Private;
  };
}

export interface ApiInterviewInterview extends Schema.CollectionType {
  collectionName: 'interviews';
  info: {
    description: '';
    displayName: 'Interview';
    pluralName: 'interviews';
    singularName: 'interview';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Attribute.Relation<
      'api::interview.interview',
      'oneToOne',
      'api::category.category'
    >;
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interview.interview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.CustomField<
        'plugin::slug.slug',
        {
          pattern: 'title';
        }
      >;
    tags: Attribute.Relation<
      'api::interview.interview',
      'oneToMany',
      'api::tag.tag'
    >;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::interview.interview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    video: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ApiKitapKitap extends Schema.CollectionType {
  collectionName: 'kitaps';
  info: {
    displayName: 'Kitap';
    pluralName: 'kitaps';
    singularName: 'kitap';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kitap.kitap',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Podcast: Attribute.DynamicZone<['shared.podcast']>;
    publishedAt: Attribute.DateTime;
    Title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::kitap.kitap',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLiveEventLiveEvent extends Schema.CollectionType {
  collectionName: 'live_events';
  info: {
    displayName: 'LiveEvent';
    pluralName: 'live-events';
    singularName: 'live-event';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::live-event.live-event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date: Attribute.DateTime;
    description: Attribute.String;
    jitsiRoomId: Attribute.String &
      Attribute.CustomField<
        'plugin::slug.slug',
        {
          pattern: 'id';
        }
      >;
    publishedAt: Attribute.DateTime;
    roomLink: Attribute.String;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::live-event.live-event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMeetingLogMeetingLog extends Schema.CollectionType {
  collectionName: 'meeting_logs';
  info: {
    displayName: 'MeetingLog';
    pluralName: 'meeting-logs';
    singularName: 'meeting-log';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::meeting-log.meeting-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['planland\u0131', 'tamammland\u0131', 'iptal edildi']
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::meeting-log.meeting-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users_permissions_user: Attribute.Relation<
      'api::meeting-log.meeting-log',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiNewsNews extends Schema.CollectionType {
  collectionName: 'newses';
  info: {
    description: '';
    displayName: 'News';
    pluralName: 'newses';
    singularName: 'news';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Attribute.Relation<
      'api::news.news',
      'oneToOne',
      'api::category.category'
    >;
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::news.news', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.CustomField<
        'plugin::slug.slug',
        {
          pattern: 'title';
        }
      >;
    tags: Attribute.Relation<'api::news.news', 'oneToMany', 'api::tag.tag'>;
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::news.news', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    video: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ApiPaymentLogPaymentLog extends Schema.CollectionType {
  collectionName: 'payment_logs';
  info: {
    description: 'Log of all payment transactions';
    displayName: 'Payment Log';
    pluralName: 'payment-logs';
    singularName: 'payment-log';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    amount: Attribute.Decimal & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment-log.payment-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    currency: Attribute.String & Attribute.Required;
    order_id: Attribute.String & Attribute.Required & Attribute.Unique;
    payment_details: Attribute.JSON;
    status: Attribute.Enumeration<['pending', 'success', 'failed']> &
      Attribute.Required &
      Attribute.DefaultTo<'pending'>;
    transaction_id: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::payment-log.payment-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    user: Attribute.Relation<
      'api::payment-log.payment-log',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    webhook_response: Attribute.JSON;
  };
}

export interface ApiPlanPlan extends Schema.CollectionType {
  collectionName: 'plans';
  info: {
    description: 'Subscription plans';
    displayName: 'Plan';
    pluralName: 'plans';
    singularName: 'plan';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    consultant_meeting_limit: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::plan.plan', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.Text;
    duration: Attribute.Enumeration<['monthly', 'quarterly', 'yearly']> &
      Attribute.Required &
      Attribute.DefaultTo<'monthly'>;
    features: Attribute.JSON;
    name: Attribute.String & Attribute.Required;
    price: Attribute.Decimal & Attribute.Required;
    publishedAt: Attribute.DateTime;
    service_usage_limit: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<0>;
    subscriptions: Attribute.Relation<
      'api::plan.plan',
      'oneToMany',
      'api::user-subscription.user-subscription'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::plan.plan', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPrivacyPolicyPrivacyPolicy extends Schema.SingleType {
  collectionName: 'privacy_policies';
  info: {
    description: '';
    displayName: 'Privacy Policy';
    pluralName: 'privacy-policies';
    singularName: 'privacy-policy';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProfileProfile extends Schema.CollectionType {
  collectionName: 'profiles';
  info: {
    description: '';
    displayName: 'Profil';
    pluralName: 'profiles';
    singularName: 'profile';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    admin_user: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    experience: Attribute.Text;
    image: Attribute.Media<'images'>;
    name: Attribute.String;
    publishedAt: Attribute.DateTime;
    role: Attribute.Enumeration<['author', 'consultant']>;
    skills: Attribute.String;
    summary: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRecurringPaymentRecurringPayment
  extends Schema.CollectionType {
  collectionName: 'recurring_payments';
  info: {
    description: 'Tekrarlayan \u00F6deme kay\u0131tlar\u0131';
    displayName: 'Recurring Payment';
    pluralName: 'recurring-payments';
    singularName: 'recurring-payment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    amount: Attribute.Decimal & Attribute.Required;
    cardToken: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::recurring-payment.recurring-payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    currency: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'TRY'>;
    failedAttempts: Attribute.Integer & Attribute.DefaultTo<0>;
    lastPaymentDate: Attribute.DateTime;
    lastPaymentStatus: Attribute.Enumeration<['success', 'failed']>;
    nextPaymentDate: Attribute.DateTime & Attribute.Required;
    plan: Attribute.Relation<
      'api::recurring-payment.recurring-payment',
      'manyToOne',
      'api::plan.plan'
    >;
    status: Attribute.Enumeration<['active', 'suspended', 'cancelled']> &
      Attribute.Required &
      Attribute.DefaultTo<'active'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::recurring-payment.recurring-payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    user: Attribute.Relation<
      'api::recurring-payment.recurring-payment',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiServiceCallLogServiceCallLog extends Schema.CollectionType {
  collectionName: 'service_call_logs';
  info: {
    displayName: 'ServiceCallLog';
    pluralName: 'service-call-logs';
    singularName: 'service-call-log';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-call-log.service-call-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date: Attribute.DateTime;
    inputData: Attribute.JSON;
    publishedAt: Attribute.DateTime;
    response: Attribute.Blocks;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::service-call-log.service-call-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users_permissions_user: Attribute.Relation<
      'api::service-call-log.service-call-log',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    displayName: 'Service';
    pluralName: 'services';
    singularName: 'service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    Description: Attribute.Text;
    inputFields: Attribute.JSON;
    name: Attribute.String;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStoryStory extends Schema.CollectionType {
  collectionName: 'stories';
  info: {
    description: '';
    displayName: 'Story';
    pluralName: 'stories';
    singularName: 'story';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::story.story',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    cta: Attribute.DynamicZone<['shared.cta', 'shared.link-cta']> &
      Attribute.SetMinMax<
        {
          max: 1;
        },
        number
      >;
    description: Attribute.String;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.CustomField<
        'plugin::slug.slug',
        {
          pattern: 'title';
        }
      >;
    storyMedia: Attribute.Media<'images' | 'videos'>;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::story.story',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags';
  info: {
    displayName: 'Tag';
    pluralName: 'tags';
    singularName: 'tag';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    blogs: Attribute.Relation<'api::tag.tag', 'manyToMany', 'api::blog.blog'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    event: Attribute.Relation<'api::tag.tag', 'manyToOne', 'api::event.event'>;
    interview: Attribute.Relation<
      'api::tag.tag',
      'manyToOne',
      'api::interview.interview'
    >;
    news: Attribute.Relation<'api::tag.tag', 'manyToOne', 'api::news.news'>;
    slug: Attribute.String &
      Attribute.CustomField<
        'plugin::slug.slug',
        {
          pattern: 'title';
        }
      >;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTermsAndConditionTermsAndCondition
  extends Schema.SingleType {
  collectionName: 'terms_and_conditions';
  info: {
    displayName: 'Terms And Conditions';
    pluralName: 'terms-and-conditions';
    singularName: 'terms-and-condition';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::terms-and-condition.terms-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::terms-and-condition.terms-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginMuxVideoUploaderMuxAsset extends Schema.CollectionType {
  collectionName: 'muxassets';
  info: {
    description: 'Represents a Mux Asset item, including upload and playback details';
    displayName: 'Mux Asset';
    name: 'mux-asset';
    pluralName: 'mux-assets';
    singularName: 'mux-asset';
  };
  options: {
    increments: true;
    timestamps: true;
  };
  pluginOptions: {
    'content-manager': {
      visible: true;
    };
    'content-type-builder': {
      visible: true;
    };
  };
  attributes: {
    aspect_ratio: Attribute.String;
    asset_data: Attribute.JSON;
    asset_id: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::mux-video-uploader.mux-asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    duration: Attribute.Decimal;
    error_message: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    isReady: Attribute.Boolean & Attribute.DefaultTo<false>;
    playback_id: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    signed: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
        minLength: 3;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::mux-video-uploader.mux-asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    upload_id: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

export interface PluginMuxVideoUploaderMuxTextTrack
  extends Schema.CollectionType {
  collectionName: 'muxtexttracks';
  info: {
    description: 'Temporary storage for user-defined subtitles & captions sent to Mux during video uploads';
    displayName: 'Mux Text Track';
    name: 'mux-text-track';
    pluralName: 'mux-text-tracks';
    singularName: 'mux-text-track';
  };
  options: {
    increments: true;
    timestamps: true;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    closed_captions: Attribute.Boolean & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::mux-video-uploader.mux-text-track',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    file: Attribute.JSON & Attribute.Required;
    language_code: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::mux-video-uploader.mux-text-track',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    ext: Attribute.String;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    avatar: Attribute.Enumeration<
      ['image1', 'image2', 'image3', 'image4', 'image5', 'image6']
    > &
      Attribute.DefaultTo<'image1'>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    events: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::event.event'
    >;
    lastName: Attribute.String;
    meeting_logs: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::meeting-log.meeting-log'
    >;
    name: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    phoneNumber: Attribute.String;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    service_call_log: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::service-call-log.service-call-log'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    user_subscription: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::user-subscription.user-subscription'
    >;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::blog.blog': ApiBlogBlog;
      'api::book-author.book-author': ApiBookAuthorBookAuthor;
      'api::category.category': ApiCategoryCategory;
      'api::contact-message.contact-message': ApiContactMessageContactMessage;
      'api::contact.contact': ApiContactContact;
      'api::event.event': ApiEventEvent;
      'api::interview.interview': ApiInterviewInterview;
      'api::kitap.kitap': ApiKitapKitap;
      'api::live-event.live-event': ApiLiveEventLiveEvent;
      'api::meeting-log.meeting-log': ApiMeetingLogMeetingLog;
      'api::news.news': ApiNewsNews;
      'api::payment-log.payment-log': ApiPaymentLogPaymentLog;
      'api::plan.plan': ApiPlanPlan;
      'api::privacy-policy.privacy-policy': ApiPrivacyPolicyPrivacyPolicy;
      'api::profile.profile': ApiProfileProfile;
      'api::recurring-payment.recurring-payment': ApiRecurringPaymentRecurringPayment;
      'api::service-call-log.service-call-log': ApiServiceCallLogServiceCallLog;
      'api::service.service': ApiServiceService;
      'api::story.story': ApiStoryStory;
      'api::tag.tag': ApiTagTag;
      'api::terms-and-condition.terms-and-condition': ApiTermsAndConditionTermsAndCondition;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::mux-video-uploader.mux-asset': PluginMuxVideoUploaderMuxAsset;
      'plugin::mux-video-uploader.mux-text-track': PluginMuxVideoUploaderMuxTextTrack;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
