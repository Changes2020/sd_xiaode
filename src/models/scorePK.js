import { getPKResult } from '../services/api';
// import { isRequestRelative } from '../utils/FormatDate';
// import { detailRelativeData } from '../utils/dealWithRelative';
import Message from '../components/Message';

export default {
  namespace: 'scorePK',
  state: {
    highGroupId: [], // high data
    dataList: null,
    dataSecList: null,
    dataOrg: null, // 用户权限
    allOrgMap: null, // zuzhi
    modelflag: false,
    dateType: null,
    groupData: {},
    checkIds: [],
  },
  effects: {
    *getPKResult({ payload }, { call }) {
      const dataList = yield call(getPKResult, { ...payload });
      if (dataList.code === 2000) {
        console.log(dataList);
      } else {
        Message.fail(dataList.msg);
      }
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
      const { dataList, checkIds } = action.payload;
      if (checkIds) {
        const isCheckObj = {};
        if (dataList) {
          Object.keys(dataList).map(item => {
            dataList[item].forEach((el, index) => {
              isCheckObj[`${el.familyType}${el.id}`] = false;
              const _checkId = checkIds.find(id => id === `${el.familyType}${el.id}`);
              if (_checkId) {
                isCheckObj[_checkId] = true;
              }
              dataList[item][index].isCheck = isCheckObj[`${el.familyType}${el.id}`];
            });
            return dataList;
          });
        }
      }
      return { ...state, ...action.payload };
    },
  },
  subscriptions: {},
};
