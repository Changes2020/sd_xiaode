import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import Filter from './_filter';
import Banner from '../../components/Banner';
import { defaultDateTime } from '../../utils/FormatDate';
import { getItem } from '../../utils/localStorage';
import Loading from '../../components/Loading/Loading';
import { assignUrlParams } from '../../utils/routerUtils';
import Dict from '../../utils/typeDict';
import ChartContent from './_chartContent';
import NoData from '../../components/NoData/NoData';
import CeillingHead from './_ceillingHead';
import ExportDemention from './_exportDemention';
import ScorePKDialog from '../../container/ScorePKDialog';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const { startTime, endTime } = defaultDateTime();
    const initState = {
      paramsObj: {
        startTime, // 过滤开始时间
        endTime, // 过滤结束时间
        userId: null,
        creditType: 1, // 均分类型1为学分均分2正面均分,3负面均分
        groupType: 1, // 1:学院，2:家族，3:小组
        rankType: 1, // 1:集团，2:院内，3:null
        dateType: 3, // 1:周均,2:月均,3:自定义
        filteKeyID: null, // 登录用户id
      },
      creditShowType: 'rank',
      visible: true,
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const { paramsObj } = this.state;
    // 解决异步请求数据,未加载用户信息未存储
    this.fnGetData(paramsObj, true);
  }

  getDownloadInfo = dataList => {
    const userInfo = getItem('userInfo').value || {};
    const { groupId, groupType } = userInfo;
    const newUserType = Object.keys(Dict.groupTypeDict).find(
      list => Dict.groupTypeDict[list] === groupType
    );
    this.props.dispatch({
      type: 'home/getDownloadInfo',
      payload: {
        ...dataList,
        groupId,
        groupType: Number(newUserType),
      },
    });
  };
  getUserInfo = () => {
    //  此方法用于异步请求数据造成userId,以及groupId获取不到的问题
    const userInfo = getItem('userInfo').value || {};
    const { userId } = userInfo;
    const filteKeyID = userInfo.groupId;
    return { userId, filteKeyID };
  };
  fnGetData(ops = {}, isFirstMount = false) {
    // 用于数据请求方法
    // 用于数据的请求
    // 排名和趋势参数不用于请求数据,需要过滤出来
    const { paramsObj, creditShowType } = this.state;
    let newOps = ops;
    if (!paramsObj.userId || !paramsObj.filteKeyID) {
      newOps = Object.assign({}, ops, this.getUserInfo());
    }
    const iscreditShowType = 'creditShowType' in newOps;
    const sendParams = {
      paramsObj: assignUrlParams(paramsObj, newOps),
      creditShowType: iscreditShowType ? newOps.creditShowType : creditShowType,
    };
    if (
      JSON.stringify(sendParams) !== JSON.stringify({ paramsObj, creditShowType }) ||
      isFirstMount
    ) {
      this.props.dispatch({
        type: sendParams.creditShowType === 'rank' ? 'home/fetchRank' : 'home/fetchTrend',
        payload: sendParams,
      });
      this.saveParams(sendParams);
    }
  }
  saveParams = sendParams => {
    // 用于数据存储,以及添加url
    const { paramsObj, creditShowType } = sendParams;
    const assignObj = { ...this.state.paramsObj, creditShowType: this.state.creditShowType };
    // 防止重复渲染
    if (JSON.stringify(assignObj) !== JSON.stringify({ ...paramsObj, creditShowType })) {
      this.setState({ paramsObj, creditShowType });
      this.props.setCurrentUrlParams({ ...paramsObj, creditShowType });
    }
  };
  toDetailPage = () => {
    // 跳转至详情页
    const routerHash = new Date().valueOf();
    const { dateType, startTime, endTime, groupType } = this.state.paramsObj;
    this.props.setRouteUrlParams('/details', {
      dateType,
      startTime,
      endTime,
      routerHash,
      groupType,
    });
  };
  toAllRankPage = familyName => {
    // 查看全部排名数据
    this.props.setRouteUrlParams('/chartlist', { ...this.state.paramsObj, familyName });
  };
  toAssistantPage = () => {
    this.props.setRouteUrlParams('/assistant', { ...this.state.paramsObj });
  };
  selectGroup = (id, name, familyType) => {
    // 选择分组趋势数据
    const { paramsObj } = this.props.home;
    const filteKeyID = id;
    const filteKeyTitle = name;
    const familyTypeString = familyType;
    this.props.dispatch({
      type: 'home/updateTrend',
      payload: {
        paramsObj: { ...paramsObj, creditShowType: 'trend' },
        filteKeyTitle,
        filteKeyID,
        familyTypeString,
      },
    });
  };
  lookAllGroup = familyType => {
    // 点击查看全部
    const { paramsObj } = this.props.home;
    const familyTypeString = familyType;
    this.props.dispatch({
      type: 'home/getGroupList',
      payload: {
        paramsObj,
        familyTypeString,
      },
    });
  };
  backTopFn = () => {};
  render() {
    const { paramsObj, creditShowType } = this.state;
    const { isloading, home = {} } = this.props;
    const { rankDataObj, isDownLoadSuccess = false } = home;
    const isNoData = JSON.stringify(rankDataObj) === '{}';
    return (
      <div className={styles.normal}>
        {/* ************数据中心吸顶信息************** */}
        <CeillingHead paramsObj={{ ...paramsObj, creditShowType }} />
        {/* ************轮播组件********************* */}
        <Banner />
        {/* ************过滤组件********************* */}
        <Filter
          paramsObj={{ ...paramsObj, creditShowType }}
          fnGetData={obj => this.fnGetData(obj)}
        />
        {/* *************一下部分为图标数据区域******** */}
        <div className={styles.chartContent}>
          {rankDataObj && (
            <ChartContent
              home={home}
              paramsObj={paramsObj}
              creditShowType={creditShowType}
              toDetailPage={() => this.toDetailPage()}
              toAllRankPage={keyname => this.toAllRankPage(keyname)}
              selectGroup={(id, name, familyType) => this.selectGroup(id, name, familyType)}
              lookAllGroup={familyType => this.lookAllGroup(familyType)}
            />
          )}
          {isNoData && <NoData showflag />}
        </div>
        {/*
        * *fix 小button浮动框区域
        * 按顺序放置，内部按正常盒子模型处理，统一margin-bottom:0.1rem
        * */}
        <div className="fixBox">
          {/* 学分px区域 */}
          <ScorePKDialog {...this.props} />

          {/* ***************导出数据置顶按钮************ */}
          <ExportDemention
            isDownLoadSuccess={isDownLoadSuccess}
            paramsObj={paramsObj}
            getDownloadInfo={data => {
              this.getDownloadInfo(data);
            }}
          />
        </div>

        {/* **************处理loading************** */}
        {isloading && <Loading />}
      </div>
    );
  }
}
export default connect(({ home, loading }) => ({
  home,
  isloading: loading.models.home,
}))(IndexPage);
