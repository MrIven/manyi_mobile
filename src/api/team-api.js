/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'

export function getUserRefferTeam(params) {
  return fetch(`${baseUrl}/share/userrefer_team`, params)
}
