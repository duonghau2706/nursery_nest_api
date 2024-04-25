import { UserService } from '@/services'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import * as dotenv from 'dotenv'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()

export default class UserController {
  constructor() {
    this.response = ResponseUtils
  }

  async getUserByEmail(req, res, next) {
    try {
      const users = await UserService.getUserByEmail(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, users))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getAllUser(req, res, next) {
    try {
      const users = await UserService.getAllUser(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, users))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getUserById(req, res, next) {
    try {
      const users = await UserService.getUserById(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, users))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async createUser(req, res, next) {
    try {
      const users = await UserService.createUser(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, users))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async updateUser(req, res, next) {
    try {
      const users = await UserService.updateUser(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, users))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async deleteUser(req, res, next) {
    try {
      const users = await UserService.deleteUser(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, users))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }
}
