import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.post(
  '/create-order',
  authorization(),
  pickHandler('OrderController@createOrder')
)

router.get(
  '/get-by-user-id',
  authorization(),
  pickHandler('OrderController@getOrdersByUserId')
)

export default router
