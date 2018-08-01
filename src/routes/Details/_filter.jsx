import React from 'react';
import styles from './Details.less';
import DatePanle from '../../components/DatePanle';
import SelfTab from '../../components/SelfTab/SelfTab';
import Dict from '../../utils/typeDict';

const { groupTypeZHDict } = Dict;
const creditTypeData = Object.keys(groupTypeZHDict).map(id => ({
  id: Number(id),
  title: groupTypeZHDict[id],
}));
export default class Filter extends React.Component {
  getData = obj => {
    if (this.props.fnGetData) {
      this.props.fnGetData(obj);
    }
  };
  selecteDate = dateObj => {
    this.getData(dateObj);
  };
  fnCLickTab = id => {
    this.getData({ creditType: id });
  };

  render() {
    const { paramsObj = {} } = this.props;
    return (
      <div className={styles.filterCntainer}>
        {/*  时间控件  */}
        <DatePanle
          startTime={paramsObj.startTime}
          endTime={paramsObj.endTime}
          dateType={paramsObj.dateType}
          selecteDate={dateObj => this.selecteDate(dateObj)}
        />
        {/*  学分tab   */}
        <div className={styles.tabWrap}>
          <SelfTab
            dataSource={{ data: creditTypeData }}
            firstId={paramsObj.creditType}
            callBackFun={item => {
              this.fnCLickTab(item.id);
            }}
            tabClass={styles.tabClass}
          />
        </div>
      </div>
    );
  }
}
