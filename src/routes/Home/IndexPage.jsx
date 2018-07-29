import React from 'react';
import { connect } from 'dva';
import { Flex, Button } from 'antd-mobile';
import styles from './IndexPage.less';
import DatePanle from '../../components/DatePanle';
import Banner from '../../components/Banner';
import Dialog from '../../components/Dialog';
// import Loading from 'components/Loading/Loading';
// import { Toast } from 'antd-mobile';
import { assignUrlParams } from '../../utils/routerUtils';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: 0, // 过滤开始时间
        endTime: 0, // 过滤结束时间
        creditType: 1, // 均分类型1为学分均分2正面均分,3负面均分
        groupType: 1, // 1:学院，2:家族，3:小组
        rankType: 3, // 1:集团，2:院内，3:null
        dateType: 3, // 1:周均,2:月均,3:自定义
        filteKeyID: null, // 登录用户id
        userId: null,
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {}
  toDetailPage = () => {
    const { dateType, startTime, endTime } = this.state.paramsObj;
    this.props.setRouteUrlParams('/details', { dateType, startTime, endTime });
  };
  toAllRankPage = () => {
    this.props.setRouteUrlParams('/chartlist', { ...this.state.paramsObj });
  };
  randomParams = () => {
    const startTime = new Date().valueOf();
    // const endTime = this.state.paramsObj.endTime + 10000000;
    const paramsObj = { ...this.state.paramsObj, startTime };
    this.props.setCurrentUrlParams({ startTime });
    this.setState({ paramsObj });
  };
  selecteDate = dateObj => {
    console.log(dateObj);
  };
  render() {
    const { paramsObj } = this.state;

    return (
      <div className={styles.normal}>
        <Banner />
        <div className={styles.filterCntainer}>
          <Flex className={styles.hintContainer}>
            <p className={styles.hintTitle}>数据中心</p>
            <p className={styles.hintContent}>每天13:30发布昨日数据</p>
          </Flex>
        </div>

        <Dialog />

        <div style={{ marginTop: '50px' }}>
          <Button onClick={this.randomParams}>随机出参数</Button>
          <Button onClick={this.toDetailPage}>点击跳转至详情页面</Button>
          <Button onClick={this.toAllRankPage}>查看更多排名图页面</Button>
        </div>
        <DatePanle
          startTime={paramsObj.startTime}
          endTime={paramsObj.endTime}
          dateType={paramsObj.dateType}
          selecteDate={dateObj => this.selecteDate(dateObj)}
        />
        {/* <Loading/>  */}
      </div>
    );
  }
}
export default connect(({ example, loading }) => ({ example, loading }))(IndexPage);
