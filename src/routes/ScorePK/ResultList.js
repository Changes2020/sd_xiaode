import React, { Component } from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../utils/routerUtils';
import TimeSelect from './_timeSelect';
import ScoreFile from './_scoreFile';
import styles from './ResultList.less';

import MultipHeaderList from '../../components/ListView/MultipHeaderList';
import ScoreItem from './_scoreItem';

class ReaultList extends Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: 1535817600000, // 过滤开始时间
        endTime: 1535817600999, // 过滤结束时间
        dateType: 3, // 1:周均,2:月均,3:自定义
        userId: 'xiejian',
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const { startTime, endTime, userId } = this.state.paramsObj;
    const paramsObj = {
      startTime, // 过滤开始时间
      endTime, // 过滤结束时间
      groupType: 1,
      pkList: [
        {
          familyType: 0,
          objId: 108,
        },
        {
          familyType: 1,
          objId: 108,
        },
      ],
      userId,
    };

    // 掉接口
    this.props.dispatch({
      type: 'scorePK/getPKResult',
      payload: paramsObj,
    });
  }
  fnGetData = (ops = {}) => {
    console.log(ops);
  };

  render() {
    const { paramsObj } = this.state;
    // const { dataList } = this.props.scorePK;
    const scoreDate = [
      { id: 1, orgName: '狐逻经管专科1·3组', rank: 2, allObj: 100, avgScore: 23.34 },
      { id: 2, orgName: '狐逻经管专科1·3组', rank: 12, allObj: 100, avgScore: 83.44 },
      { id: 3, orgName: '狐逻经管专科1·3组', rank: 24, allObj: 100, avgScore: 93.34 },
    ];
    return (
      <div className={styles.normal}>
        <TimeSelect
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />
        <ScoreFile paramsObj={scoreDate} />

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
