import { AppError } from './../../../../shared/errors/AppError';
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import e from 'express';

dayjs.extend(utc)

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
    const minimumRentalHours = 24;

    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError("Car is unavailable!")
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError("User already have a rental!")
    }

    const expectedReturnDateFormatted = dayjs(expected_return_date)
      .utc()
      .local()
      .format()

    const dateNow = dayjs().utc().local().format()

    const compare = dayjs(expectedReturnDateFormatted).diff(dateNow, "hours")

    if (compare < minimumRentalHours) {
      throw new AppError("Invalid return time!")
    }

    return await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date
    })
  }
}

export { CreateRentalUseCase }