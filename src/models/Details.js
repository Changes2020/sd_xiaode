import { getCreditDetail } from '../services/api';
// import {isRequestRelative} from '../utils/FormatDate';
// import {dealWithRelativeData, detailRelativeData} from '../utils/dealWithRelative';
// import {getAllGroupMap, highLightData} from "../utils/dimensionAuthority";

export default {
  namespace: 'Details',
  state: {
    highGroupId: [], // high data
    dataList: 'nodata',
    dataSecList: null,
    dataOrg: null, // 用户权限
    allOrgMap: null, // zuzhi
    modelflag: false,
    dateType: null,
    groupData: {},
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { paramsObj } = payload;
      const dataList = yield call(getCreditDetail, { ...paramsObj });
      yield put({
        type: 'saveData',
        payload: { dataList: dataList.data },
      });
    },
    *getHighData({ payload }, { put }) {
      const { highGroupId } = payload;
      yield put({ type: 'saveData', payload: { highGroupId } });
    },
    *getModelStatus({ payload }, { put }) {
      const { modelflag, groupData, dateType } = payload;
      yield put({ type: 'saveData', payload: { modelflag, groupData, dateType } });
    },
  },

  reducers: {
    saveData(state, action) {
      return { ...state, ...action.payload };
    },
  },
  subscriptions: {},
};
