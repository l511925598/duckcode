import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './type'
import { localCache } from '@/utils/cache'
import qs from 'qs'
import { errorCodeType } from '@/utils/error-code-type'
import { ElMessage } from 'element-plus'
import { LOGIN_TOKEN } from '@/global/constants'
// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */
class HYRequest {
  instance: AxiosInstance
  // request实例 => axios的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        const isToken = (config.headers || {}).isToken === false
        if (localCache.getCache(LOGIN_TOKEN) && !isToken) {
          // @ts-ignore
          config.headers = { 'Access-Platform': 'PORTAL' }
          config.headers.Authorization = localCache.getCache(LOGIN_TOKEN)
        }

        // @ts-ignore
        config.paramsSerializer = function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const code = res.data['code'] || 200
        //特殊返回错误特殊处理
        const backmsg = res.data.msg
        // 获取错误信息
        const msg = errorCodeType(code, backmsg) || res.data['msg'] || errorCodeType('default', 'default')
        if (code === 200) {
          return Promise.resolve(res.data)
        } else {
          ElMessage.error(msg)
          return Promise.reject(res.data)
        }
      },
      (error) => {
        console.log('err' + error)
        let { message } = error
        if (message == 'Network Error') {
          message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.slice(message.length - 3) + '异常'
        }
        ElMessage.error({
          message: message,
          duration: 5 * 1000,
        })
        return Promise.reject(error)
      }
    )

    // 针对特定的hyRequest实例添加拦截器
    // @ts-ignore
    this.instance.interceptors.request.use(config.interceptors?.requestSuccessFn, config.interceptors?.requestFailureFn)
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
