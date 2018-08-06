import { routerRedux } from 'dva/router';
import { getDisableTime, getUserInfo, getOrgMap } from 'services/api';
import { setItem, getItem } from 'utils/localStorage';
import Message from '../components/Message';
import { getAuthority } from '../utils/authority';

export default {
  namespace: 'index',

  state: {
    isLogin: false,
    userInfo: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      const userId = getAuthority();
      const { pathname } = history.location;
      if (pathname === '/') {
        if (userId) {
          dispatch({
            type: 'getUserInfo',
            payload: { userId },
          });
        } else {
          dispatch(routerRedux.push('/exception/403'));
        }
      }
    },
  },

  effects: {
    *getUserInfo({ payload }, { call, put }) {
      const orgStore = getItem('allOrgMap');
      const { value, isExpries } = orgStore;
      const response = yield call(getUserInfo, { ...payload });
      if (response && response.code === 2000) {
        setItem('userInfo', response.data);
        //  请求获取时间接口
        const timeResponse = yield call(getDisableTime);
        /* ************** 获取组织结构表************* */
        if (isExpries || !value) {
          const orgMapResponse = yield call(getOrgMap);
          // 储存组织机构
          if (orgMapResponse && orgMapResponse.code === 2000) {
            setItem('allOrgMap', orgMapResponse.data, 1);
          } else {
            Message.fail(orgMapResponse.msg);
          }
        }
        /* ************** 储存时间参数 ************** */
        if (timeResponse.code === 2000) {
          setItem('timeDate', timeResponse.data);
        } else {
          Message.fail(timeResponse.msg);
        }
        /* ************** 跳转至首页 ************** */
        yield put(routerRedux.push('/indexPage'));
      } else {
        yield put(routerRedux.push('/exception/403'));
      }
      yield put({
        type: 'saveUser',
        payload: response,
      });
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
