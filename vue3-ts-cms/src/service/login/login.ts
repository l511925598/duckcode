import hyRequest from '@/service'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: 'portal/login',
    data: account,
  })
}
