/* eslint global-require: off */
// Root.dev component contains DevTools
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}
