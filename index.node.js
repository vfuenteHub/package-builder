'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/umd/my-package.production.min.js');
} else {
  module.exports = require('./dist/umd/my-package.development.js');
}
