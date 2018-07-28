import React from 'react';
import { Flex } from 'antd-mobile';
import SelectPanle from './SelectedPanle';
import Calendar from './Calendar';
import styles from './index.less';

export default class DatePanle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dateTxt: 'sssssss',
      selectData: ['周均数据', '月均数据', '自定义数据'],
    };
  }
  onSelect = (val, index) => {
    switch (index) {
      case 1:
        break;
      case 2:
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
  onConfirm = (s, e) => {
    console.log(s, e);
  };
  clickOption = index => {
    if (index === 3) {
      this.showCalendar();
    }
  };
  showCalendar = () => {
    this.setState({ visible: true });
  };
  render() {
    const { dateTxt, selectData, visible } = this.state;
    const defaultValue = '周均数据';
    return (
      <Flex justify="arround" className={styles.container}>
        <p className={styles.dateTxt}>{dateTxt}</p>
        <div className={styles.dateSelect}>
          <SelectPanle
            onSelect={(val, index) => this.onSelect(val, index)}
            clickOption={index => this.clickOption(index)}
            selectData={selectData}
            defaultValue={defaultValue}
          />
        </div>
        <Calendar
          visible={visible}
          onCancel={() => {
            this.onCancel();
          }}
          onConfirm={(s, e) => {
            this.onConfirm(s, e);
          }}
        />
      </Flex>
    );
  }
}
