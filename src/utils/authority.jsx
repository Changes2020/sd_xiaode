import {getItem} from 'utils/localStorage';
/*
* 权限判断 1  
*  获取用户userId,如果没有则表示无权限
*         
*/
export function getAuthority() {
  const chartInfo=getItem('userInfo')||{};
  let {value=null,isExpries=false}=chartInfo;
  value=value||{};
  const {userId=null}=value;
  if(userId&&isExpries===false){
    return true;
  }else{
    return false;
  }
  }