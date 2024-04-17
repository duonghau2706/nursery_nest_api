import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'

dotenv.config()

const logger = log4js.getLogger()
class DiscountService {
  constructor() {
    this.result = ResponseUtils
  }

  async getDiscountByCode(req) {
    // const userId = req?.query?.userId
    const code = req?.query?.code

    try {
      const discountSql = `SELECT * from discounts where code = '${code}'`
      const discount = await sequelize.query(discountSql, {
        type: QueryTypes.SELECT,
      })

      console.log('discount', discount)

      return this.result(200, true, Message.SUCCESS, discount)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }
}

export default new DiscountService()
