import { ApiConfig } from '../ApiConfig'
import { ApiError } from '../ApiError'
import { config } from '../ApiConfig'

const defaultApiConfig: ApiConfig = {
  STATUS_TIPS: {
    'Network Error': '网络错误，请稍后重试',
    ECONNABORTED: '请求超时，请稍后重试',
    404: '请求404，请稍后重试',
  },
  getMessage(status: string | number | undefined, apiError): string | undefined {
    let message: string | undefined

    if (status !== undefined) message = defaultApiConfig.STATUS_TIPS[status]
    message ??= apiError.data?.message

    return message
  },
}

// 捕获Promise错误
window.addEventListener('unhandledrejection', event => {
  const { reason } = event
  // 处理接口错误
  if (reason instanceof ApiError) {
    // 输出提示消息
    config?.messageTips?.(reason.message, reason)
    event.preventDefault()
  }
}, false)

export {
  defaultApiConfig,
}
