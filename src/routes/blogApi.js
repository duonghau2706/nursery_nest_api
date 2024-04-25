import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'

const router = Router()

router.post(
  '/create',
  authorization(),
  pickHandler('BlogController@createBlog')
)

router.get(
  '/get-all-blog',
  authorization(),
  pickHandler('BlogController@getAll')
)

router.get('/get-by-id', authorization(), pickHandler('BlogController@getById'))

router.get('/get-info', authorization(), pickHandler('BlogController@getInfo'))

router.post(
  '/update-blog',
  authorization(),
  pickHandler('BlogController@updateBlog')
)

router.post(
  '/delete-blog',
  authorization(),
  pickHandler('BlogController@deleteBlog')
)

router.post(
  '/upload',
  authorization(),
  pickHandler('BlogController@uploadBlog')
)

export default router
