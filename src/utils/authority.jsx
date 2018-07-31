import { getItem } from 'utils/localStorage';
/*
* 权限判断 1
*  获取用户userId,如果没有则表示无权限
*
*/
export function getAuthority() {
  const chartInfo = getItem('userInfo') || {};
  let { value = null } = chartInfo;
  const { isExpries = false } = chartInfo;
  value = chartInfo.value || {};
  const { userId = null } = value;
  if (userId && !isExpries) {
    return userId;
  } else {
    return false;
  }
}
