import React from 'react';
import { connect } from 'dva';
import {assignUrlParams} from 'utils/routerUtils'
import styles from './Demention.less';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';

  //ButtonGroup组件测试
  const btnContainerTest = (obj = null, fnClick = null ,id = null,spanFun=null) => (
    <div className={styles.btnContainer}>
      <ButtonGroup
        dataSource = {obj}
        dataReturnFun={(item,index) => (fnClick(item,index))}
        id={id}
        isSelectFirst={true}
        // spanFunction={(item,id) => (spanFun(item,id))}
        // btnClass='btnStyle'
      />
    </div>
  );


 class Demention extends React.Component{
   constructor(props){
     super(props)
     const {urlParams={}}=props;
     const initState={
      paramsObj:{
        startTime: null,   //过滤开始时间
        endTime: null,     //过滤结束时间
        creditType: 1,     //均分类型1为学分均分2正面均分,3负面均分
        groupType: 1,      //1:学院，2:家族，3:小组
        rankType: 3,       //1:集团，2:院内，3:null
        dateType: 3,       //1:周均,2:月均,3:自定义
        filteKeyID: null,  //登录用户id
        userId: null,
        dementionId:4,
      }
     }
     this.state=assignUrlParams(initState,urlParams)
   }
   componentDidMount(){

   }
  // 父组件控制butonn组内容显示
   spanFun(item,id){
     return (
       <span>
        <span className={item.id === id ? styles.spanIdSelected : styles.spanIdStyle}>{item.id}</span>
        <span className={item.id === id ? styles.spanNameSelected : styles.spanNameStyle}>{item.name}</span>
      </span>
     )
   }

   //点击button触发的请求chart和table接口函数
   fnClickGroupButton(groupId,index) {
     console.log('父组件的button',groupId,index)
     const dementionId = groupId.id
     this.setState({
       dementionId: dementionId,
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

    return(
    <div>
      <div>
      {JSON.stringify(paramsObj)}
      </div>
      {btnContainerTest(dataSource, this.fnClickGroupButton.bind(this),this.state.dementionId,this.spanFun.bind(this))}
    </div>
    )
  }
}
export default connect(({loading})=>({loading}))(Demention)

