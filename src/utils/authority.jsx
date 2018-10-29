import { getItem } from 'utils/localStorage';
/*
* 权限判断 1
*  获取用户userId,如果没有则表示无权限
*  在线上环境中存在用户的userId为null且存为了字符串
*
*/
export function getAuthority() {
  const chartInfo = getItem('userInfo') || {};
  let { value = null } = chartInfo;
  const { isExpries = false } = chartInfo;
  value = chartInfo.value || {};
  const { userId = null } = value;
  const isStrNull = userId === 'null';
  if (userId && !isExpries && !isStrNull) {
    return userId;
  } else {
    return false;
  }
}
