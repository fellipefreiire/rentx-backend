import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController"
import { Router } from "express"

const passwordRoutes = Router()

const sendForgotPasswordMailCotroller = new SendForgotPasswordMailController()

passwordRoutes.post('/forgot', sendForgotPasswordMailCotroller.handle)

export { passwordRoutes }