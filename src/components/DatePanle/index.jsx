import React from 'react';
import { Flex } from 'antd-mobile';
import SelectPanle from './SelectedPanle';
import Calendar from './Calendar';
import styles from './index.less';
import { monthMean, getExtraDate, formatDate, weekMean } from '../../utils/FormatDate';
import { getItem } from '../../utils/localStorage';
import typeDict from '../../utils/typeDict';

/*
*此组件需传递三个参数
* @params {dateType 1,2,3} 周均数据,月均数据.自定义数据
* @params {startTime Number}开始时间
* @params {endTime Number} 结束时间
* callback selecteDate     选择之后的回调
*/
const { dateTypeDict = {} } = typeDict;
export default class DatePanle extends React.Component {
  constructor(props) {
    super(props);
    const { timeDate = {} } = getItem('timeDate').value || {};
    const { dataExList = [] } = timeDate;
    const dateObj = getExtraDate() || {};
    const { startTime, endTime, dateType } = props;
    this.state = {
      visible: false,
      selectData: Object.values(dateTypeDict),
      minDate: dateObj.minDate || null,
      maxDate: dateObj.maxDate || null,
      dateText: `${formatDate(startTime)} ～ ${formatDate(endTime)}`,
      dataExList,
      dateType,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.startTime !== this.props.startTime ||
      nextProps.endTime !== this.props.endTime ||
      nextProps.dateType !== this.props.dateType
    ) {
      this.formateDate(nextProps.startTime, nextProps.endTime, nextProps.dateType);
    }
  }
  onSelect = val => {
    const dateType = Number(Object.keys(dateTypeDict).find(item => dateTypeDict[item] === val));
    switch (dateType) {
      case 1:
        this.selecteDate({ ...weekMean(new Date()), dateType });
        break;
      case 2:
        this.selecteDate({ ...monthMean(new Date()), dateType });
        break;
      case 3:
        this.showCalendar();
        break;
      default:
        break;
    }
  };
  onCancel = () => {
    this.setState({ visible: false });
  };
  onConfirm = (sTime, etime) => {
    const startTime = Number(sTime);
    const endTime = Number(etime) + 24 * 3600000 - 1;
    this.selecteDate({ startTime, endTime, dateType: 3 });
  };
  clickOption = val => {
    const dateType = Number(Object.keys(dateTypeDict).find(item => dateTypeDict[item] === val));
    if (dateType === 3) {
      this.showCalendar();
    }
  };
  showCalendar = () => {
    this.setState({ visible: true });
  };
  formateDate = (startTime, endTime, dateType) => {
    const dateText = `${formatDate(startTime)} ～ ${formatDate(endTime)}`;
    this.setState({ dateType, dateText });
  };
  selecteDate = date => {
    this.formateDate(date.startTime, date.endTime, date.dateType);
    if (this.props.selecteDate) {
      this.props.selecteDate(date);
    }
  };
  render() {
    const { selectData, visible, minDate, maxDate, dataExList, dateType, dateText } = this.state;
    const defaultValue = typeDict.dateTypeDict[dateType];
    return (
      <Flex justify="arround" className={styles.container}>
        <p className={styles.dateTxt}>{dateText}</p>
        <div className={styles.dateSelect}>
          <SelectPanle
            onSelect={(val, index) => this.onSelect(val, index)}
            clickOption={index => this.clickOption(index)}
            selectData={selectData}
            defaultValue={defaultValue}
          />
        </div>
        {visible && (
          <Calendar
            maxDate={maxDate}
            minDate={minDate}
            disableDate={dataExList}
            visible={visible}
            onCancel={() => {
              this.onCancel();
            }}
            onConfirm={(s, e) => {
              this.onConfirm(s, e);
            }}
          />
        )}
      </Flex>
    );
  }
}
