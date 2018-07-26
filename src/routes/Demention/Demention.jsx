import React from 'react';
import { connect } from 'dva';
import {assignUrlParams} from 'utils/routerUtils'
import styles from './Demention.less';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';

 class Demention extends React.Component{
   constructor(props){
     super(props)
     const {urlParams={}}=props;
     const initState={
      paramsObj:{
        startTime: null,   // 过滤开始时间
        endTime: null,     // 过滤结束时间
        creditType: 1,     // 均分类型1为学分均分2正面均分,3负面均分
        groupType: 1,      // 1:学院，2:家族，3:小组
        rankType: 3,       // 1:集团，2:院内，3:null
        dateType: 3,       // 1:周均,2:月均,3:自定义
        filteKeyID: null,  // 登录用户id
        userId: null,
      },
       dementionId:4,
     }
     this.state=assignUrlParams(initState,urlParams)
   }
   componentDidMount(){

   }
  // 父组件控制butonn组内容显示
   spanFun = (item,id) => {
     // console.log('父组件自定义span',item,id)
     return (
       <span>
         <span className={item.id === id ? styles.spanIdSelected : styles.spanIdStyle}>{item.id}</span>
         <span className={item.id === id ? styles.spanNameSelected : styles.spanNameStyle}>{item.name}</span>
       </span>
     )
   }

   // 点击button触发的请求chart和table接口函数
   fnClickGroupButton(item) {
     const dementionId = item.id
     this.setState({
       dementionId,
     })
   }

  render(){
    const {paramsObj}=this.state;
    const dataSource = {data:[
      {name: "直播", id: 4, rawDataDes: "直播（小时）"},
        {name: "预估分", id: 32, rawDataDes: "预估分"},
        {name: "主帖", id: 33, rawDataDes: "主帖"},
        {name: "跟帖", id: 34, rawDataDes: "跟帖"},
        {name: "优质帖", id: 35, rawDataDes: "优质帖"}]}
    // console.log(this.state.dementionId)
    return(
      <div>
        <div>
          {JSON.stringify(paramsObj)}
        </div>
        <div className={styles.btnContainer}>
          <ButtonGroup
            dataSource={dataSource}
            dataReturnFun={(item,index) => {this.fnClickGroupButton(item,index)}}
            id={this.state.dementionId}
            isSelectFirst
            // spanFunction={(item,num) => {this.spanFun(item,num)}}
            // btnClass='btnStyle'
          />
        </div>
      </div>
    )
  }
}
export default connect(({loading})=>({loading}))(Demention)

