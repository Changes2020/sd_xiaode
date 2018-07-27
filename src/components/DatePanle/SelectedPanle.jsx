import React from 'react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import styles from './select.less';

export default class SelectPanle extends React.Component {
  onSelect = val => {
    if (this.props.onSelect) {
      this.props.onSelect(val);
    }
  };
  render() {
    const dataSorce = ['周均数据', '月均数据', '自定义数据'];
    const defaultValue = '周均数据';
    return (
      <div>
        <Select
          defaultValue={defaultValue}
          className={styles.select}
          onChange={val => {
            this.onSelect(val);
          }}
          {...this.props}
        >
          {dataSorce.map((item, index) => (
            <Option value={index + 1} key={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}
