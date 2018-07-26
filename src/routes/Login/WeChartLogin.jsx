import React from 'react';
import Loading from 'components/Loading/Loading';
import {setItem} from 'utils/localStorage';
import {getAuthority} from 'utils/authority';
import {getWeChart} from 'services/api';
import config from '../../config';

const {DEBUGGER=false,userId}=config;
 class WeChartLogin extends React.Component{
  UNSAFE_componentWillMount(){
    console.log(DEBUGGER)
    if(DEBUGGER){
      setItem('userInfo',{userId});
      setTimeout(()=>{
        this.checkoutHasAuth();
      },100);
    }else{
      this.checkoutHasAuth();
    }
   }
   checkoutHasAuth=()=>{      // 获取微信授权信息,如果获取失败,则需要跳转微信授权
    const isHasUserId=getAuthority();
    if(isHasUserId){
      this.props.setRouteUrlParams('/');
    }else{
      const url=getWeChart();
      window.location.href=url;
    }
   }
  render(){

    return(
      <div>
    <Loading/> 
    </div>
    )
  }
}
export default WeChartLogin