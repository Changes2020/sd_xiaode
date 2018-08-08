import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import { getRoutes } from '../utils/routerUtils';
import { getItem } from '../utils/localStorage';
import Loading from '../components/Loading/Loading';

class BaseLayout extends React.Component {
  render() {
    const { routerData, match } = this.props;
    const userInfo = getItem('userInfo').value;
    const timeDate = getItem('timeDate').value;
    const allOrgMap = getItem('allOrgMap').value;
    return (
      <div>
        {userInfo && timeDate && allOrgMap ? (
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
            <Redirect from="/" to="/indexPage" />
          </Switch>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(({ index, loading }) => ({
  index,
  loading,
  isLogin: index.isLogin,
}))(BaseLayout);
