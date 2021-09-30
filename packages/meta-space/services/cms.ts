import { CMS_API } from './client'
import { axiosResult } from '../typings/request'
import { DomainFindAPIParamsState, DomainData } from '../typings/cms'

/**
 * doman find api
 * @param params
 * @returns
 */
export const DomainFindAPI = (params: DomainFindAPIParamsState): Promise<axiosResult<DomainData[]>> =>
CMS_API.get('/domain/find', { params })

/**
 * site random
 */
export const SiteConfigRandomAPI = (): Promise<axiosResult<DomainData>> =>
CMS_API.get('/site/config/random')
