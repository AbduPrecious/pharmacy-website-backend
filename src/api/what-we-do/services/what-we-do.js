'use strict';

/**
 * what-we-do service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::what-we-do.what-we-do');
