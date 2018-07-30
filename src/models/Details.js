import { firstCreditList } from '../services/api';
// import {isRequestRelative} from '../utils/FormatDate';
// import {dealWithRelativeData, detailRelativeData} from '../utils/dealWithRelative';
// import {getAllGroupMap, highLightData} from "../utils/dimensionAuthority";

export default {
  namespace: 'Details',
  state: {
    paramsObj: {
      userId: 1, // 用户身份
      groupType: 1, // 1:学院，2:家族，3:小组 //1:周均数据，2:月均数据，3:自定义数据
      startTime: null,
      endTime: null,
    },
    paramsObj2: {
      groupType: 1, // 1:学院，2:家族，3:小组
      startTime: null,
      endTime: null,
      groupId: 301,
      familyType: 1, // 1:自考，2:壁垒，3:孵化器
    },
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
      const dataList = yield call(firstCreditList, { ...paramsObj });
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
