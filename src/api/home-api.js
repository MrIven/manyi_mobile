/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {get, baseUrl} from 'config/index'
// 登录接口
export function loginUserNo(params) {
  return get(`${baseUrl}/test26`, params)
}
