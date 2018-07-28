import React from 'react';
import { Calendar } from 'antd-mobile';
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
  onConfirm1 = (sTime, eTime) => {
    if (this.props.onConfirm) {
      this.props.onConfirm(sTime, eTime);
      this.onCancel();
    }
  };
  getDateExtra = date => {
    if (this.props.getDateExtra) {
      return this.props.getDateExtra(date);
    }
  };
  render() {
    const { visible } = this.props;
    const { minDate = null, maxDate = null } = this.props;
    return (
      <Calendar
        visible={visible}
        onCancel={this.onCancel}
        getDateExtra={this.getDateExtra}
        minDate={minDate}
        maxDate={maxDate}
        onConfirm={this.onConfirm1}
      />
    );
  }
}
