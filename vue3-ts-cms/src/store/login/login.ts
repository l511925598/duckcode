import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router, {addRoutesWithMenu} from '@/router'
import { LOGIN_TOKEN , ID ,NAME , PHONE} from '@/global/constants'
import {mapMenusToRoutes} from "@/utils/mac-menus";

interface ILoginState {
  token:string
  id:string
  name:string
  phone:string
}

const useLoginStore = defineStore('login', {
  state: ():ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    id: '',
    name: '',
    phone: '',
  }),
  actions: {
    loginAccountAction: async function (account: IAccount) {
      //1.账号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      this.token = loginResult.data.token
      this.id = loginResult.data.people.id
      this.name = loginResult.data.people.name
      this.phone = loginResult.data.people.phone
      //2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      localCache.setCache(ID,this.id)
      localCache.setCache(NAME,this.name)
      localCache.setCache(PHONE,this.phone)
      //模拟
      // let useMenus;
      // const routes = mapMenusToRoutes(useMenus)
      // routes.forEach((route) => router.addRoute('main',route))
      addRoutesWithMenu()
      //3.页面跳转（main页面）
      router.push('/main')
    },

    loadLocalCacheAction(){
      const token = localCache.getCache(LOGIN_TOKEN)
      if (token){
        this.token = token
        addRoutesWithMenu()
      }
    }
  },
})

export default useLoginStore
