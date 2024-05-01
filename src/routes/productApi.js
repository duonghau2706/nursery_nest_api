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
  '/get-product-by-category',
  authorization(),
  pickHandler('ProductController@getProductByCategory')
)

router.get(
  '/get-all-prd',
  authorization(),
  pickHandler('ProductController@getAll')
)

router.post(
  '/create-product',
  authorization(),
  pickHandler('ProductController@createProduct')
)

router.post(
  '/update-product',
  authorization(),
  pickHandler('ProductController@updateProduct')
)

router.post(
  '/delete-product',
  authorization(),
  pickHandler('ProductController@deleteProduct')
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
