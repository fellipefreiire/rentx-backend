import { Router } from 'express'
import { ensureAunthenticated } from '@shared/infra/http/middlewares/ensureAunthenticated'
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post('/', ensureAunthenticated, ensureAdmin, createSpecificationController.handle)

export { specificationsRoutes }