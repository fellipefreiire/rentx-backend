import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalRepositoryInMemory

describe('Create Rental', () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory)
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date()
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if user already have a rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "123",
        expected_return_date: new Date()
      })

      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "321",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if car already have a rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: new Date()
      })

      const rental = await createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})