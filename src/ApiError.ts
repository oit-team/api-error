import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { config as ApiConfig } from './ApiConfig'

export interface ApiErrorOptions {
  // 请求地址
  url?: string
  // 状态码
  status?: string
  // 响应信息
  response?: AxiosResponse
  // 错误信息
  message?: string
  // axios错误信息
  error?: AxiosError
}

export class ApiError {
  // 请求地址
  url?: string
  // 状态码
  status?: string | number
  // 响应信息
  response?: AxiosResponse
  // 响应数据
  data: any
  // 错误信息
  message?: string
  // axios配置
  config?: AxiosRequestConfig
  code?: String
  httpStatus?: number
  custom: any

  constructor(options: ApiErrorOptions) {
    if (typeof options !== 'object') throw new TypeError('options must be object')

    // 处理Axios错误
    if ('error' in options && options.error?.isAxiosError) {
      const error = options.error
      this.response = error.response
      this.config = error.config
    } else {
      this.response = options.response
      this.config = options.response?.config
    }

    this.url = this.config?.url
    this.data = this.response?.data
    /**
     * 顺序：
     * 1.参数
     * 2.响应数据
     * 3.错误代码
     */
    this.status = options.status
    this.httpStatus = this.response?.status
    this.code = options?.error?.code
    /**
     * 顺序：
     * 1.参数
     * 2.函数获取
     * 3.错误消息
     */
    this.message = (
      options.message
      ?? ApiConfig?.getMessage(this.status, this)
      ?? options.error?.message
    )
  }
}
