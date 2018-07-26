const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: path.join(__dirname, './src/components'),
          utils: path.resolve(__dirname, 'src/utils/'),
          services: path.resolve(__dirname, 'src/services/'),
        },
      },
    ],
  ],
};