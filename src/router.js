import React from 'react';
import { routerRedux,Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import {getAuthority} from './utils/authority';
import Loading from './components/Loading/Loading'

dynamic.setDefaultLoadingComponent(() => {
  return <Loading/>;
});
const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
function RouterConfig({ history,app }) {
  const routerData = getRouterData(app);
  const BaseLayout=routerData['/'].component;
  const UserLayout=routerData['/user'].component;
  const Exception=routerData['/exception'].component;
  const StaticLayout=routerData['/static'].component;
  return (
    <ConnectedRouter history={history}>
      <Switch>
      <Route path="/exception" render={props => <Exception {...props} />}/>
      <Route path="/user" render={props => <UserLayout {...props} />}/>
      <Route path="/static" render={props => <StaticLayout {...props} />}/>
      <AuthorizedRoute
            path="/"
            render={props => <BaseLayout {...props} />}
            authority={getAuthority}
            redirectPath="/exception/403"
          />
      
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
