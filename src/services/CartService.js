import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'

dotenv.config()

const logger = log4js.getLogger()
class CartService {
  constructor() {
    this.result = ResponseUtils
  }

  async getAllCart(req) {
    const userId = req?.query?.userId

    try {
      const cartSql = `SELECT c.*, p.name, p.img, p.original_price, c.quantity * p.original_price as amount from carts as c left join products as p on c.product_id = p.id where user_id = '${userId}'`
      const carts = await sequelize.query(cartSql, {
        type: QueryTypes.SELECT,
      })

      const totalMoneySql = `SELECT sum(p.original_price * c.quantity) as total_money from carts as c left join products as p on c.product_id = p.id where user_id = '${userId}'`
      const totalMoney = await sequelize.query(totalMoneySql, {
        type: QueryTypes.SELECT,
      })

      const data = {
        carts: camelcaseKeys(carts),
        totalMoney: camelcaseKeys(totalMoney),
      }

      return this.result(200, true, Message.SUCCESS, data)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async updateCart(req) {
    //type = [insert, update, remove]
    const type = req?.body?.type
    const id = req?.body?.id
    const userId = req?.body?.userId
    const productId = req?.body?.productId
    const quantity = req?.body?.quantity
    const createdBy = req?.body?.createdBy
    const createAt = req?.body?.createAt
    const updatedAt = req?.body?.updatedAt

    console.log('req', req?.body)

    try {
      let cartSql
      if (type === 'insert') {
        cartSql = `insert into carts (id, user_id, product_id, quantity, created_by, created_at, updated_at) VALUES ('${id}', '${userId}', '${productId}', ${quantity}, '${createdBy}', '${createAt}', '${updatedAt}')`
      } else if (type === 'update') {
        cartSql = `update carts set quantity = ${quantity} where product_id='${productId}' and user_id = '${userId}'`
      } else {
        cartSql = `delete from carts where user_id = '${userId}' and product_id='${productId}'`
      }

      console.log('cartSql', cartSql)

      const updateCart = await sequelize.query(cartSql, {
        type: QueryTypes.SELECT,
      })

      return this.result(200, true, Message.SUCCESS, updateCart)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }
}

export default new CartService()
