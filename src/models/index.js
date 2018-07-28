// import { Toast } from 'antd-mobile';
import { getDisableTime } from 'services/api';
import { setItem } from 'utils/localStorage';

export default {
  namespace: 'index',

  state: {
    count: 0,
  },

  subscriptions: {
    // setup({ dispatch, history }) {},
  },

  effects: {
    *getDisAbleDate(_, { call }) {
      const reponse = yield call(getDisableTime);
      if (reponse.code === 2000 && reponse.data) {
        setItem('timeDate', reponse.data);
      }
    },
    // *fetch({ payload }, { call, put }) {
    //   // eslint-disable-line
    //   const count = 3;
    //   Toast.success('success');
    //   yield put({
    //     type: 'save',
    //     payload: { count },
    //   });
    // },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
