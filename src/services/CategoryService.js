import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'
import BlogRepository from '@/repositories/BlogRepository'
import moment from 'moment'
import { BlogModel } from '@/models'

dotenv.config()

const logger = log4js.getLogger()
class CategoryService {
  constructor() {
    this.result = ResponseUtils
    this.blogModel = BlogModel
  }

  async getAll() {
    try {
      const sql = `SELECT * from categories`
      const getAll = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
      })

      return this.result(200, true, Message.SUCCESS, getAll)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }
}

export default new CategoryService()
