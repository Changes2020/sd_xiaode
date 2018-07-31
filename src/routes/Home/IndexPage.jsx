import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import styles from './IndexPage.less';
import Filter from './_filter';
import Banner from '../../components/Banner';
import { defaultDateTime } from '../../utils/FormatDate';
import { getAuthority } from '../../utils/authority';
import { getItem } from '../../utils/localStorage';
import ChartCotainer from '../../components/ChartCotainer';
import BarChart from '../../components/Charts/Bar';
import Loading from '../../components/Loading/Loading';
import { assignUrlParams } from '../../utils/routerUtils';
// import { horizontalChart } from './_horizontalChart';
import { longitudinalChart } from './_longitudinalChart';

const userInfo = getItem('userInfo').value || {};
const allOrgMap = getItem('allOrgMap').value || {};

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const { startTime, endTime } = defaultDateTime();
    const userId = getAuthority();
    const initState = {
      paramsObj: {
        startTime, // 过滤开始时间
        endTime, // 过滤结束时间
        userId,
        creditType: 1, // 均分类型1为学分均分2正面均分,3负面均分
        groupType: 3, // 1:学院，2:家族，3:小组
        rankType: 3, // 1:集团，2:院内，3:null
        dateType: 3, // 1:周均,2:月均,3:自定义
        filteKeyID: null, // 登录用户id
      },
      creditShowType: 'trend',
      visible: true,
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const { paramsObj } = this.state;
    this.fnGetData(paramsObj);
  }
  fnGetData(ops = {}) {
    // 用于数据请求方法
    // 用于数据的请求
    // 排名和趋势参数不用于请求数据,需要过滤出来
    const iscreditShowType = 'creditShowType' in ops;
    const sendParams = {
      paramsObj: { ...this.state.paramsObj, ...ops },
      creditShowType: iscreditShowType ? ops.creditShowType : this.state.creditShowType,
      userInfo,
      allOrgMap,
    };
    this.props.dispatch({
      type: sendParams.creditShowType === 'rank' ? 'home/fetchRank' : 'home/fetchTrend',
      payload: sendParams,
    });
    this.saveParams(sendParams);
    // this.fnCheckShowRank(sendParams);// 判断集团排名和院内排名的出现
  }
  saveParams = sendParams => {
    // 用于数据存储,以及添加url
    const { paramsObj, creditShowType } = sendParams;
    this.setState({ paramsObj, creditShowType });
  };
  toDetailPage = () => {
    // 跳转至详情页
    const { dateType, startTime, endTime } = this.state.paramsObj;
    this.props.setRouteUrlParams('/details', { dateType, startTime, endTime });
  };
  toAllRankPage = () => {
    // 查看全部排名数据
    this.props.setRouteUrlParams('/chartlist', { ...this.state.paramsObj });
  };
  toAssistantPage = () => {
    this.props.setRouteUrlParams('/assistant', { ...this.state.paramsObj });
  };
  render() {
    const { paramsObj } = this.state;
    const { isloading, home = {} } = this.props;
    const { rankDataObj } = home;
    return (
      <div className={styles.normal}>
        <Banner />
        <Filter paramsObj={paramsObj} fnGetData={obj => this.fnGetData(obj)} />
        {/* 一下部分为图标数据区域 */}
        <div className={styles.chartContent}>
          {rankDataObj ? (
            <ChartCotainer
              onClickTitle={() => {
                this.toDetailPage();
              }}
            >
              <BarChart
                dataSource={longitudinalChart(rankDataObj.selfExam, {
                  ...paramsObj,
                  familyName: 'selfExam',
                })}
                width="7.1rem"
                height="400px"
              />
            </ChartCotainer>
          ) : null}
        </div>

        <div style={{ marginTop: '50px' }}>
          <Button onClick={this.toAllRankPage}>查看更多排名图页面</Button>
          <Button onClick={this.toAssistantPage}>小助手页面</Button>
        </div>
        {/* 处理loading */}
        {isloading && <Loading />}
      </div>
    );
  }
}
export default connect(({ home, loading }) => ({
  home,
  isloading: loading.models.home,
}))(IndexPage);
