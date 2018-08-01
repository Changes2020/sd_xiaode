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
    isCheck: false,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { paramsObj } = payload;
      const dataList = yield call(getCreditDetail, { ...paramsObj });
      yield put({
        type: 'dealDatalist',
        payload: { dataList: dataList.data },
      });
    },
    *saveIsCheck({ payload }, { put }) {
      const { isCheck, data } = payload;
      yield put({
        type: 'saveCheck',
        payload: { isCheck, data },
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
    saveCheck(state, action) {
      const { data, isCheck } = action.payload;
      Object.keys(data).map(() => {
        data.isCheck = isCheck;
        return data;
      });
      return { ...state, ...action.payload };
    },
    dealDatalist(state, action) {
      const { dataList } = action.payload;
      Object.keys(dataList).map(item => {
        // 自考,壁垒,孵化器,如果没有值得花默认为null
        dataList[item].forEach((el, index) => {
          const _data = dataList[item][index];
          _data.isCheck = false;
          _data.project = '学分均分';
          _data.rank = index + 1;
          _data.total = dataList[item].length;
        });
        return dataList;
      });
      return { ...state, ...action.payload };
    },
  },
  subscriptions: {},
};
