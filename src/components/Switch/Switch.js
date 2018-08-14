/*
* 组件参数
*
* switchFlag：选中状态，bol值
* checkVal：选中的文字，string
* unCheckVal：未选中的文字，string
* switchCls：自定义样式
* onChange: function，回传选中状态
*
* */
import React, { Component } from 'react';
import classNames from 'classnames';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import styles from './Switch.less';

class SelfSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchFlag: props.switchFlag || false,
    };
  }

  onChange = val => {
    const { switchFlag } = this.state;
    this.setState({
      switchFlag: !switchFlag,
    });
    this.props.onChange(val);
  };
  render() {
    const { switchFlag } = this.state;
    const { checkVal = '高于均值', unCheckVal = '低于均值', switchCls } = this.props;
    const selfSwitch = switchCls ? classNames(switchCls) : classNames(styles.selfSwitch);
    return (
      <div className={selfSwitch}>
        <Switch
          onChange={this.onChange}
          checked={switchFlag}
          checkedChildren={checkVal}
          unCheckedChildren={unCheckVal}
        />
      </div>
    );
  }
}
export default SelfSwitch;
