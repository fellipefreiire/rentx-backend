import { Router } from 'express'

import { ensureAunthenticated } from '@shared/infra/http/middlewares/ensureAunthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'

import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post(
  '/',
  ensureAunthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get(
  '/available',
  listAvailableCarsController.handle
)

carsRoutes.post(
  '/specifications/:id',
  ensureAunthenticated,
  ensureAdmin,
  createCarSpecificationController.handle)

export { carsRoutes }