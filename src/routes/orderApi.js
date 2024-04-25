import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.get(
  '/get-all-order',
  authorization(),
  pickHandler('OrderController@getAllOrder')
)

router.get(
  '/get-order-by-id',
  authorization(),
  pickHandler('OrderController@getOrderById')
)

router.get(
  '/get-by-user-id',
  authorization(),
  pickHandler('OrderController@getOrdersByUserId')
)

router.post(
  '/create-order',
  authorization(),
  pickHandler('OrderController@createOrder')
)

router.post(
  '/update-order',
  authorization(),
  pickHandler('OrderController@updateOrder')
)

router.post(
  '/delete-order',
  authorization(),
  pickHandler('OrderController@deleteOrder')
)

export default router
