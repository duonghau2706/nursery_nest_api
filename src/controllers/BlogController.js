import BlogService from '@/services/BlogService'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import * as dotenv from 'dotenv'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()

export default class BlogController {
  constructor() {
    this.response = ResponseUtils
  }

  async createBlog(req, res, next) {
    try {
      const data = await BlogService.createBlog(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await BlogService.getAll()
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getById(req, res, next) {
    try {
      const data = await BlogService.getById(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async updateBlog(req, res, next) {
    try {
      const data = await BlogService.updateBlog(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async deleteBlog(req, res, next) {
    try {
      const data = await BlogService.deleteBlog(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }
}
