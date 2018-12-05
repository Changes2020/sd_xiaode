import { getPKObject } from '../services/api';
// import { isRequestRelative } from '../utils/FormatDate';
// import { detailRelativeData } from '../utils/dealWithRelative';
import Message from '../components/Message';

export default {
  namespace: 'modalPK',
  state: {
    dataList: [],
    dataAll: [],
  },
  effects: {
    *getPKObject({ payload }, { call, put }) {
      const params = { ...payload };
      const { groupType } = params;
      delete params.groupType;
      const result = yield call(getPKObject, params);
      if (result.code === 2000) {
        const dataAll = result.data;
        yield put({
          type: 'checkData',
          payload: {
            dataAll,
            groupType,
          },
        });
      } else {
        Message.fail(result.msg);
      }
    },
  },

  reducers: {
    checkData(state, { payload: { dataAll, groupType } }) {
      const dataList = [];
      dataAll.forEach(v => {
        if (v.groupType === groupType) {
          dataList.push(v);
        }
      });
      return { ...state, dataList, dataAll };
    },
  },
  subscriptions: {},
};
