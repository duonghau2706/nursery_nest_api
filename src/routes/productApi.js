import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.get(
  '/get-all',
  authorization(),
  pickHandler('ProductController@getAllProduct')
)

router.get(
  '/get-comment-by-id',
  authorization(),
  pickHandler('ProductController@getCommentById')
)

router.get(
  '/get-info-by-product-id',
  authorization(),
  pickHandler('ProductController@getProductById')
)

router.get(
  '/get-sorted-by-condition',
  authorization(),
  pickHandler('ProductController@getSortedProductByCondition')
)

export default router
