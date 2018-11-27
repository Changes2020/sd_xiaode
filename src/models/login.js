//   暂未使用

import { routerRedux } from 'dva/router';
import { setAppUserAuth, setWechartAuth, getUserInfo } from 'services/api';
import { getAuthority } from 'utils/authority';
import { setItem } from 'utils/localStorage';
import Message from '../components/Message';
import config from '../config';

const { DEBUGGER = false, userId } = config;

function DebuggerCheckout() {
  if (DEBUGGER) {
    setItem('userInfo', { userId });
  }
}
export default {
  namespace: 'login',

  state: {
    isLogin: false,
    userInfo: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const { pathname } = history.location;
      if (pathname === '/user/brochure') {
        DebuggerCheckout();
        const localUserId = getAuthority();
        if (localUserId) {
          dispatch({
            type: 'getUserInfo',
            payload: { userId: localUserId },
          });
        } else {
          setWechartAuth({ loginType: 'brochure' });
        }
      }
    },
  },
  effects: {
    *getUserInfo({ payload }, { call, put }) {
      const response = yield call(getUserInfo, { ...payload });
      if (response && response.code === 2000) {
        setItem('userInfo', response.data);
        yield put({
          type: 'saveUser',
          payload: { isLogin: response.code === 2000 },
        });
      } else {
        yield put(routerRedux.push('/exception/introduceError403'));
      }
    },
    *setAppUserAuth({ payload }, { call, put }) {
      const response = yield call(setAppUserAuth, payload);
      if (response.code !== 2000) {
        Message.fail(response.msg);
        yield put(routerRedux.push('/exception/403'));
      }
    },
  },

  reducers: {
    saveUser(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
