import { ensureAunthenticated } from '@shared/infra/http/middlewares/ensureAunthenticated';
import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router()

const createCarController = new CreateCarController()

carsRoutes.post(
  '/',
  ensureAunthenticated,
  ensureAdmin,
  createCarController.handle
)

export { carsRoutes }