// import { firstCreditList } from '../services/api';

export default {
  namespace: 'Assistant',
  state: {},
  effects: {},

  reducers: {
    saveData(state, action) {
      return { ...state, ...action.payload };
    },
  },
  subscriptions: {},
};
