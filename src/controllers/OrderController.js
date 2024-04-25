import OrderService from '@/services/OrderService'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import * as dotenv from 'dotenv'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()

export default class OrderController {
  constructor() {
    this.response = ResponseUtils
  }

  async getAllOrder(req, res, next) {
    try {
      const order = await OrderService.getAllOrder(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, order))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getOrdersByUserId(req, res, next) {
    try {
      const order = await OrderService.getOrdersByUserId(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, order))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async createOrder(req, res, next) {
    try {
      const order = await OrderService.createOrder(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, order))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async updateOrder(req, res, next) {
    try {
      const order = await OrderService.updateOrder(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, order))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const order = await OrderService.deleteOrder(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, order))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }
}
