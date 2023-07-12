import { ApiError } from './ApiError'

export interface ApiConfig {
  [propName: string]: any;

  getMessage(status: string | number | undefined, apiError: ApiError): string | void

  messageTips?(message: string | undefined, apiError: ApiError): void
}

let apiConfig: ApiConfig | undefined

function setApiConfig(config: ApiConfig) {
  apiConfig = config
}

export {
  apiConfig as config,
  setApiConfig,
}
