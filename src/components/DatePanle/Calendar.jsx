import React from 'react';
import { Calendar } from 'antd-mobile';
import './calender.less';

export default class CalendarDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false || this.props.visible,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }
  onCancel = () => {
    this.closeCalendar();
  };
  onConfirm = (sTime, eTime) => {
    if (this.props.onConfirm) {
      this.props.onConfirm(sTime, eTime);
    }
  };
  getDateExtra = date => {
    if (this.props.getDateExtra) {
      return this.props.getDateExtra(date);
    }
  };
  closeCalendar = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible } = this.state;
    const { minDate = null, maxDate = null } = this.props;
    return (
      <Calendar
        visible={visible}
        onCancel={() => {
          this.onCancel();
        }}
        getDateExtra={this.getDateExtra}
        minDate={minDate}
        maxDate={maxDate}
        onConfirm={(startTime, endTime) => {
          this.onConfirm(startTime, endTime);
        }}
      />
    );
  }
}
