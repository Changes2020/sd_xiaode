/* GroupCollegeTab组件是专门针对首页的集团院内tab进行封装，因为其独特性，暂时只有一个地方使用，后期开发新需求的时候，有和该组件类似的，会再提取封装优化组件
*
* callBackFun{必传 Funciton}:父组件需要传入点击对应tab返回时触发接受数据的function，返回数据为（item,index）
* firstId{非必传 Number}:传入默认选中第几个tab,若不传入默认选中第一个tab
*
* */
import React,{Component} from 'react';
import styles from "./Tab.less";

class GroupCollegeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  selectTab(id) {
    if (!this.props.callBackFun || typeof (this.props.callBackFun) !== "function") {
      console.warn("未传入callBackFun方法或传入的非function");
    }else{
      this.props.callBackFun(id)
    }
  }


  render(){
    const { firstId = 1} = this.props;
    return(
      <div>
        <span onClick={() => (this.selectTab(1))} style={firstId === 1 ? {color: '#52C9C2'} : {color: '#999'}}>
            集团排名
        </span>
        <b className={styles.tabConTip}>|</b>
        <span onClick={() => (this.selectTab(2))} style={firstId === 2 ? {color: '#52C9C2'} : {color: '#999'}}>
            院内排名
        </span>
      </div>
    )
  }
}
export default GroupCollegeTab;
