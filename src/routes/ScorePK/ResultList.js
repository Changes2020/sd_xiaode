import React, { Component } from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../utils/routerUtils';
import TimeSelect from './_timeSelect';
import styles from './ResultList.less';

import MultipHeaderList from '../../components/ListView/MultipHeaderList';
import ScoreItem from './_scoreItem';

class ReaultList extends Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: 1543334400000, // 过滤开始时间
        endTime: 1543420799999, // 过滤结束时间
        dateType: 3, // 1:周均,2:月均,3:自定义
        userId: 'guoyiru',
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const sendParams = {};
    // 掉接口
    this.props.dispatch({
      type: 'scorePK/getPKResult',
      payload: sendParams,
    });
  }
  fnGetData = (ops = {}) => {
    console.log(ops);
  };

  render() {
    const { paramsObj } = this.state;
    return (
      <div className={styles.normal}>
        <TimeSelect
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />
        <MultipHeaderList
          dataList={{ name: 1 }}
          customRenderHeader={() => <div>111</div>}
          customRenderItem={rowData => <ScoreItem rowData={rowData} />}
        />
      </div>
    );
  }
}
export default connect(({ scorePK, loading }) => ({
  scorePK,
  isloading: loading.models.Details,
}))(ReaultList);
