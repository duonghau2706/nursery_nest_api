import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.get(
  '/get-discount-by-code',
  authorization(),
  pickHandler('DiscountController@getDiscountByCode')
)

router.post(
  '/create',
  authorization(),
  pickHandler('DiscountController@create')
)

router.get(
  '/get-all',
  authorization(),
  pickHandler('DiscountController@getAll')
)

router.get(
  '/get-by-id',
  authorization(),
  pickHandler('DiscountController@getById')
)

router.post(
  '/update-discount',
  authorization(),
  pickHandler('DiscountController@updateDiscount')
)

router.post(
  '/delete-discount',
  authorization(),
  pickHandler('DiscountController@deleteDiscount')
)

export default router
