//   暂未使用

import { routerRedux } from 'dva/router';
import { setAppUserAuth } from 'services/api';
import Message from '../components/Message';

export default {
  namespace: 'login',

  state: {
    isLogin: false,
    userInfo: null,
  },

  effects: {
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
      const isLogin = payload && payload.code === 2000;
      const userInfo = isLogin ? payload.data : null;
      return { ...state, isLogin, userInfo };
    },
  },
};
