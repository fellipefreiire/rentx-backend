import { UserTokens } from '../infra/typeorm/entities/UserTokens';
import { ICreateUserTokenDTO } from './../dto/ICreateUserTokenDTO';

export interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateUserTokenDTO): Promise<UserTokens>
}