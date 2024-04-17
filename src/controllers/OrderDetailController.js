import OrderDetailService from '@/services/OrderDetailService'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import * as dotenv from 'dotenv'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()

export default class OrderDetailController {
  constructor() {
    this.response = ResponseUtils
  }

  async createOrderDetail(req, res, next) {
    try {
      const orderDetail = await OrderDetailService.createOrderDetail(req)
      res
        .status(200)
        .json(this.response(200, Message.SUCCESS, null, orderDetail))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getByOrderId(req, res, next) {
    try {
      const orderDetail = await OrderDetailService.getByOrderId(req)
      res
        .status(200)
        .json(this.response(200, Message.SUCCESS, null, orderDetail))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }
}
