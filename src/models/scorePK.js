import { getPKResult } from '../services/api';
import Message from '../components/Message';
import Dict from '../utils/typeDict';

// 格式化数据结构
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
      const { groupTypeDict } = Dict; // 枚举类型
      const { dataOrg, paramsObj } = action.payload;
      const dataList = action.payload.dataList || {};
      // 判断可查看权限
      const groupType = groupTypeDict[Number(paramsObj.groupType)];
      const selfGroupData = dataOrg[groupType]; // 权限用户

      const arr = []; // 需要递归的数组
      const objArr = []; // 最外层数据
      if (!dataList) {
        return null;
      } else {
        dataList.forEach((item, index) => {
          arr.push(item.dimensionPKResult);
          objArr.push({
            id: item.id,
            orgName: item.orgName,
            familyType: item.familyType,
            groupType: item.groupType,
          });
          if (dataOrg.groupType === 'admin' || dataOrg.groupType === 'boss') {
            // admin和boss权限
            objArr[index].arrowShow = true;
          } else {
            for (let i = 0, len = selfGroupData.length; i < len; i += 1) {
              // 做授权
              if (selfGroupData[i].groupId === item.id) {
                objArr[index].arrowShow = true;
                break;
              }
            }
          }
        });
      }
      handdleReault(arr, objArr);
      return { ...state, ...action.payload };
    },
  },
  subscriptions: {},
};
