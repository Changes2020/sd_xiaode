import React from 'react';
import { connect } from 'dva';
import {Button} from 'antd-mobile';
// import Loading from 'components/Loading/Loading';
// import { Toast } from 'antd-mobile';
import {assignUrlParams} from 'utils/routerUtils'

 class Details extends React.Component{
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
      }
     }
     this.state=assignUrlParams(initState,urlParams)
   }
   componentDidMount(){
    
   }
   toDementionPage=()=>{
     const { dateType, startTime, endTime}=this.state.paramsObj;
     this.props.setRouteUrlParams('/demention',{dateType,startTime,endTime});
     
   }
  render(){
    const {paramsObj}=this.state;
    return(
<div>
    <div>
    {JSON.stringify(paramsObj)}
    </div>
    <div style={{marginTop:'50px'}}>
    <Button onClick={this.toDementionPage}>点击跳转至低表页面</Button>  
    </div>
 
    {/* <Loading/>  */}
    </div>
    )
  }
}
export default connect(({loading})=>({loading}))(Details)

