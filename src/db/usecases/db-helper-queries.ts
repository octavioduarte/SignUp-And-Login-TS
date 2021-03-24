import { settings } from "../../main/config/env"
import { AccountUserDB, GetUserByToken, LoadUserByCustomField } from "../../types"
import { JwtAdapter } from "../../utils"

export class DbGenericQueries implements GetUserByToken {
  constructor(
    private readonly loadUser: LoadUserByCustomField,
  ) { }

  async getUserByToken(token_user: string): Promise<AccountUserDB> {
    const jwtAdapter = new JwtAdapter(settings.secret_token)
    const tokenFormatted = token_user.split(' ')[1]
    const { id } = await jwtAdapter.checkToken(tokenFormatted)
    const user = await this.loadUser.loadUserByCustomField('id', id)
    return user as AccountUserDB
  }
}
