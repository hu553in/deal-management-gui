const { alias } = require('react-app-rewire-alias');

module.exports = config =>
  alias({
    '@src': './src',
  })(config);
