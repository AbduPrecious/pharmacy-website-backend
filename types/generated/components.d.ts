import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutGroupCompany extends Schema.Component {
  collectionName: 'components_about_group_companies';
  info: {
    displayName: 'GroupCompany';
    icon: 'grid';
  };
  attributes: {
    name: Attribute.String;
    logo: Attribute.Media & Attribute.Required;
    website: Attribute.String & Attribute.Required;
  };
}

export interface AboutIsoCertificate extends Schema.Component {
  collectionName: 'components_about_iso_certificates';
  info: {
    displayName: 'IsoCertificate';
    icon: 'file';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
  };
}

export interface AboutPartner extends Schema.Component {
  collectionName: 'components_about_partners';
  info: {
    displayName: 'Partner';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    logo: Attribute.Media & Attribute.Required;
  };
}

export interface AboutValue extends Schema.Component {
  collectionName: 'components_about_values';
  info: {
    displayName: 'Value';
    icon: 'heart';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Blocks & Attribute.Required;
    icon: Attribute.Media & Attribute.Required;
  };
}

export interface PageContentSlide extends Schema.Component {
  collectionName: 'components_page_content_slides';
  info: {
    displayName: 'Slide';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Blocks & Attribute.Required;
    image: Attribute.Media;
    buttonText: Attribute.String;
    order: Attribute.Integer & Attribute.Required;
  };
}

export interface SiteFooterBranchLocation extends Schema.Component {
  collectionName: 'components_site_footer_branch_locations';
  info: {
    displayName: 'BranchLocation';
    icon: 'archive';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    address: Attribute.Text;
    phones: Attribute.Component<'site-footer.contact-phone', true>;
    emails: Attribute.Component<'site-footer.contact-email', true>;
  };
}

export interface SiteFooterContactEmail extends Schema.Component {
  collectionName: 'components_site_footer_contact_emails';
  info: {
    displayName: 'ContactEmail';
    icon: 'envelop';
  };
  attributes: {
    address: Attribute.Email & Attribute.Required;
    department: Attribute.String;
  };
}

export interface SiteFooterContactPhone extends Schema.Component {
  collectionName: 'components_site_footer_contact_phones';
  info: {
    displayName: 'ContactPhone';
    icon: 'phone';
  };
  attributes: {
    number: Attribute.String & Attribute.Required;
    location: Attribute.String;
  };
}

export interface SiteFooterFooterLink extends Schema.Component {
  collectionName: 'components_site_footer_footer_links';
  info: {
    displayName: 'FooterLink';
    icon: 'link';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface SiteFooterSocialPlatform extends Schema.Component {
  collectionName: 'components_site_footer_social_platforms';
  info: {
    displayName: 'SocialPlatform';
    icon: 'thumbUp';
  };
  attributes: {
    platform: Attribute.Enumeration<
      ['Facebook', 'X', 'LinkedIn', 'Instagram', 'YouTube']
    > &
      Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface WhatWeDoGrantItem extends Schema.Component {
  collectionName: 'components_what_we_do_grant_items';
  info: {
    displayName: 'GrantItem';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    hasImage: Attribute.Boolean & Attribute.Required;
    image: Attribute.Media;
    description: Attribute.Blocks & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.group-company': AboutGroupCompany;
      'about.iso-certificate': AboutIsoCertificate;
      'about.partner': AboutPartner;
      'about.value': AboutValue;
      'page-content.slide': PageContentSlide;
      'site-footer.branch-location': SiteFooterBranchLocation;
      'site-footer.contact-email': SiteFooterContactEmail;
      'site-footer.contact-phone': SiteFooterContactPhone;
      'site-footer.footer-link': SiteFooterFooterLink;
      'site-footer.social-platform': SiteFooterSocialPlatform;
      'what-we-do.grant-item': WhatWeDoGrantItem;
    }
  }
}
