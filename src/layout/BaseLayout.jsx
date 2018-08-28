import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import { getRoutes } from '../utils/routerUtils';
import { getItem } from '../utils/localStorage';
import Loading from '../components/Loading/Loading';

class BaseLayout extends React.Component {
  componentDidMount() {
    const { loading } = this.props;
    const userInfo = getItem('userInfo').value;
    const { groupId, userId } = userInfo;
    if ((!groupId || !userId) && !loading) {
      // 当用户进入之后多次返回页面造成的bug
      this.getUserInfo();
    }
  }
  getUserInfo = () => {
    const userInfo = getItem('userInfo').value;
    const { userId = null } = userInfo;
    this.props.dispatch({
      type: 'index/getUserInfo',
      payload: { userId },
    });
  };
  render() {
    const { loading } = this.props;
    const { routerData, match } = this.props;
    return (
      <div>
        {!loading ? (
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
  loading: loading.models.index,
}))(BaseLayout);
