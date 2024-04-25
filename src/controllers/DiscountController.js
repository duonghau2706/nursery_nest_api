import DiscountService from '@/services/DiscountService'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import * as dotenv from 'dotenv'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()

export default class DiscountController {
  constructor() {
    this.response = ResponseUtils
  }

  async create(req, res, next) {
    try {
      const discount = await DiscountService.create(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, discount))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getDiscountByCode(req, res, next) {
    try {
      const discount = await DiscountService.getDiscountByCode(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, discount))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getAll(req, res, next) {
    try {
      const discount = await DiscountService.getAll(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, discount))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getById(req, res, next) {
    try {
      const discount = await DiscountService.getById(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, discount))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async updateDiscount(req, res, next) {
    try {
      const discount = await DiscountService.updateDiscount(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, discount))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async deleteDiscount(req, res, next) {
    try {
      const data = await DiscountService.deleteDiscount(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, data))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }
}
