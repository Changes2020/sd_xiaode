import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import Bar from '../../components/Charts/Bar';
import { assignUrlParams } from '../../utils/routerUtils';

class ChartList extends React.Component {
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
  render() {
    const { paramsObj } = this.state;
    return (
      <div className={styles.normal}>
        <div>{JSON.stringify(paramsObj)}</div>
        <Bar width="7.1rem" height="400px" />
        <Bar width="7.1rem" height="500px" />

        {/* <Loading/>  */}
      </div>
    );
  }
}
export default connect(({ example, loading }) => ({ example, loading }))(ChartList);
