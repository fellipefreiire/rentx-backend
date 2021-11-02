import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

interface IPayload {
  sub: string;
}

export async function ensureAunthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error('Token missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, 'd652eeeea9a382e2b37ad73e0a66b131') as IPayload

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new Error('User does not exists!')
    }

    next()
  } catch {
    throw new Error("Invalid token!")
  }
}