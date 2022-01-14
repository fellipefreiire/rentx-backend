import { AppError } from './../../../../shared/errors/AppError';
import { IUsersTokensRepository } from './../../repositories/IUsersTokensRepository';
import { verify, sign } from 'jsonwebtoken'
import { inject } from 'tsyringe';
import auth from '@config/auth';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!")
    }

    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: sub,
      expires_date: refresh_token_expires_date,
      refresh_token,
    })

    return refresh_token
  }
}