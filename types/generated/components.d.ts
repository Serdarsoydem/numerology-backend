import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedCta extends Schema.Component {
  collectionName: 'components_shared_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    Variant: Attribute.Enumeration<
      ['primary', 'secondary', 'destructive', 'link']
    >;
    Text: Attribute.String;
    Link: Attribute.String;
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

export interface SharedParagraph extends Schema.Component {
  collectionName: 'components_shared_paragraphs';
  info: {
    displayName: 'Paragraph';
    description: '';
  };
  attributes: {};
}

export interface SharedSocial extends Schema.Component {
  collectionName: 'components_shared_socials';
  info: {
    displayName: 'Social';
    icon: 'link';
    description: '';
  };
  attributes: {
    Name: Attribute.String;
    Platform: Attribute.Enumeration<['Facebook', 'Instagram', 'X', 'Tiktok']>;
    Link: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.cta': SharedCta;
      'shared.image': SharedImage;
      'shared.paragraph': SharedParagraph;
      'shared.social': SharedSocial;
    }
  }
}
