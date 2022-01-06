import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create({
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
    brand
  }: ICreateCarDTO): Promise<void> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      brand
    })

    this.cars.push(car)
  }
}

export { CarsRepositoryInMemory }