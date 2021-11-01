import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from '../../dto/ICreateUserDTO'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({
    name,
    email,
    driver_license, password
  }: ICreateUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      email,
      driver_license,
      password
    })
  }
}

export { CreateUserUseCase }