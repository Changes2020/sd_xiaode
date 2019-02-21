import { getPKObject, pinyinComparator } from '../services/api';
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
        let dataAll = Array.isArray(result.data) ? result.data : [];
        // 对数据进行排序
        if (dataAll.length) {
          const sortDataResponse = yield call(pinyinComparator, { data: dataAll, keys: 'orgName' });
          if (sortDataResponse.code === 2000) {
            dataAll = Array.isArray(sortDataResponse.data)
              ? sortDataResponse.data.map((list, index) => ({ ...list, pinyinSortNum: index }))
              : dataAll;
          }
        }
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
      const dataList = dataAll.filter(item => item.groupType === groupType);
      return { ...state, dataList, dataAll };
    },
  },
  subscriptions: {},
};
