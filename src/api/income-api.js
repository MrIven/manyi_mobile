/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'
export function getUserRefferGift(params) {
  return fetch(`${baseUrl}/share/userrefer_gift`, params)
}
