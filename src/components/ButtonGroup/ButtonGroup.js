/* ButtonGroup组件参数介绍:一共7个参数，两个必传参数
*
* dataSource{必传 Obj}:数据源，对象结构:{data:[{id:xx,name"'xx'}.....],...},里面有要map遍历的data数据源，data为数组格式，里面为对象，对象内的数据key值为id和name，父组件需要处理好传入。
* dataReturnFun{必传 Funciton}:父组件需要传入点击对应button返回时触发接受数据的function，返回数据为（item,index）
* id{非必传 Number}:传入默认选中button的id值
* isSelectFirst{非必传 Boolean}:若父组件未传入id属性，则判断是否有该属性，有的话默认第一个button被选中，没有则没有button被选中。
* spanFunction{非必传 Function}:传入该属性，则父组件确定button里面文字展示内容，没有则默认button里面的文字只显示name,
* btnClass{非必传 Obj}:未被选中button样式，对象格式
* btnSelectedClass{非必传 Obj}:被选中button样式，对象格式
*
* */

import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import classNames from 'classnames';
import styles from './ButtonGroup.less';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    const data = !this.props.dataSource
      ? []
      : !this.props.dataSource.data ? [] : this.props.dataSource.data;
    const firstId = !this.props.isSelectFirst ? -1 : data.length > 1 ? data[0].id : -1;
    this.state = {
      initId: firstId,
    };
  }

  selectButton(item, index) {
    if (this.state.initId !== item.id) {
      this.setState({
        initId: item.id,
      });
    }
    if (!this.props.dataReturnFun || typeof this.props.dataReturnFun !== 'function') {
      console.warn('未传入dataReturnFun方法或传入的非function');
    } else {
      this.props.dataReturnFun(item, index);
    }
  }

  spanFun = (item, index) => {
    const { spanFunction } = this.props;
    if (spanFunction && typeof spanFunction === 'function') {
      return this.props.spanFunction(item, index);
    } else {
      return <span>{item.name}</span>;
    }
  };

  buttonListItem = (
    dataSource = null,
    id = null,
    newBtnClass = null,
    newBtnSelectedClass = null
  ) => {
    const self = this;
    const data = !dataSource ? [] : 'data' in dataSource ? dataSource.data : [];
    const list = Array.isArray(data) ? data : [];
    const selectId = !id ? self.state.initId : id;
    const liList = list.map((item, index) => {
      const isSelected = Array.isArray(selectId)
        ? selectId.find(ls => ls === item.id)
        : selectId === item.id;
      return (
        <Button
          className={isSelected ? newBtnSelectedClass : newBtnClass}
          key={item.id}
          onClick={self.selectButton.bind(self, item, index)}
        >
          {this.spanFun(item, index)}
        </Button>
      );
    });
    return liList;
  };

  render() {
    const { dataSource = null, id = null, btnClass = null, btnSelectedClass = null } = this.props;
    // 获取父组件传入button选中和未选中样式,未传入则使用默认样式，传入补充到提前定义好接收的样式里面
    const newBtnClass = !btnClass
      ? classNames(styles.btnStyle, btnClass)
      : classNames(styles.newBtnClass, btnClass);
    const newBtnSelectedClass = !btnSelectedClass
      ? classNames(styles.btnSelected, btnSelectedClass)
      : classNames(styles.newBtnSelectedClass, btnSelectedClass);
    return <div>{this.buttonListItem(dataSource, id, newBtnClass, newBtnSelectedClass)}</div>;
  }
}

export default ButtonGroup;
