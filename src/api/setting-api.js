/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'

export function fetchPersonalSetting(params) {
  return fetch(`${baseUrl}/share/personal_setting`, params)
}
