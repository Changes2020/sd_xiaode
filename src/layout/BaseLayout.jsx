import React from 'react';
import { connect } from 'dva';
import { Switch, Route } from 'dva/router';
import { getRoutes } from '../utils/routerUtils';

class BaseLayout extends React.Component {
  render() {
    const { routerData, match } = this.props;
    return (
      <div>
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
              authority={item.authority}
              redirectPath="/exception/403"
            />
          ))}
        </Switch>
      </div>
    );
  }
}

export default connect(({ index, loading }) => ({
  index,
  loading,
  isLogin: index.isLogin,
}))(BaseLayout);
