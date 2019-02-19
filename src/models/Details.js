import { getCreditDetail, pinyinComparator } from '../services/api';
import { isRequestRelative } from '../utils/FormatDate';
import { detailRelativeData } from '../utils/dealWithRelative';
import Dict from '../utils/typeDict';
import Message from '../components/Message';
import { SortChanseData } from '../utils/sortChineseWord';

const isEquraParams = (obj1, obj2) => {
  return (
    obj1.id === obj2.id &&
    obj1.familyType === obj2.familyType &&
    obj1.collegeId === obj2.collegeId &&
    obj1.familyId === obj2.familyId &&
    obj1.groupId === obj2.groupId
  );
};

export default {
  namespace: 'Details',
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
    sortData: {}, //  将数据进行排序之后的总数据
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { paramsObj, dateType, dataOrg, lineHeight, allOrgMap } = payload;
      const relativeParams = isRequestRelative(paramsObj, dateType); // 环比请求参数,当时间不合法时返回null,不予请求
      const dataList = yield call(getCreditDetail, { ...paramsObj });
      if (dataList.code === 2000) {
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
    *pinyinComparator({ payload }, { call, put }) {
      const { dataListObj, groupType } = payload;
      const originSortData = [];
      const sortData = {};
      // 合并请求
      Object.keys(dataListObj).forEach(item => {
        const arr = Array.isArray(dataListObj[item]) ? dataListObj[item] : [];
        sortData[item] = dataListObj[item];
        const newArr = arr.map(list => ({
          familyType: list.familyType,
          collegeId: list.collegeId,
          familyId: list.familyId,
          groupId: list.groupId,
          id: list.id,
          name: list.name,
        }));
        originSortData.push(...newArr);
      });
      const response = yield call(pinyinComparator, { data: originSortData, keys: 'name' });
      if (response.code === 2000) {
        const sortDataList = Array.isArray(response.data)
          ? response.data.map((list, index) => ({ ...list, pinyinSortNum: index }))
          : [];
        Object.keys(dataListObj).forEach(item => {
          sortData[item] = [];
          const groupArr = dataListObj[item];
          groupArr.forEach(jj => {
            sortData[item].push({
              pinyinSortNum: sortDataList.find(node => isEquraParams(node, jj)).pinyinSortNum,
              category: jj.name,
              groupId: `${jj.familyType}${jj.id}`,
              tabKey: groupType,
            });
          });
          sortData[item] = SortChanseData(sortData[item]); // 排序
        });
      }
      yield put({ type: 'saveSortData', payload: { sortData } });
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
              // forEach(id => {
              //   if (id === `${el.familyType}${el.id}`) {
              //     isCheckObj[id] = true;
              //   }
              //   dataList[item][index].isCheck = isCheckObj[`${el.familyType}${el.id}`];
              // });
            });
            return dataList;
          });
        }
      }
      return { ...state, ...action.payload };
    },
    dealDatalist(state, action) {
      const { groupTypeDict } = Dict;
      const { dataOrg, paramsObj, lineHeight } = action.payload;
      const dataList = action.payload.dataList || {};

      // 判断可查看权限
      const groupType = groupTypeDict[paramsObj.groupType];
      const selfGroupData = dataOrg[groupType]; // 权限用户
      const lineHeightData = lineHeight[groupType]; // 获取高亮数据

      if (!dataList) {
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
      if (!dataList) {
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
    saveSortData(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
