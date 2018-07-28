import React from 'react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import styles from './select.less';

export default class SelectPanle extends React.Component {
  onSelect = val => {
    if (this.props.onSelect) {
      const { selectData } = this.props;
      const index = selectData.findIndex(key => key === val);
      this.props.onSelect(val, index + 1);
    }
  };
  clickOption(index) {
    if (this.props.clickOption) {
      this.props.clickOption(index);
    }
  }
  checkType = (item, index) => {
    if (typeof item === 'string' || typeof item === 'number') {
      return (
        <Option value={item} key={item} onClick={this.clickOption.bind(this, index + 1)}>
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
