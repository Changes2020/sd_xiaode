import React, { Component } from 'react';
import { assignUrlParams } from '../../utils/routerUtils';
import Filter from './_timeSelect';
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

  render() {
    const { paramsObj} = this.state;
    return (
      <div className={styles.normal}>
        {/* *************** Filter *************** */}
        <Filter
          paramsObj={paramsObj}
          fnGetData={obj => {
            this.fnGetData(obj);
          }}
        />
      </div>
    );
  }
}
export default ReaultList;
