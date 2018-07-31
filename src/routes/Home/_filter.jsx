import React from 'react';
import { Flex } from 'antd-mobile';
import styles from './IndexPage.less';
import DatePanle from '../../components/DatePanle';
import SelfTab from '../../components/SelfTab/SelfTab';
import Dict from '../../utils/typeDict';

const { creditTypeDict } = Dict;
const creditTypeData = Object.keys(creditTypeDict).map(id => ({
  id: Number(id),
  title: creditTypeDict[id],
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
        <Flex className={styles.hintContainer}>
          <p className={styles.hintTitle}>数据中心</p>
          <p className={styles.hintContent}>每天13:30发布昨日数据</p>
        </Flex>
        {/*  时间控件  */}
        <DatePanle
          startTime={paramsObj.startTime}
          endTime={paramsObj.endTime}
          dateType={paramsObj.dateType}
          selecteDate={dateObj => this.selecteDate(dateObj)}
        />
        {/*  学分tab   */}
        <SelfTab
          dataSource={{ data: creditTypeData }}
          firstId={paramsObj.creditType}
          callBackFun={item => {
            this.fnCLickTab(item.id);
          }}
        />
      </div>
    );
  }
}
