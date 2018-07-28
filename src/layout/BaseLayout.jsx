import React from 'react';
import { connect } from 'dva';
import { Switch, Route } from 'dva/router';
import { getRoutes } from '../utils/routerUtils';
import { getItem } from '../utils/localStorage';

class BaseLayout extends React.Component {
  componentWillMount() {
    this.props.dispatch({
      // 此数据在其他请求中会用到,所以放在will里面请求
      type: 'index/getDisAbleDate',
      payload: {},
    });
  }
  checkoutOrgmap = () => {
    // 此方法检测组织结构是否过期
    const store = getItem('allOrgMap');
    const { value, isExpries } = store;
    if (isExpries || !value) {
      this.props.dispatch({
        // 此数据在其他请求中会用到,所以放在will里面请求
        type: 'index/getDisAbleDate',
        payload: {},
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
          {/* <Redirect exact from="/" to='/indexPage' /> */}
        </Switch>
      </div>
    );
  }
}

export default connect(({ index, loading }) => ({ index, loading }))(BaseLayout);
