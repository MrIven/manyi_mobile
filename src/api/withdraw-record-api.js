/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'

export function fetchWithdrawalRecord(params) {
  return fetch(`${baseUrl}/share/withdrawal_record`, params)
}
// 提现申请详情页
export function withdrawalRecordDetail(params) {
  return fetch(`${baseUrl}/share/withdrawal_record_detail`, params)
}
