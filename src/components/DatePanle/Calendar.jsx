import React from 'react';
import { Calendar } from 'antd-mobile';
import moment from 'moment';
import './calender.less';

export default class CalendarDate extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      // 禁止input输入
      document.getElementsByClassName('rc-select-search__field')[0].setAttribute('disabled', true);
    }, 100);
  }
  onCancel = () => {
    this.props.onCancel();
  };
  onConfirm = (sTime, eTime) => {
    if (this.props.onConfirm) {
      this.props.onConfirm(sTime, eTime);
      this.onCancel();
    }
  };
  getDateExtra = date => {
    const extra = this.getDisableDate();
    const dateTime = moment(date).format('YYYY-MM-DD');
    return extra[dateTime] || null;
  };
  getDisableDate = () => {
    const [forMatStr, extra] = ['YYYY-MM-DD', {}];
    const { disableDate = [] } = this.props;
    disableDate.forEach(item => {
      const pushDateObj = {};
      const formatDate = moment(item).format(forMatStr);
      pushDateObj[formatDate] = { info: '不可选', disable: true };
      Object.assign(extra, pushDateObj);
    });
    return extra;
  };
  render() {
    const { minDate = null, maxDate = null, visible } = this.props;
    const defaultDate = maxDate - 2592000000 < minDate ? minDate : maxDate - 2592000000; // 方便默认展示两个月数据
    return (
      <Calendar
        visible={visible}
        onCancel={this.onCancel}
        getDateExtra={this.getDateExtra}
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        onConfirm={this.onConfirm}
        defaultDate={new Date(defaultDate)}
      />
    );
  }
}
