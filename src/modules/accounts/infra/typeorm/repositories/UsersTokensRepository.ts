import { Repository } from 'typeorm';
import { getRepository } from 'typeorm';
import { UserTokens } from './../entities/UserTokens';
import { ICreateUserTokenDTO } from '@modules/accounts/dto/ICreateUserTokenDTO';
import { IUsersTokensRepository } from './../../../repositories/IUsersTokensRepository';


export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }
  async create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    })

    await this.repository.save(userToken)

    return userToken
  }

}