import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import {firstMenu, mapMenusToRoutes} from "@/utils/mac-menus";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue'),
    },
    {
      path: '/main',
      name:'main',
      component: () => import('../views/main/Main.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue'),
    },
  ],
})

//手动本地路由
// const localRoutes = [
//   {
//     path:'/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue')
//   },
//   {
//     path:'/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path:'/main/system/role',
//     component: () => import('../views/main/system/role/role.vue')
//   },
//   {
//     path:'/main/system/user',
//     component: () => import('../views/main/system/user/user.vue')
//   }
// ]
//
// router.addRoute('main',localRoutes[0])
// router.addRoute('main',localRoutes[1])

export function addRoutesWithMenu() {
  // 1.获取匹配到的所有的路由
  const routes = mapMenusToRoutes()

  // 2.动态添加到router中
  for (const route of routes) {
    router.addRoute('main', route)
  }
}
//导航守卫
//参数：to(跳转到的位置)/from（从哪里跳转过来）
//返回值：返回值决定导航路由的路径
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }

  //如果进入到mian当中跳转到她到第一个子菜单
  if (to.path === '/main'){
    return firstMenu?.path
  }
})
export default router
