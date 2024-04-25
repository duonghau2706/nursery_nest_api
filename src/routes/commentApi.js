import pickHandler from '@/helpers/routeHandler'
import { authorization } from '@/middlewares/auth'
import { Router } from 'express'

const router = Router()

router.get(
  '/get-all-comment',
  authorization(),
  pickHandler('CommentController@getAll')
)

router.get(
  '/get-comment-by-id',
  authorization(),
  pickHandler('CommentController@getCommentById')
)

router.post(
  '/create-comment',
  authorization(),
  pickHandler('CommentController@createComment')
)

router.post(
  '/update-comment',
  authorization(),
  pickHandler('CommentController@updateComment')
)

router.post(
  '/delete-comment',
  authorization(),
  pickHandler('CommentController@deleteComment')
)

export default router
