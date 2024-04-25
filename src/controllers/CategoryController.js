import CategoryService from '@/services/CategoryService'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import * as dotenv from 'dotenv'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()

export default class CategoryController {
  constructor() {
    this.response = ResponseUtils
  }

  async getAll(req, res, next) {
    try {
      const data = await CategoryService.getAll(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const data = await CategoryService.getCategoryById(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async createCategory(req, res, next) {
    try {
      const data = await CategoryService.createCategory(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async updateCategory(req, res, next) {
    try {
      const data = await CategoryService.updateCategory(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const data = await CategoryService.deleteCategory(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }
}
