import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import styles from './IndexPage.css';
import DatePanle from '../../components/DatePanle';
// import Loading from 'components/Loading/Loading';
// import { Toast } from 'antd-mobile';
import { assignUrlParams } from '../../utils/routerUtils';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
        endTime: null, // 过滤结束时间
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
    const paramsObj = { ...this.state.paramsObj, startTime };

    this.setState({ paramsObj });
    this.props.setCurrentUrlParams({ startTime });
  };
  render() {
    console.log(222);
    const { paramsObj } = this.state;
    return (
      <div className={styles.normal}>
        <div>{JSON.stringify(paramsObj)}</div>
        <div style={{ marginTop: '50px' }}>
          <Button onClick={this.randomParams}>随机出参数</Button>
          <Button onClick={this.toDetailPage}>点击跳转至详情页面</Button>
          <Button onClick={this.toAllRankPage}>查看更多排名图页面</Button>
        </div>
        <DatePanle />
        {/* <Loading/>  */}
      </div>
    );
  }
}
export default connect(({ example, loading }) => ({ example, loading }))(IndexPage);
