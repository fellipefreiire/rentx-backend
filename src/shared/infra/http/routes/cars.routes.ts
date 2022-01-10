import uploadConfig from '@config/upload';
import { Router } from 'express'

import { ensureAunthenticated } from '@shared/infra/http/middlewares/ensureAunthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'

import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';
import multer from 'multer';

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

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
  createCarSpecificationController.handle
)

carsRoutes.post(
  '/images/:id',
  ensureAunthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImageController.handle
)

export { carsRoutes }