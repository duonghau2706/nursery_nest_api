import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.post(
  '/create-order-detail',
  authorization(),
  pickHandler('OrderDetailController@createOrderDetail')
)

router.get(
  '/get-by-order-id',
  authorization(),
  pickHandler('OrderDetailController@getByOrderId')
)

export default router
