import React from 'react';
import { connect } from 'dva';
import { Switch, Redirect } from 'dva/router';
import Loading from 'components/Loading/Loading';
import { setItem } from 'utils/localStorage';
import { getAuthority } from 'utils/authority';
import { getWeChart } from 'services/api';
import config from '../../config';

const { DEBUGGER = false, userId, NODE_ENV = 'pro' } = config;

class WeChartLogin extends React.Component {
  UNSAFE_componentWillMount() {
    if (DEBUGGER) {
      setItem('userInfo', { userId });
      this.checkoutHasAuth();
    } else {
      if (NODE_ENV === 'dev') {
        // window.localStorage.removeItem('userInfo');
      }
      this.checkoutHasAuth();
    }
  }

  checkoutHasAuth = () => {
    // 获取微信授权信息,如果获取失败,则需要跳转微信授权,成功采用重定向的方式跳转
    const isHasUserId = getAuthority();
    if (isHasUserId) {
      // this.props.setRouteUrlParams('/');
    } else {
      const url = getWeChart();
      window.location.href = url;
    }
  };

  render() {
    const { isloading } = this.props;
    const isHasUserId = getAuthority();
    return (
      <div>
        {!isHasUserId ? null : (
          <Switch>
            <Redirect from="/user/wechart" to="/indexPage" />
          </Switch>
        )}

        {/* <span onClick={this.gotoHome}>点击进入主页</span>   */}
        {isloading && <Loading />}
      </div>
    );
  }
}

export default connect(({ loading }) => ({
  isloading: loading.global,
}))(WeChartLogin);
