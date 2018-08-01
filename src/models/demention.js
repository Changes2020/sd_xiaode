// import Message from '../components/Message';
import {weekMean} from '../utils/FormatDate';
import {getCreditDementionList,getQueryCreditTrend,getdementionTypeList} from '../services/api'

export default {
  namespace: 'demention',
  state: {
    dementionId:null,
    dementionListParams: {
      type: null,    // 均分类型2正面得分,10负面得分
    },
    dementionListData: null,
    TrendParams: {
      groupType: 1,   // 1:学院，2:家族，3:小组
      familyType: 0,   // 0:自考，1:壁垒，2:孵化器
      startTime: null,  // 默认周均分
      endTime: weekMean(new Date()).endTime,
      filteKeyID:301,
    },
    trendData: null,
    detailListParams: {
      groupType: 1,   // 1:学院，2:家族，3:小组
      startTime: null,  // 默认周均分
      endTime: weekMean(new Date()).endTime,
      filteKeyID:301, // 和groupId统一
      familyType: 0,   // 0:自考，1:壁垒，2:孵化器
    },
    detailListData: null,
  },
  effects: {
    * fetch({payload}, {call, put}) {
      const {dementionListParams} = payload;
      // const {TrendParams} = payload;
      // const {detailListParams} = payload;
      const dementionListData = yield call(getCreditDementionList, {...dementionListParams});
      yield put({type: 'fetchsave', payload: {dementionListData, dementionListParams,dementionId}});
      const datasource =dementionListData.data
      let {dementionId} = payload;
      if(!dementionId){
        dementionId =datasource[0].id
      }
      yield put({type: 'fetchsave', payload: {dementionListData, dementionListParams,dementionId}});
      // const {switchtype} = payload
      // if(switchtype===1){
      //   const detailListData = yield call(getdementionTypeList, {...detailListParams,dementionId});
      //   yield put({type: 'fetchsave', payload: {dementionListData,detailListData, dementionListParams, detailListParams,dementionId}});
      // }
      // else{
      //   const trendData = yield call(getQueryCreditTrend, {...TrendParams,dementionId});
      //   yield put({type: 'fetchsave', payload: {dementionListData,trendData, TrendParams, detailListParams,dementionId}});
      // }
    },
    * chart({payload}, {call, put}) {
      const {TrendParams} = payload;
      const {dementionId}=payload;
      const trendData = yield call(getQueryCreditTrend, {...TrendParams,dementionId});
      yield put({type: 'chartsave', payload: {trendData, TrendParams,dementionId}});
    },
    * table({payload}, {call, put}) {
      const {detailListParams} = payload;
      const {dementionId}=payload;
      const detailListData = yield call(getdementionTypeList, {...detailListParams,dementionId});
      yield put({type: 'tablesave', payload: {detailListData, detailListParams,dementionId}});
    },
  },

  reducers: {
    fetchsave(state, action) {
      return {...state, ...action.payload};
    },
    chartsave(state, action) {
      return {...state, ...action.payload};
    },
    tablesave(state, action) {
      return {...state, ...action.payload};
    },
  },
  subscriptions: {},
};
