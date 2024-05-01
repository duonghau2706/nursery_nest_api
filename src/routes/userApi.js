import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.post('/get-user-by-email', pickHandler('UserController@getUserByEmail'))

router.get(
  '/get-all-user',
  authorization(),
  pickHandler('UserController@getAllUser')
)

router.get(
  '/get-user-by-id',
  authorization(),
  pickHandler('UserController@getUserById')
)

router.post(
  '/create-user',
  // authorization(),
  pickHandler('UserController@createUser')
)

router.post(
  '/update-user',
  authorization(),
  pickHandler('UserController@updateUser')
)

router.post(
  '/delete-user',
  authorization(),
  pickHandler('UserController@deleteUser')
)

export default router
