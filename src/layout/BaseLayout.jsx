import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route, routerRedux } from 'dva/router';
import { getRoutes } from '../utils/routerUtils';
import { getItem } from '../utils/localStorage';
import { getAuthority } from '../utils/authority';

class BaseLayout extends React.Component {
  componentWillMount() {
    this.getUserInfo();
    this.checkoutOrgmap();
    this.getDisAbleDate();
  }
  getDisAbleDate = () => {
    const { isTimeData } = this.props;
    if (isTimeData) {
      return;
    }
    this.props.dispatch({
      // 此数据在其他请求中会用到,所以放在will里面请求
      type: 'index/getDisAbleDate',
      payload: {},
    });
  };

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
  checkoutOrgmap = () => {
    const { isOrgMap } = this.props;
    if (isOrgMap) {
      return;
    }
    // 此方法检测组织结构是否过期
    const store = getItem('allOrgMap');
    const { value, isExpries } = store;
    if (isExpries || !value) {
      this.props.dispatch({
        type: 'index/getOrgMap',
      });
    } else {
      this.props.dispatch({
        type: 'index/saveOrgMap',
        payload: { code: 2000 },
      });
    }
  };
  render() {
    const { routerData, match } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
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
  isTimeData: index.isTimeData,
  isOrgMap: index.isOrgMap,
}))(BaseLayout);
