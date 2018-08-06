// import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { getDisableTime, getUserInfo, getOrgMap } from 'services/api';
import { setItem } from 'utils/localStorage';
// import Message from '../components/Message';

export default {
  namespace: 'index',

  state: {
    isOrgMap: false,
    isTimeData: false,
    isLogin: false,
    userInfo: null,
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    // },
  },

  effects: {
    *getDisAbleDate(_, { call, put }) {
      const response = yield call(getDisableTime);
      yield put({
        type: 'saveTimeData',
        payload: response,
      });
      if (response.code === 2000 && response.data) {
        setItem('timeDate', response.data);
      }
    },
    *getUserInfo({ payload }, { call, put }) {
      const response = yield call(getUserInfo, { ...payload });
      yield put({
        type: 'saveUser',
        payload: response,
      });
      if (response && response.code === 2000) {
        setItem('userInfo', response.data);
        //  请求获取时间接口
        //   const timeResponse = yield call(getDisableTime);
        //   if(timeResponse.code===2000){
        //     setItem('timeDate', response.data);
        //   }else {
        //
        //   }
      } else {
        yield put(routerRedux.push('/exception/403'));
      }
    },
    *getOrgMap(_, { call, put }) {
      const response = yield call(getOrgMap);
      yield put({
        type: 'saveOrgMap',
        payload: response,
      });
      if (response && response.code === 2000) {
        setItem('allOrgMap', response.data, 1);
      }
    },
    *ceshi() {
      console.log(9999);
    },
  },

  reducers: {
    saveUser(state, { payload }) {
      const isLogin = payload && payload.code === 2000;
      const userInfo = isLogin ? payload.data : null;
      return { ...state, isLogin, userInfo };
    },
    saveTimeData(state, { payload }) {
      const isTimeData = payload && payload.code === 2000;
      return { ...state, isTimeData };
    },
    saveOrgMap(state, { payload }) {
      const isOrgMap = payload && payload.code === 2000;
      return { ...state, isOrgMap };
    },
  },
};
