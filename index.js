'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/cjs/my-package.production.min.js');
} else {
  module.exports = require('./dist/cjs/my-package.development.js');
}
