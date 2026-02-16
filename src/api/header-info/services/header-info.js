'use strict';

/**
 * header-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::header-info.header-info');
