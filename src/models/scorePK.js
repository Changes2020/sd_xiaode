import { getPKResult } from '../services/api';
import Message from '../components/Message';

// // 递归添加属性
// function iteration(data) {
//   for (let j = 0; j < data.length; j += 1) {
//     data[j].arrowShow = true;
//     if (data[j].childNode) {
//       iteration(data[j].childNode);
//     }
//   }
// }

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
        console.log(dataList);
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
      const groupType = { 1: 'college', 2: 'family', 3: 'group' }[paramsObj.groupType];
      const selfGroupData = dataOrg[groupType]; // 权限用户

      if (!dataList) {
        return null;
      } else if (dataOrg.groupType === 'admin' || dataOrg.groupType === 'boss') {
        // admin和boss权限
        // iteration(dataList);
      } else {
        for (let i = 0, len = selfGroupData.length; i < len; i += 1) {
          // 做授权
          if (selfGroupData[i].groupId === dataList[0].id) {
            // iteration(dataList);
            break;
          }
        }
      }
      return { ...state, ...action.payload };
    },
  },
  subscriptions: {},
};
