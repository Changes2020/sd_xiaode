// import { stringify } from 'qs';
import request from '../utils/request';
import config from '../config';

const { NODE_ENV = 'pro' } = config;
const hostObj = {
  pro: 'http://bi-m.ministudy.com/apis',
  dev: 'http://172.16.117.65:8082',
};
const HOST = hostObj[NODE_ENV];

/*
*此接口为获取企业客户端授权
*/
/*
*此接口用于获取用户登录信息
* @params{code}
*/
export async function setAppUserAuth(params) {
  return request(`${HOST}/appLogin/setAppUserAuth`, {
    method: 'POST',
    body: params,
  });
}
