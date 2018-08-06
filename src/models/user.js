export default {
  namespace: 'user',

  state: {
    count: 0,
  },

  subscriptions: {},

  effects: {
    *login(_, { put }) {
      // eslint-disable-line
      const count = 3;
      yield put({
        type: 'save',
        payload: { count },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
