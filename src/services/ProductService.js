import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'

dotenv.config()

const logger = log4js.getLogger()
class ProductService {
  constructor() {
    this.result = ResponseUtils
  }

  async getAllProduct() {
    try {
      const klmSql = `SELECT * from products WHERE category = 0`
      const getAllKLM = await sequelize.query(klmSql, {
        type: QueryTypes.SELECT,
      })

      const btcSql = `SELECT * from products WHERE category = 1`
      const getAllBTC = await sequelize.query(btcSql, {
        type: QueryTypes.SELECT,
      })

      const kkdnSql = `SELECT * from products WHERE category = 2`
      const getAllKKDN = await sequelize.query(kkdnSql, {
        type: QueryTypes.SELECT,
      })

      const knSql = `SELECT * from products WHERE category = 3`
      const getAllKN = await sequelize.query(knSql, {
        type: QueryTypes.SELECT,
      })

      const mhsSql = `SELECT * from products WHERE category = 4`
      const getAllMHS = await sequelize.query(mhsSql, {
        type: QueryTypes.SELECT,
      })

      const data = {
        klm: camelcaseKeys(getAllKLM),
        btc: camelcaseKeys(getAllBTC),
        kkdn: camelcaseKeys(getAllKKDN),
        kn: camelcaseKeys(getAllKN),
        mhs: camelcaseKeys(getAllMHS),
      }

      return this.result(200, true, Message.SUCCESS, data)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getCommentById(req) {
    const id = req?.query?.id

    try {
      const avgRatedSql = `SELECT product_id, avg(rated) from COMMENTS where product_id = '${id}' GROUP by product_id`
      const getAvgRated = await sequelize.query(avgRatedSql, {
        type: QueryTypes.SELECT,
      })

      const lstCmtSql = `select COMMENTS.*, users.name from COMMENTS left join users on COMMENTS.user_id = users.id WHERE product_id = '${id}'`
      const getLstCmt = await sequelize.query(lstCmtSql, {
        type: QueryTypes.SELECT,
      })

      const data = {
        avgRated: getAvgRated,
        lstCmt: getLstCmt,
      }

      return this.result(200, true, Message.SUCCESS, data)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getProductById(req) {
    const id = req?.query?.id
    console.log('req')

    try {
      const prdSql = `SELECT * from products where id = '${id}'`
      const getProductById = await sequelize.query(prdSql, {
        type: QueryTypes.SELECT,
      })

      return this.result(
        200,
        true,
        Message.SUCCESS,
        camelcaseKeys(getProductById)
      )
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getSortedProductByCondition(req) {
    const typeOfCategory = req?.query?.typeOfCategory
    const minRange = req?.query?.minRange
    const maxRange = req?.query?.maxRange
    const cmpType = req?.query?.cmpType
    const type = req?.query?.type

    console.log('iih', typeOfCategory, type)

    try {
      let lstPrdSql = `select * from products where category = ${typeOfCategory}`

      if (minRange) {
        lstPrdSql += ` and original_price >= ${minRange}`
      }

      if (maxRange) {
        lstPrdSql += ` and original_price < ${maxRange}`
      }

      if (cmpType) {
        lstPrdSql += ` order by ${cmpType}`
      }

      if (type) {
        lstPrdSql += ` ${type}`
      }

      console.log('lstPrdSql', lstPrdSql)

      const getLstPrd = await sequelize.query(lstPrdSql, {
        type: QueryTypes.SELECT,
      })

      return this.result(200, true, Message.SUCCESS, camelcaseKeys(getLstPrd))
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }
}

export default new ProductService()
