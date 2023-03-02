import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    name: '',
    phone: '',
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //1.账号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.people.id
      this.token = loginResult.data.token
      this.name = loginResult.data.people.name
      this.phone = loginResult.data.people.phone
      //2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      //3.页面跳转（main页面）
      router.push('/main')
    },
  },
})

export default useLoginStore
