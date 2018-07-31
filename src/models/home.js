import { isRequestRelative } from '../utils/FormatDate';
import { dealWithRelativeData } from '../utils/dealWithRelative';
import Message from '../components/Message';
import {
  getCreditRankAvgList,
  getCreditTrendAvgList,
  getCreditCompanyAvgList,
  // getCreditTrendObjList,
} from '../services/api';
import { highLightData } from '../utils/dimensionAuthority';
import Dict from '../utils/typeDict';

export default {
  namespace: 'home',

  state: {
    paramsObj: {},
    fmilyTypeFilteKeyIDs: {
      // 选中趋势图线面的按钮
      selfExam: null,
      barrier: null,
      incubator: null,
    },
    rankDataObj: null, // 排名对象
    trendDataObj: null, // 趋势图请求数据
    companyAvgList: null, // 集团均分数据
    firstMeanObj: null, // 排名第一均分第一对象
    creditShowType: 'rank', // 均分数据展示类型,排名rank,趋势:trend
    getGroupObj: {}, // 获取趋势图下面所有对象数据的储存
  },

  effects: {
    *fetchRank({ payload }, { call, put }) {
      // 排名接口
      const { userInfo, allOrgMap, paramsObj, creditShowType } = payload;
      const relativeParams = isRequestRelative(paramsObj, paramsObj.dateType); // 环比请求参数,当时间不合法时返回null,不予请求
      const rankDataObj = yield call(getCreditRankAvgList, { ...paramsObj });
      if (rankDataObj.code === 2000) {
        const chainData =
          relativeParams !== null ? yield call(getCreditRankAvgList, { ...relativeParams }) : null;
        yield put({
          type: 'saveRank',
          payload: { rankDataObj, paramsObj, creditShowType, chainData, userInfo, allOrgMap },
        });
      } else {
        Message.error(rankDataObj.msg);
      }
    },
    *fetchTrend({ payload }, { call, put }) {
      // 趋势接口,初始化数据以及切换tab
      const trendDataObj = {};
      const { paramsObj, creditShowType } = payload;
      // const allGroupType = getAllGroupMap(allOrgMap, {1: 'college', 2: 'family', 3: 'group'}[paramsObj.groupType]);
      let rankDataObj = yield call(getCreditRankAvgList, { ...paramsObj }); // 根据排名接口控制趋势图接口数据
      const fmilyTypeFilteKeyIDs = {}; // 趋势图西面的按钮
      if (rankDataObj.data !== null) {
        // 排名接口有数据
        for (const item in rankDataObj.data) {
          if (rankDataObj.data[item] !== null) {
            // 判断数据是否有值
            if (rankDataObj.data[item].data !== null && rankDataObj.data[item].data.length > 0) {
              // 判断是否有值
              // 取数据rank为1的值
              const filteKeyArr = rankDataObj.data[item].data.filter(list => list.rank === 1);
              const filteKeyID = filteKeyArr[0].groupId;
              const firstGroupName = filteKeyArr[0].name;
              const familyType = Dict.familyTypeDict[item];
              fmilyTypeFilteKeyIDs[item] = filteKeyID || null;
              const familyTypeReaponse = yield call(getCreditTrendAvgList, {
                ...paramsObj,
                filteKeyID,
                familyType,
              });
              if (familyTypeReaponse.data !== null) {
                // 请求下来数据的处理
                trendDataObj[item] = familyTypeReaponse.data[item];
                trendDataObj[item].title = firstGroupName;
              }
            }
          }
        }
        const companyAvgDataObj = yield call(getCreditCompanyAvgList, { ...paramsObj }); // 获取集团均分数据
        yield put({
          type: 'saveTrend',
          payload: {
            paramsObj,
            creditShowType,
            companyAvgDataObj,
            trendDataObj,
            rankDataObj,
            fmilyTypeFilteKeyIDs,
          },
        });
      } else {
        // 排名接口无数据
        rankDataObj = {};
        yield put({
          type: 'saveEmptyTrend',
          payload: { trendDataObj, rankDataObj, paramsObj, creditShowType },
        });
      }
    },
  },

  reducers: {
    saveRank(state, { payload }) {
      const { paramsObj, creditShowType, userInfo, allOrgMap } = payload;
      const orgObj = highLightData(allOrgMap, userInfo.groupId, userInfo.groupType);
      const rankDataObj = payload.rankDataObj.data === null ? {} : payload.rankDataObj.data;
      const chainData =
        payload.chainData === null || payload.chainData.data === null ? {} : payload.chainData.data;
      Object.keys(rankDataObj).forEach(item => {
        if (!rankDataObj[item]) {
          rankDataObj[item] = null;
        } else {
          const groupType = { 1: 'college', 2: 'family', 3: 'group' }[paramsObj.groupType];
          const selfGroupData = orgObj[groupType]; // 获取高亮数据
          const newChainData = chainData[item] === undefined ? [] : chainData[item].data;
          rankDataObj[item].data = dealWithRelativeData(
            rankDataObj[item].data,
            newChainData,
            'groupId',
            'val'
          );
          rankDataObj[item].data.forEach((list, index) => {
            // 用于高亮操作
            for (let i = 0, len = selfGroupData.length; i < len; i += 1) {
              if (selfGroupData[i].groupId === list.groupId) {
                rankDataObj[item].data[index].isXiangguan = true;
                break;
              }
            }
          });
        }
      });
      return { ...state, rankDataObj, paramsObj, creditShowType };
    },
    saveTrend(state, action) {
      const { paramsObj, creditShowType, trendDataObj, fmilyTypeFilteKeyIDs } = action.payload;
      const rankDataObj =
        action.payload.rankDataObj.data !== null ? action.payload.rankDataObj.data : {};
      const companyAvgDataObj =
        action.payload.companyAvgDataObj.data !== null ? action.payload.companyAvgDataObj.data : {};
      const firstMeanObj = JSON.parse(JSON.stringify(trendDataObj)); // 复制第一数据
      // 判空处理
      return {
        ...state,
        trendDataObj,
        paramsObj,
        creditShowType,
        rankDataObj,
        companyAvgDataObj,
        firstMeanObj,
        fmilyTypeFilteKeyIDs,
      };
    },
    saveEmptyTrend(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
