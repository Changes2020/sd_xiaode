/* RankTrendTab组件是专门针对首页的排名趋势tab进行封装，因为其独特性，暂时只有一个地方使用，后期开发新需求的时候，有和该组件类似的，会再提取封装优化组件
*
* callBackFun{必传 Funciton}:父组件需要传入点击对应tab返回时触发接受数据的function，返回数据为（item,index）
* firstId{非必传 Number}:传入默认选中第几个tab,若不传入默认选中第一个tab
*
* */
import React,{Component} from 'react';
import styles from "./Tab.less";
import qushi from '../../assets/qushi.svg';
import qushi1 from '../../assets/qushi1.svg';
import rank from '../../assets/rank.svg';
import rank1 from '../../assets/rank1.svg';

class RankTrendTab extends Component {
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
        <span onClick={() => (this.selectTab(1))} className={firstId === 1 ? styles.selectSpan1 : ''}>
          <i className={styles.text}>排名</i>
          <img className={styles.iconImg} src={firstId === 1 ? rank1 : rank} alt="" />
        </span>
        <span onClick={() => (this.selectTab(2))} className={firstId === 2 ? styles.selectSpan2 : ''}>
          <i className={styles.text}>趋势</i>
          <img className={styles.iconImg} src={firstId === 2 ? qushi1 : qushi} alt="" />
        </span>
      </div>
    )
  }
}
export default RankTrendTab;
