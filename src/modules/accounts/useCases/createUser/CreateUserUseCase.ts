import { inject } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from '../../dto/ICreateUserDTO'

class CreateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({
    name,
    username,
    email,
    driver_license, password
  }: ICreateUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      driver_license,
      password
    })
  }
}

export { CreateUserUseCase }