/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {get, fetch, baseUrl} from 'config/index'
// 登录接口
export function loginUserNo(params) {
  return get(`${baseUrl}/test26`, params)
}
export function getUserRefferInfo(params) {
  return fetch(`${baseUrl}/share/userrefer_info`, params)
}
