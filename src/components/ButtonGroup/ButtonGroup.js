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

import React, { Component } from "react";
import { Button } from "antd-mobile";
import styles from "./ButtonGroup.less";


class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  buttonListItem=(dataSource = null,
                  dataReturnFun = null,
                  id = null,
                  isSelectFirst = null,
                  spanFunction = null
                  // btnClass = null
  )=>{
    // console.log('子组件button数据',dataSource,dataReturnFun,id)
    // console.log('data' in dataSource,dataSource.data)
  const data='data' in dataSource?dataSource.data:[];
  if (!dataReturnFun || typeof dataReturnFun !== "function") {
    console.warn("未传入dataReturnFun方法或传入的非function");
  }
  if (!spanFunction && typeof spanFunction !== "function") {
    console.warn("传入的spanFunction非function");
  }
  // console.log(data)
  const liList = data.map((item, index)=> {
    return (
      <Button
        className={!id ? !
            (isSelectFirst ? styles.btnStyle :
          (index === 0 ? styles.btnSelected : styles.btnStyle)) :
          (item.id === id ? styles.btnSelected : styles.btnStyle)}
        key={item.id}
        onClick={() => dataReturnFun(item, index)}
      >
        {!spanFunction ? <span>{item.name}</span> : spanFunction(item, id)}
      </Button>
    );
  });
  return liList;
  }

  render() {
    const {
      dataSource = null,
      dataReturnFun = null,
      id = null,
      isSelectFirst = null,
      spanFunction = null,
      btnClass = null,
    } = this.props;
    // console.log('子组件render时传入数据',dataSource,dataReturnFun,id)
    return (
      <div>
        {this.buttonListItem(
          dataSource,
          dataReturnFun,
          id,
          isSelectFirst,
          spanFunction,
          btnClass
        )}
      </div>
    );
  }
}

export default ButtonGroup;
