import CartService from '@/services/CartService'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import * as dotenv from 'dotenv'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()

export default class CartController {
  constructor() {
    this.response = ResponseUtils
  }

  async getAllCart(req, res, next) {
    try {
      const cart = await CartService.getAllCart(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, cart))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async updateCart(req, res, next) {
    try {
      const cart = await CartService.updateCart(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, cart))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async resetCart(req, res, next) {
    try {
      const cart = await CartService.resetCart(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, cart))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }
}
