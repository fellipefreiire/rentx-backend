import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICreateCarDTO } from "../dtos/ICreateCarDTO"

interface ICarsRepository {
	create(data: ICreateCarDTO): Promise<Car>;
	findByLicensePlate(license_plate: string): Promise<Car>;
	findAvailable(
		name?: string,
		brand?: string,
		category_id?: string
	): Promise<Car[]>;
}

export { ICarsRepository }