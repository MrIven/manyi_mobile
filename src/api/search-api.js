/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'

export function getUserRefferInfo(params) {
  return fetch(`${baseUrl}/share/userrefer_info`, params)
}
