/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'
// 登录接口
export function canWithdrawalAmount(params) {
  return fetch(`${baseUrl}/share/can_withdrawal_amount`, params)
}
