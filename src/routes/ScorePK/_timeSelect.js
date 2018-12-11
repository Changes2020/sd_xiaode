import React from 'react';
import styles from './ResultList.less';
import DatePanle from '../../components/DatePanle';

export default class TimeSelect extends React.Component {
  getData = obj => {
    if (this.props.fnGetData) {
      this.props.fnGetData(obj);
    }
  };
  selecteDate = dateObj => {
    this.getData(dateObj);
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
      </div>
    );
  }
}
