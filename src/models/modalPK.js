import { getPKObject } from '../services/api';
// import { isRequestRelative } from '../utils/FormatDate';
// import { detailRelativeData } from '../utils/dealWithRelative';
import Message from '../components/Message';

export default {
  namespace: 'modalPK',
  state: {
    dataList: [],
  },
  effects: {
    *getPKObject({ payload }, { call, put }) {
      const dataList = yield call(getPKObject, { ...payload });
      if (dataList.code === 2000) {
        yield put({
          type: 'dealDatalist',
          payload: {
            dataList: dataList.data,
          },
        });
      } else {
        Message.fail(dataList.msg);
      }
    },
  },

  reducers: {
    dealDatalist(state, { payload: { dataList } }) {
      return { ...state, dataList };
    },
  },
  subscriptions: {},
};
