import { ensureAunthenticated } from '@shared/infra/http/middlewares/ensureAunthenticated';
import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()

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

export { carsRoutes }