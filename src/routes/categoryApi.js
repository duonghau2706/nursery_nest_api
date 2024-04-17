import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'

const router = Router()

router.get(
  '/get-all-categories',
  authorization(),
  pickHandler('CategoryController@getAll')
)

export default router
