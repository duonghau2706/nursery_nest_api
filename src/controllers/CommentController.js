import CommentService from '@/services/CommentService'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import * as dotenv from 'dotenv'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()

export default class CommentController {
  constructor() {
    this.response = ResponseUtils
  }

  async getAll(req, res, next) {
    try {
      const data = await CommentService.getAll(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getCommentById(req, res, next) {
    try {
      const data = await CommentService.getCommentById(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async createComment(req, res, next) {
    try {
      const data = await CommentService.createComment(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async updateComment(req, res, next) {
    try {
      const data = await CommentService.updateComment(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async deleteComment(req, res, next) {
    try {
      const data = await CommentService.deleteComment(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }
}
