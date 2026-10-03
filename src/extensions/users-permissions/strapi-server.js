'use strict';

const user = require('./controllers/user');

module.exports = (plugin) => {
  plugin.controllers.user.me = user.me;
  return plugin;
};