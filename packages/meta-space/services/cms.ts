import { CMS_API } from './client'
import { axiosResult } from '../typings/request'
import { DomainFindAPIParamsState, DomainFindAPIResultState } from '../typings/cms'

/**
 * doman find api
 * @param params
 * @returns
 */
export const DomainFindAPI = (params: DomainFindAPIParamsState): Promise<axiosResult<DomainFindAPIResultState[]>> =>
CMS_API.get('/domain/find', { params })
