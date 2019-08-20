/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'

export function fetchWithdrawalRecord(params) {
  return fetch(`${baseUrl}/share/withdrawal_record`, params)
}
