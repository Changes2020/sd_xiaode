import React from 'react';
import { connect } from 'dva';
import Loading from 'components/Loading/Loading';
import UserIntroduceRoute from '../Static/Brochure/brochure';

class AppLogin extends React.Component {
  ceshi = () => {
    window.localStorage.removeItem('userInfo');
  };
  render() {
    const { isLoading, login } = this.props;
    const { isLogin } = login;
    return (
      <div onClick={this.ceshi}>
        {!isLogin ? null : <UserIntroduceRoute />}
        {isLoading && <Loading />}
      </div>
    );
  }
}

export default connect(({ login, loading }) => ({
  login,
  isLoading: loading.effects['login/getUserInfo'],
}))(AppLogin);
