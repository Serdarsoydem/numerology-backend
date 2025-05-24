import type { Attribute, Schema } from '@strapi/strapi';

export interface SharedCizelge extends Schema.Component {
  collectionName: 'components_shared_cizelges';
  info: {
    displayName: '\u00C7izelge';
  };
  attributes: {
    description: Attribute.String & Attribute.Required;
    time: Attribute.Time;
  };
}

export interface SharedCta extends Schema.Component {
  collectionName: 'components_shared_ctas';
  info: {
    description: '';
    displayName: 'Event Registration CTA';
  };
  attributes: {
    actionType: Attribute.Enumeration<['event_registration']> &
      Attribute.Required &
      Attribute.DefaultTo<'event_registration'>;
    event: Attribute.Relation<'shared.cta', 'oneToOne', 'api::event.event'>;
    text: Attribute.String;
    Variant: Attribute.Enumeration<
      ['primary', 'secondary', 'destructive', 'link']
    >;
  };
}

export interface SharedFeatures extends Schema.Component {
  collectionName: 'components_shared_features';
  info: {
    displayName: 'Features';
  };
  attributes: {
    included: Attribute.Boolean;
    text: Attribute.String;
  };
}

export interface SharedImage extends Schema.Component {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
  };
}

export interface SharedLinkCta extends Schema.Component {
  collectionName: 'components_shared_link_ctas';
  info: {
    description: '';
    displayName: 'Link CTA';
  };
  attributes: {
    actionType: Attribute.Enumeration<['link']> &
      Attribute.Required &
      Attribute.DefaultTo<'link'>;
    url: Attribute.String & Attribute.Required;
    variant: Attribute.Enumeration<
      ['primary', 'secondary', 'destructive', 'link']
    > &
      Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedOnSite extends Schema.Component {
  collectionName: 'components_shared_on_sites';
  info: {
    displayName: 'On Site';
  };
  attributes: {
    address: Attribute.String;
    city: Attribute.String;
    district: Attribute.String;
  };
}

export interface SharedOnSiteLocation extends Schema.Component {
  collectionName: 'components_shared_on_site_locations';
  info: {
    displayName: 'On Site Location';
  };
  attributes: {
    address: Attribute.String;
    city: Attribute.String;
    district: Attribute.String;
  };
}

export interface SharedOnlineLocation extends Schema.Component {
  collectionName: 'components_shared_online_locations';
  info: {
    displayName: 'Online Location';
  };
  attributes: {
    platform: Attribute.Enumeration<['zoom', 'youtube', 'google_meets']>;
    url: Attribute.String;
  };
}

export interface SharedParagraph extends Schema.Component {
  collectionName: 'components_shared_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
  };
  attributes: {};
}

export interface SharedSocial extends Schema.Component {
  collectionName: 'components_shared_socials';
  info: {
    description: '';
    displayName: 'Social';
    icon: 'link';
  };
  attributes: {
    link: Attribute.String;
    name: Attribute.String;
    platform: Attribute.Enumeration<['Facebook', 'Instagram', 'X', 'Tiktok']>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.cizelge': SharedCizelge;
      'shared.cta': SharedCta;
      'shared.features': SharedFeatures;
      'shared.image': SharedImage;
      'shared.link-cta': SharedLinkCta;
      'shared.on-site': SharedOnSite;
      'shared.on-site-location': SharedOnSiteLocation;
      'shared.online-location': SharedOnlineLocation;
      'shared.paragraph': SharedParagraph;
      'shared.social': SharedSocial;
    }
  }
}
