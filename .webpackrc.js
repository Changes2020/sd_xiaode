const path = require('path');
const hostObj = {
  production: 'http://bi-m.ministudy.com/apis',
  development: 'http://172.16.117.65:8082',
};
export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd-mobile', style: 'css' }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    services: path.resolve(__dirname, 'src/services/'),
  },
  ignoreMomentLocale: true,
  // theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: false,
  publicPath: '/',
  hash: true,
  define: {
    API_TYPE: process.env.API_TYPE,
    USER_ID: process.env.USER_ID,
    HOST: hostObj[process.env.API_TYPE] || 'http://bi-m.ministudy.com/apis',
    __CDN__: 'http://172.16.225.4:8087/staticFile/biFile',
  },
};
