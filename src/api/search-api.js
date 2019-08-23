/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'

export function fetchSearch(params) {
  return fetch(`${baseUrl}/share/search`, params)
}
