import React from 'react';
import { Redirect, Switch, Route } from 'dva/router';
import { getRoutes } from '../utils/routerUtils';

class BaseLayout extends React.Component {
  render() {
    const { routerData, match } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Switch>    
          {getRoutes(match.path, routerData).map(item => (
            <Route key={item.key} 
            path={item.path} 
            component={item.component} 
            exact={item.exact} 
            authority={item.authority}
            redirectPath="/exception/403"
            />
          ))}
          <Redirect exact from="/" to='/indexPage' />
        </Switch>
      </div>
    );
  }
}

export default BaseLayout;