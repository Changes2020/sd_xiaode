import { getPKResult } from '../services/api';
import Message from '../components/Message';

function handdleReault(arr, objArr) {
  if (!arr || arr.length === 0) {
    return;
  }
  const childrenArr = [];
  arr.forEach(item => {
    if (item.childNode) childrenArr.push(item.childNode);
  });
  const obj1 = arr.find(item => item) || {};
  const children1 = obj1.childNode || [];
  obj1.pkReault = Array.isArray(arr) ? arr.slice() : [];
  if (children1 && children1.length) {
    for (let i = 0, len = children1.length; i < len; i += 1) {
      const resultArr = [];
      for (let n = 0, ls = childrenArr.length; n < ls; n += 1) {
        childrenArr[n][i].originObj = objArr[n];
        resultArr.push(childrenArr[n][i]);
      }
      handdleReault(resultArr, objArr);
    }
  } else {
    handdleReault();
  }
}
export default {
  namespace: 'scorePK',
  state: {
    dataList: null,
    dataOrg: null, // 用户权限
  },
  effects: {
    *getPKResult({ payload }, { call, put }) {
      const { paramsObj, dataOrg } = payload;
      const dataList = yield call(getPKResult, { ...paramsObj });
      if (dataList.code === 2000) {
        yield put({ type: 'save', payload: { dataList: dataList.data, dataOrg, paramsObj } });
      } else {
        Message.fail(dataList.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      const { dataOrg, paramsObj } = action.payload;
      const dataList = action.payload.dataList || {};
      // 判断可查看权限
      const groupType = { 1: 'college', 2: 'family', 3: 'group' }[Number(paramsObj.groupType)];
      const selfGroupData = dataOrg[groupType]; // 权限用户

      const arr = [];
      if (!dataList) {
        return null;
      } else {
        dataList.forEach(item => {
          arr.push(item.dimensionPKResult);
          if (dataOrg.groupType === 'admin' || dataOrg.groupType === 'boss') {
            // admin和boss权限
          } else {
            for (let i = 0, len = selfGroupData.length; i < len; i += 1) {
              // 做授权
              if (selfGroupData[i].groupId === item.id) {
                break;
              }
            }
          }
        });
      }
      console.log(dataList);
      handdleReault(arr, dataList);
      return { ...state, ...action.payload };
    },
  },
  subscriptions: {},
};
