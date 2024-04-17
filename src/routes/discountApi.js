import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.get(
  '/get-discount-by-code',
  authorization(),
  pickHandler('DiscountController@getDiscountByCode')
)

export default router
