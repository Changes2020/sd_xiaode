import { Toast } from 'antd-mobile';
export default {
  namespace: 'example',

  state: {
    count:0
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
    const count=3;
    Toast.success('success')
      yield put({ type: 'save' ,
      payload:{count}});
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
