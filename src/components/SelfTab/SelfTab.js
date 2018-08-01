/* SelfTab组件参数介绍:一共5个参数，两个必传参数
*
* dataSource{必传 Obj}:数据源，对象结构:{data:[{id:1,title"'正面得分'}.....],...},里面有要map遍历的data数据源，data为数组格式，里面为对象，对象内的数据key值为id和title，父组件需要处理好传入。
* callBackFun{必传 Funciton}:父组件需要传入点击对应tab返回时触发接受数据的function，返回数据为（item,index）
* selfSpanFun{非必传 Function}:传入该属性，则父组件确定span里面文字展示内容，没有则默认span里面的文字只显示title,
* firstId{非必传 Number}:传入默认选中第几个tab,若不传入默认选中第一个tab
* commonClass{非必传 Obj}:所有tab公共样式
* tabClass{非必传 Obj}:被选中tab样式，对象格式
*
* */
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Tab.less';

class SelfTab extends Component {
  constructor(props) {
    super(props);
    const data = !this.props.dataSource
      ? []
      : !this.props.dataSource.data ? [] : this.props.dataSource.data;
    const first = data.length > 1 ? data[0].id : -1;
    const widthLength = data.length > 1 ? data.length : 1;
    this.state = {
      initId: first,
      widthLength,
    };
  }

  selectTab(item, index) {
    if (this.state.initId !== item.id) {
      this.setState({
        initId: item.id,
      });
    }
    if (!this.props.callBackFun || typeof this.props.callBackFun !== 'function') {
      console.warn('未传入callBackFun方法或传入的非function');
    } else {
      this.props.callBackFun(item, index);
    }
  }

  spanFun = (item, index) => {
    const { selfSpanFun } = this.props;
    if (selfSpanFun && typeof selfSpanFun === 'function') {
      return this.props.selfSpanFun(item, index);
    } else {
      return item.title;
    }
  };

  renderTab = (dataSource = null, firstId = null, commonTab = null, sectedTab = null) => {
    const self = this;
    const data = !dataSource ? [] : 'data' in dataSource ? dataSource.data : [];
    const list = Array.isArray(data) ? data : [];
    const selectId = !firstId ? self.state.initId : firstId;
    const liList = list.map((item, index) => {
      return (
        <div
          key={item.id}
          style={{ width: `${100 / this.state.widthLength}%`, textAlign: 'center' }}
        >
          <span
            className={`${commonTab} ${item.id === selectId ? sectedTab : ''}`}
            onClick={self.selectTab.bind(self, item, index)}
          >
            {this.spanFun(item, index)}
          </span>
        </div>
      );
    });
    return liList;
  };

  render() {
    const { dataSource = null, firstId = null, commonClass = null, tabClass = null } = this.props;
    // 获取父组件传入button选中和未选中样式补充到默认样式里面
    const commonTab = !commonClass
      ? classNames(styles.commonClass, commonClass)
      : classNames(styles.newCommonClass, commonClass);
    const sectedTab = !tabClass
      ? classNames(styles.tabClass, tabClass)
      : classNames(styles.newTabClass, tabClass);
    return (
      <div style={{ display: 'flex' }}>
        {this.renderTab(dataSource, firstId, commonTab, sectedTab)}
      </div>
    );
  }
}
export default SelfTab;
