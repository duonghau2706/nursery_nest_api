import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'

const router = Router()

router.get(
  '/get-all-categories',
  authorization(),
  pickHandler('CategoryController@getAll')
)

router.get(
  '/get-category-by-id',
  authorization(),
  pickHandler('CategoryController@getCategoryById')
)

router.post(
  '/create-category',
  authorization(),
  pickHandler('CategoryController@createCategory')
)

router.post(
  '/update-category',
  authorization(),
  pickHandler('CategoryController@updateCategory')
)

router.post(
  '/delete-category',
  authorization(),
  pickHandler('CategoryController@deleteCategory')
)

export default router
