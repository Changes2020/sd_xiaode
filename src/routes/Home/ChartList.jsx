import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import ChartCotainer from '../../components/ChartCotainer';
import { longitudinalChart } from './_longitudinalChart';
import { getItem } from '../../utils/localStorage';
import { defaultDateTime } from '../../utils/FormatDate';
import BarChart from '../../components/Charts/Bar';
import { assignUrlParams } from '../../utils/routerUtils';
import Loading from '../../components/Loading/Loading';

const userInfo = getItem('userInfo').value || {};
const allOrgMap = getItem('allOrgMap').value || {};
class ChartList extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const { startTime, endTime } = defaultDateTime();
    const { groupId, userId } = userInfo;
    const initState = {
      paramsObj: {
        startTime, // 过滤开始时间
        endTime, // 过滤结束时间
        userId,
        creditType: 1, // 均分类型1为学分均分2正面均分,3负面均分
        groupType: 1, // 1:学院，2:家族，3:小组
        rankType: 1, // 1:集团，2:院内，3:null
        dateType: 3, // 1:周均,2:月均,3:自定义
        filteKeyID: groupId, // 登录用户id
      },
      creditShowType: 'rank',
      familyName: null,
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const { paramsObj } = this.state;
    if (JSON.stringify(paramsObj) === JSON.stringify({})) {
      this.props.setRouteUrlParams('/indexPage', {});
    } else {
      this.fnGetData();
    }
  }
  toDetailPage = () => {
    // 跳转至详情页
    const { dateType, startTime, endTime } = this.state.paramsObj;
    this.props.setRouteUrlParams('/details', { dateType, startTime, endTime });
  };
  fnGetData() {
    // 用于数据请求方法
    // 用于数据的请求
    // 排名和趋势参数不用于请求数据,需要过滤出来
    const { paramsObj, creditShowType } = this.state;
    const sendParams = {
      paramsObj,
      creditShowType,
      userInfo,
      allOrgMap,
    };
    this.props.dispatch({
      type: 'home/fetchRank',
      payload: sendParams,
    });
  }
  handleRankChart = () => {
    const { home } = this.props;
    const { familyName, paramsObj } = this.state;
    const { rankDataObj } = home;
    if (rankDataObj && rankDataObj[familyName] && rankDataObj[familyName].data) {
      const chartData = rankDataObj[familyName];
      const rankChartOps = longitudinalChart(chartData, { ...paramsObj, familyName }, true);
      return this.rendRankChart(rankDataObj[familyName], rankChartOps, familyName);
    }
  };
  rendRankChart = (data, dataSource) => {
    return (
      <ChartCotainer
        onClickTitle={() => {
          this.toDetailPage();
        }}
      >
        <BarChart
          width="7.1rem"
          height={`${data.data.length * 25 + 300}px`}
          data={data}
          dataSource={dataSource}
        />
      </ChartCotainer>
    );
  };
  render() {
    const { home, isloading } = this.props;
    const { rankDataObj = null } = home;
    console.log(home);
    const rankDom = rankDataObj ? this.handleRankChart() : null;
    return (
      <div className={styles.normal}>
        {rankDom}
        {isloading && <Loading />}
      </div>
    );
  }
}
export default connect(({ home, loading }) => ({
  home,
  isloading: loading.models.home,
}))(ChartList);
