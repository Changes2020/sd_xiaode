//   暂未使用

import { routerRedux } from 'dva/router';
import { parse } from 'url';
import { setAppUserAuth, setWechartAuth, getUserInfo, operateLog } from 'services/api';
import { getAuthority } from 'utils/authority';
import { setItem, getItem } from 'utils/localStorage';
import typeDict from 'utils/typeDict';
import Message from '../components/Message';
import config from '../config';

const { DEBUGGER = false } = config;
const loginErrorUrlObj = {
  brochure: '/exception/introduceError403',
  wechart: '/exception/403',
  app: '/exception/403',
};

function initGetUserId() {
  if (DEBUGGER) {
    setItem('userInfo', { userId: config.userId });
  }
  return getAuthority();
}
export default {
  namespace: 'login',

  state: {
    isLogin: false,
    userInfo: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const { pathname, search = '' } = history.location;
      const urlParams = parse(search, true).query || {};
      switch (pathname) {
        case '/user/brochure':
          dispatch({
            type: 'brochureLogin',
            payload: { userId: initGetUserId(), pathname },
          });
          break;
        case '/user/wechart':
          dispatch({
            type: 'wechartLogin',
            payload: { userId: initGetUserId(), pathname },
          });
          break;
        case '/user/applogin':
          dispatch({
            type: 'appLogin',
            payload: { userId: initGetUserId(), pathname, urlParams },
          });
          break;
        default:
          break;
      }
    },
  },
  effects: {
    *brochureLogin({ payload }, { call, put }) {
      const { userId, pathname } = payload;
      if (!userId) {
        yield call(setWechartAuth, { loginType: 'brochure' });
        return;
      }
      yield put({
        type: 'getUserInfo',
        payload: { userId, loginType: 'brochure', pathname },
      });
    },
    *wechartLogin({ payload }, { call, put }) {
      const { userId, pathname } = payload;
      if (!userId) {
        yield call(setWechartAuth, { loginType: 'wechart' });
        return;
      }
      yield put({
        type: 'getUserInfo',
        payload: { userId, loginType: 'wechart', pathname },
      });
    },
    *appLogin({ payload }, { call, put }) {
      const { userId, pathname, urlParams } = payload;
      if (!userId) {
        yield call(setAppUserAuth, { ...urlParams, loginType: 'app' });
        return;
      }
      yield put({
        type: 'getUserInfo',
        payload: { userId, loginType: 'app', pathname },
      });
    },
    *getUserInfo({ payload }, { call, put }) {
      const { userId, loginType, pathname } = payload;
      const response = yield call(getUserInfo, { userId });
      if (response && response.code === 2000) {
        setItem('userInfo', response.data);
      }
      yield put({
        type: 'checkoutLoginState',
        payload: { response, loginType, pathname, userId },
      });
    },
    *checkoutLoginState({ payload }, { put }) {
      const { loginType, response } = payload;
      const isLogin = response.code === 2000;
      if (!isLogin) {
        yield put(routerRedux.push(loginErrorUrlObj[loginType]));
        return;
      }
      yield put({
        type: 'saveLoginLog',
        payload,
      });
      yield put({
        type: 'saveUser',
        payload: { isLogin },
      });
    },
    *saveLoginLog({ payload }, { call }) {
      const { pathname = '/scoreresult', loginType = 'pk', operateContent = '' } = payload || {};
      if (loginType === 'brochure') {
        return;
      }
      const userInfo = getItem('userInfo').value || {};
      const { id } = userInfo;
      const response = yield call(operateLog, {
        url: pathname,
        operator: id,
        operateContent,
        operateCode: typeDict.operateCode[`${loginType}_login`],
        operateType: payload.operateType || 'AUTH',
      });
      if (response.code !== 2000) {
        Message.fail(response.msg);
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
