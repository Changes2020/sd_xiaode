import { getCreditDetail } from '../services/api';
import { isRequestRelative } from '../utils/FormatDate';
import { detailRelativeData } from '../utils/dealWithRelative';

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
      const { paramsObj, dateType, dataOrg, lineHeight, allOrgMap } = payload;
      const relativeParams = isRequestRelative(paramsObj, dateType); // 环比请求参数,当时间不合法时返回null,不予请求
      const dataList = yield call(getCreditDetail, { ...paramsObj });
      const chainData =
        relativeParams !== null ? yield call(getCreditDetail, { ...relativeParams }) : [];
      yield put({
        type: 'dealDatalist',
        payload: {
          dataList: dataList.data,
          paramsObj,
          chainData: chainData.data,
          dateType,
          dataOrg,
          lineHeight,
          allOrgMap,
        },
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
      const { dataList, dataOrg, paramsObj, lineHeight } = action.payload;

      // 判断可查看权限
      const groupType = { 1: 'college', 2: 'family', 3: 'group' }[paramsObj.groupType];
      const selfGroupData = dataOrg[groupType]; // 权限用户
      const lineHeightData = lineHeight[groupType]; // 获取高亮数据

      if (dataList === 'nodata') {
        return null;
      } else {
        Object.keys(dataList).forEach(itemList => {
          // 循环一级列表
          dataList[itemList].forEach((elList, index) => {
            const data = dataList[itemList][index];
            for (let j = 0, len = lineHeightData.length; j < len; j += 1) {
              // 做高亮显示
              if (lineHeightData[j].groupId === elList.id) {
                data.lineHeight = true;
                break;
              }
            }
            if (dataOrg.groupType === 'admin' || dataOrg.groupType === 'boss') {
              // admin和boss权限
              data.arrowShow = true;
            } else {
              for (let i = 0, len = selfGroupData.length; i < len; i += 1) {
                // 做授权
                if (
                  selfGroupData[i].groupId === elList.id &&
                  selfGroupData[i].familyType === elList.familyType
                ) {
                  data.arrowShow = true;
                  break;
                }
              }
            }
          });
        });
      }
      // 项目，排名/总数字段 在这处理
      Object.keys(dataList).map(item => {
        dataList[item].forEach((el, index) => {
          const _data = dataList[item][index];
          _data.isCheck = false;
          _data.project = '学分均分';
          _data.rank = index + 1;
          _data.total = dataList[item].length;
        });
        return dataList;
      });

      // 环比
      let { chainData } = action.payload;
      if (dataList === 'nodata') {
        return null;
      } else {
        Object.keys(dataList).forEach(item => {
          // 自考,壁垒,孵化器,如果没有值得花默认为null
          if (dataList[item] === undefined) {
            dataList[item] = null;
          } else {
            chainData = chainData === null ? null : chainData;
            if (chainData) dataList[item] = detailRelativeData(dataList[item], chainData[item]);
          }
        });
      }

      return { ...state, ...action.payload };
    },
  },
  subscriptions: {},
};
