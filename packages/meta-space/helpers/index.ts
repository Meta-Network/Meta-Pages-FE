import { invitationsMine } from '../services/ucenter'
import { InviitationsMineState } from '../typings/ucenter.d'

/**
 * pages index
 */

/**
 * 获取邀请码
 * @returns
 */
export const fetchInviteCodeAPI = async () => {
  let result: InviitationsMineState[] = []
  try {
    const res = await invitationsMine()
    if (res.statusCode === 200) {
      result = res.data
    }
  } catch (e) {
    console.log(e)
  }
  return result
}
