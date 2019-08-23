/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'
// 获取提现金额及转账账号信息
export function canWithdrawalAmount(params) {
  return fetch(`${baseUrl}/share/can_withdrawal_amount`, params)
}

// 获取提现金额及转账账号信息
export function withdrawMoney(params) {
  return fetch(`${baseUrl}/share/wx_withdrawal`, params)
}
