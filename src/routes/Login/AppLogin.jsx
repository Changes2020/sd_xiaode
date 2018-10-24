import React from 'react';
import { connect } from 'dva';
import Loading from 'components/Loading/Loading';
import { setItem } from 'utils/localStorage';
import { getAuthority } from 'utils/authority';
import { parse } from 'url';
import { setAppUserAuth } from 'services/api';
import config from '../../config';

const { DEBUGGER = false, userId, NODE_ENV = 'pro' } = config;

class AppLogin extends React.Component {
  UNSAFE_componentWillMount() {
    if (DEBUGGER) {
      setItem('userInfo', { userId });
      setTimeout(() => {
        this.checkoutHasAuth();
      }, 10);
    } else {
      if (NODE_ENV === 'dev') {
        window.localStorage.removeItem('userInfo');
      }
      this.checkoutHasAuth();
    }
  }
  getCurrentUrlCode = () => {
    return parse(window.location.href, true).query || {};
  };

  checkoutHasAuth = () => {
    // 获取微信授权信息,如果获取失败,则需要跳转微信授权
    const isHasUserId = getAuthority();
    if (isHasUserId) {
      this.props.setRouteUrlParams('/');
    } else {
      const payload = this.getCurrentUrlCode();
      const url = setAppUserAuth(payload);
      window.location.href = url;
    }
  };

  render() {
    const { isloading } = this.props;
    return <div>{isloading && <Loading />}</div>;
  }
}

export default connect(({ loading, login }) => ({
  login,
  isloading: loading.global,
}))(AppLogin);
