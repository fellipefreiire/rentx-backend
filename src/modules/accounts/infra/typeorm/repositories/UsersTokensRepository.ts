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

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return await this.repository.findOne({ user_id, refresh_token })
  }

  async deleteById(refresh_token_id: string): Promise<void> {
    await this.repository.delete(refresh_token_id)
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return await this.repository.findOne({ refresh_token })
  }
}