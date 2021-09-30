import factoryClient from './factoryClient'

/**
 * META CMS API
 */
export const CMS_API = factoryClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_CMS_API as string
})

/**
 * ucenter API
 */
export const uCenterAPI = factoryClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_UCENTER_API as string
})