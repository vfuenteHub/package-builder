'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/my-package.production.min.css');
} else {
  module.exports = require('./dist/my-package.development.css');
}
