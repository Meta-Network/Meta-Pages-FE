import { DomainFindAPI, SiteConfigRandomAPI } from '../services/cms'
import { DomainFindAPIParamsState, DomainData } from '../typings/cms'

/**
 * fetch domain find api
 * @param params
 * @returns
 */
export const FetchDomainFindAPI = async (params: DomainFindAPIParamsState): Promise<DomainData[] | undefined>  => {
  try {
    const res = await DomainFindAPI(params)
    if (res.statusCode === 200) {
      return res.data
    }
    return
  } catch (e) {
    console.log(e)
    return
  }
}

/**
 * fetch site random
 */
export const FetchSiteConfigRandomAPI = async (): Promise<DomainData | undefined>  => {
  try {
    const res = await SiteConfigRandomAPI()
    if (res.statusCode === 200) {
      return res.data
    }
    return
  } catch (e) {
    console.log(e)
    return
  }
}