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
/* export function fetchWechatUserInfo(params) {
  return fetch(`${wxUrl}/connect/oauth2/authorize?appid=wx344e8995df55488e&redirect_uri=http://www.easiroam.cn/share/wechat_auth&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`, params)
} */
