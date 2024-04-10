import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.get(
  '/get-all-cart',
  authorization(),
  pickHandler('CartController@getAllCart')
)

router.post(
  '/update-cart',
  authorization(),
  pickHandler('CartController@updateCart')
)

export default router
