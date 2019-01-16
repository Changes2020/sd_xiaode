import { stringify } from 'qs';
import request from '../utils/request';
// import config from '../config';

// const { NODE_ENV = 'pro' } = config;
// const hostObj = {
//   pro: 'http://bi-m.ministudy.com/apis',
//   dev: 'http://172.16.117.65:8082',
// };
// const HOST = hostObj[NODE_ENV];
/*
global HOST API_TYPE
*/
/*
*此接口为用于微信授权接口调用
*/
export function setWechartAuth(params = {}) {
  const wechartHost = {
    production: 'http://bi-wechat.ministudy.com/authorize/RedirectToWechat',
    development: 'http://172.16.117.65:8087/authorize/RedirectToWechat',
  };
  const branch = API_TYPE === 'development' ? 'dev' : 'pro';
  const newParams = { branch, ...params };
  window.location.href = `${wechartHost[API_TYPE]}?${stringify(newParams)}`;
}

/*
* 此接口用于客户端app获取授权
*/
export function setAppUserAuth(params) {
  window.location.href = `${HOST}/appLogin/setAppUserAuth?${stringify(params)}`;
}
/*
*此接口获取时间空间是指可选日期
*
*/
export async function getDisableTime(params) {
  return request(`${HOST}/timeManagement/list?${stringify(params)}`, {
    method: 'GET',
  });
}

/*
*此接口用于获取用户登录信息
* @params{userId}
*/
export async function getUserInfo(params) {
  return request(`${HOST}/wechatLogin/getUserByCode`, {
    method: 'POST',
    body: params,
  });
}
/*
*此接口用于获取组织结构信息
*/
export async function getOrgMap() {
  return request(`${HOST}/organization/findOrgMap`, {
    method: 'GET',
  });
}
/*
*此接口用于获取排名接口
 */
export async function getCreditRankAvgList(params) {
  return request(`${HOST}/trendNew/findAvgCredit`, {
    method: 'POST',
    body: params,
  });
}
/*
*此接口用于获取分组趋势接口
 */
export async function getCreditTrendAvgList(params) {
  return request(`${HOST}/trendNew/creditTrendAvgList`, {
    method: 'POST',
    body: params,
  });
}
/*
*此接口用于获取集团均分趋势
 */
export async function getCreditCompanyAvgList(params) {
  return request(`${HOST}/trendNew/creditCompanyAvgList`, {
    method: 'POST',
    body: params,
  });
}
/*
*获取趋势数据
 */
export async function getCreditTrendObjList(params) {
  return request(`${HOST}/trend/creditTrendObjList`, {
    method: 'POST',
    body: params,
  });
}

/*
*获取学分维度详情(底表页button组)接口
 */
export async function getCreditDementionList(params) {
  return request(`${HOST}/dimension/creditDementionList`, {
    method: 'POST',
    body: params,
  });
}

/*
*获取维度信息列表接口(底表页详情数据)接口
 */
export async function getdementionTypeList(params) {
  return request(`${HOST}/details/dementionTypeList`, {
    method: 'POST',
    body: params,
  });
}

/*
*获取趋势图(底表页趋势图)接口
 */

export async function getQueryCreditTrend(params) {
  return request(`${HOST}/dimension/queryCreditTrend`, {
    method: 'POST',
    body: params,
  });
}

/*
* 学分详情接口
 */

export async function getCreditDetail(params) {
  return request(`${HOST}/credit/detailAllCreditList`, {
    method: 'POST',
    body: params,
  });
}
/*
* 用于下载地表数据接口
 */
export async function addDownloadTask(params) {
  return request(`${HOST}/positiveAction/addDownloadTask`, {
    method: 'POST',
    body: params,
  });
}
/*
* 学分pk
 */
export async function getPKResult(params) {
  return request(`${HOST}/avgScorePK/getPKResult`, {
    method: 'POST',
    body: params,
  });
}
/*
* 记录用户登录学分的次数
 */
export async function operateLog(params) {
  const newParams = {
    site: HOST,
    operateType: 'AUTH',
  };
  return request(`${HOST}/operateLog/add`, {
    method: 'POST',
    body: { ...newParams, ...params },
  });
}
/*
* 学分pk modal数据
 */
export async function getPKObject(params) {
  return request(`${HOST}/avgScorePK/getPkObject`, {
    method: 'POST',
    body: params,
  });
}
/*
*此接口用于获取用户城市
* @params{userId}
*/
export async function getUserInfoCity(params) {
  return request(`${HOST}/user/getBasicInfo?${stringify(params)}`, {
    method: 'GET',
  });
}
