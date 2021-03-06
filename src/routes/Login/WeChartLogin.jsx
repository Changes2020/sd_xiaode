import React from 'react';
import { connect } from 'dva';
import { Switch, Redirect } from 'dva/router';
import Loading from 'components/Loading/Loading';
// import { setItem } from 'utils/localStorage';
// import { getAuthority } from 'utils/authority';
// import { setWechartAuth } from 'services/api';
// import config from '../../config';

// const { DEBUGGER = false, userId, NODE_ENV = 'pro' } = config;

class WeChartLogin extends React.Component {
  // UNSAFE_componentWillMount() {
  //   if (DEBUGGER) {
  //     setItem('userInfo', { userId });
  //     this.checkoutHasAuth();
  //   } else {
  //     if (NODE_ENV === 'dev') {
  //       window.localStorage.removeItem('userInfo');
  //     }
  //     this.checkoutHasAuth();
  //   }
  // }

  // checkoutHasAuth = () => {
  //   // 获取微信授权信息,如果获取失败,则需要跳转微信授权,成功采用重定向的方式跳转
  //   const isHasUserId = getAuthority();
  //   if (isHasUserId) {
  //     this.props.setRouteUrlParams('/');
  //   } else {
  //     setWechartAuth({ loginType: 'wechart' });
  //   }
  // };

  render() {
    const { isLoading, login } = this.props;
    const { isLogin } = login;
    // const isHasUserId = getAuthority();
    return (
      <div>
        {!isLogin ? null : (
          <Switch>
            <Redirect from="/user/wechart" to="/indexPage" />
          </Switch>
        )}
        {isLoading && <Loading />}
      </div>
    );
  }
}

export default connect(({ loading, login }) => ({
  login,
  isLoading: loading.effects['login/getUserInfo'],
}))(WeChartLogin);
