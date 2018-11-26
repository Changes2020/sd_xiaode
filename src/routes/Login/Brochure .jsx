import React from 'react';
import { connect } from 'dva';
import Loading from 'components/Loading/Loading';
import { setItem } from 'utils/localStorage';
import { getAuthority } from 'utils/authority';
import { setWechartAuth } from 'services/api';
import UserIntroduceRoute from '../Static/Test/test';
import IntroduceError403 from '../Exception/IntroduceError403';
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

  checkoutHasAuth = () => {
    // 获取微信授权信息,如果获取失败,则需要跳转微信授权
    const isHasUserId = getAuthority();
    if (isHasUserId) {
      // this.props.setRouteUrlParams('/');
    } else {
      setWechartAuth({ loginType: 'brochure' });
    }
  };

  render() {
    const { isloading } = this.props;
    const isHasUserId = getAuthority();
    return (
      <div>
        {!isHasUserId ? <IntroduceError403 /> : <UserIntroduceRoute />}
        {isloading && <Loading />}
      </div>
    );
  }
}

export default connect(({ loading, login }) => ({
  login,
  isloading: loading.global,
}))(AppLogin);
