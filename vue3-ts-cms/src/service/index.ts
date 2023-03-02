import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})
export default hyRequest
