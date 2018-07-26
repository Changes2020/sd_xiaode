/*
*此词典用于展示本地存储内容的key值,便于方便查找
const itemKeyDict={
  userInfo:'userInfo',      用于储存用户信息,userId,groupId,groupType,等信息(不能随意改动);
}
*/

/*
* @params
* {key} String
* {value} any
* {day} Number
*/
export function setItem(key, value = null, days = null) {
    if (value === null || (days !== null && isNaN(days))) {
      const error = new Error('localStorage存储请输入正确参数');
      throw error;
    } else {
      let now = new Date();
      let expries = !days&&days!==0?null:Number(now) + 24 * 3600000 * Number(days);
      window.localStorage.removeItem(key);
      window.localStorage.setItem(key, JSON.stringify({value, expries}));
    }
  }
  /*
  * params
  * {key} String
  * return Object{value,isExpire}
  * 
  */
  export function getItem(key) {
    let store = window.localStorage.getItem(key)||null;
    store = JSON.parse(store)||{};
    const {value=null,expries=null}=store;
    let isExpries=expries&&Number(expries) > Number(new Date())?true:false;
    return{
        value,
        isExpries
    }
}