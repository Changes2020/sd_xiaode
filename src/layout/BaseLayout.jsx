import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route, routerRedux } from 'dva/router';
import { getRoutes } from '../utils/routerUtils';
import { getAuthority } from '../utils/authority';

class BaseLayout extends React.Component {
  componentWillMount() {
    this.getUserInfo();
  }
  getUserInfo = () => {
    const userId = getAuthority();
    const { isLogin } = this.props;
    if (userId) {
      if (!isLogin) {
        this.props.dispatch({
          type: 'index/getUserInfo',
          payload: { userId },
        });
      } else {
        this.props.dispatch(routerRedux.push('/indexPage'));
      }
    } else {
      this.props.dispatch(routerRedux.push('/exception/403'));
    }
  };
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
          <Redirect exact from="/" to="/indexPage" />
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
