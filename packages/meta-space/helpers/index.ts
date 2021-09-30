import { DomainFindAPI } from '../services/cms'
import { DomainFindAPIParamsState, DomainFindAPIResultState } from '../typings/cms'

/**
 * fetch domain find api
 * @param params
 * @returns
 */
export const FetchDomainFindAPI = async (params: DomainFindAPIParamsState): Promise<DomainFindAPIResultState[] | undefined>  => {
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
