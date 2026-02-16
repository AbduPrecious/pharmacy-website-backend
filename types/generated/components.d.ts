import type { Schema, Attribute } from '@strapi/strapi';

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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'site-footer.branch-location': SiteFooterBranchLocation;
      'site-footer.contact-email': SiteFooterContactEmail;
      'site-footer.contact-phone': SiteFooterContactPhone;
      'site-footer.footer-link': SiteFooterFooterLink;
      'site-footer.social-platform': SiteFooterSocialPlatform;
    }
  }
}
