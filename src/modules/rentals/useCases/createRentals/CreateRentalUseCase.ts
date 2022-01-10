import { AppError } from './../../../../shared/errors/AppError';
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;

}

class CreateRentalUseCase {
  constructor(
    private rentalRepository: IRentalRepository
  ) { }

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError("Car is unavailable!")
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError("User already have a rental!")
    }

    return await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date
    })
  }
}

export { CreateRentalUseCase }