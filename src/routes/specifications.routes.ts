import { Router } from 'express'
import { ensureAunthenticated } from '../middlewares/ensureAunthenticated'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAunthenticated)
specificationsRoutes.post('/', createSpecificationController.handle)

export { specificationsRoutes }