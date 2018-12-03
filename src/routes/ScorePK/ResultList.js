import React, { Component } from 'react';
import { assignUrlParams } from '../../utils/routerUtils';
import TimeSelect from './_timeSelect';
import ScoreFile from './_scoreFile';
import styles from './ResultList.less';


class ReaultList extends Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime:1543334400000, // 过滤开始时间
        endTime:1543420799999, // 过滤结束时间
        dateType: 3, // 1:周均,2:月均,3:自定义
        userId: "guoyiru",
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }

  fnGetData = (ops = {}) => {
    console.log(ops)
    };

  render() {
    const { paramsObj} = this.state;
    const scoreDate=[{id:1,orgName:'狐逻经管专科1·3组',rank:2,allObj:100,avgScore:23.34},{id:2,orgName:'狐逻经管专科1·3组',rank:12,allObj:100,avgScore:83.44},{id:3,orgName:'狐逻经管专科1·3组',rank:24,allObj:100,avgScore:93.34}]
    return (
      <div className={styles.normal}>
        <TimeSelect
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />
        <ScoreFile
          paramsObj={scoreDate}
        />
      </div>
    );
  }
}
export default ReaultList;
