import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import {getUrlParams,getLastUrlParams,setRouteUrlParams,setCurrentUrlParams} from './routerParams'


let routerDataCache;
const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });
// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });

    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      const urlParams=getUrlParams(app);
      const lastUrlParams=getLastUrlParams(app);

      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
            urlParams,
            lastUrlParams,
            setRouteUrlParams,
            setCurrentUrlParams
          });
      });
    },
  });
};

// function getFlatMenuData(menus) {
//   let keys = {};
//   menus.forEach(item => {
//     if (item.children) {
//       keys[item.path] = { ...item };
//       keys = { ...keys, ...getFlatMenuData(item.children) };
//     } else {
//       keys[item.path] = { ...item };
//     }
//   });
//   return keys;
// }

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['global','index'], () => import('../layout/BaseLayout')),
    },
    '/indexPage': {
        component: dynamicWrapper(app, ['example'], () => import('../routes/Home/IndexPage')),
      },
      '/chartlist': {
        component: dynamicWrapper(app, ['example'], () => import('../routes/Home/ChartList')),
      },
      '/details': {
        component: dynamicWrapper(app, ['example'], () => import('../routes/Details/Details')),
      },
      '/demention': {
        component: dynamicWrapper(app, ['example'], () => import('../routes/Demention/Demention')),
      },
      '/user': {
        component: dynamicWrapper(app, [], () => import('../layout/UserLayout')),
      },
      '/user/wechart': {
        component: dynamicWrapper(app, ['user'], () => import('../routes/Login/WeChartLogin')),
      },
      '/static': {
        component: dynamicWrapper(app, ['user'], () => import('../layout/StaticLayout')),
      },
      '/exception': {
        component: dynamicWrapper(app, [], () => import('../layout/Exception')),
      },
      '/exception/403': {
        component: dynamicWrapper(app, [], () => import('../routes/Exception/Error403')),
      },
      '/exception/404': {
        component: dynamicWrapper(app, [], () => import('../routes/Exception/Error404')),
      },
      '/exception/500': {
        component: dynamicWrapper(app, [], () => import('../routes/Exception/Error500')),
      },
    
  };
  
  return routerConfig;
};
