import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'
const router = Router()

router.post(
  '/get-all',
  authorization(),
  pickHandler('DashBoardController@getAllDb')
)

export default router
