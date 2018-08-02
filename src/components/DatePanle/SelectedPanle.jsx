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
  clickOption(value) {
    if (this.props.clickOption) {
      this.props.clickOption(value);
    }
  }
  checkType = item => {
    if (typeof item === 'string' || typeof item === 'number') {
      return (
        <Option value={item} key={item} onClick={this.clickOption.bind(this, item)}>
          {item}
        </Option>
      );
    }
  };
  render() {
    const { selectData = [], defaultValue } = this.props;
    return (
      <div>
        <Select defaultValue={defaultValue} className={styles.select} onChange={this.onSelect}>
          {selectData.map(this.checkType)}
        </Select>
      </div>
    );
  }
}
