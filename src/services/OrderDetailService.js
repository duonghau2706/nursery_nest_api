import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'

dotenv.config()

const logger = log4js.getLogger()
class OrderDetailService {
  constructor() {
    this.result = ResponseUtils
  }

  async createOrderDetail(req) {
    // const userId = req?.query?.userId
    const id = req?.body?.id
    const orderId = req?.body?.orderId
    const productId = req?.body?.productId
    const quantity = req?.body?.quantity
    const createdAt = req?.body?.createdAt
    const updatedAt = req?.body?.updatedAt

    try {
      const sql = `insert into
    order_details (
        id,
        order_id,
        product_id,
        quantity,
        created_at,
        updated_at
    )
    values (
        '${id}',
        '${orderId}',
        '${productId}',
        ${quantity},
        '${createdAt}',
        '${updatedAt}'
    )`
      console.log('sql', sql)
      const orderDetail = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
      })

      return this.result(200, true, Message.SUCCESS, {
        orderId,
      })
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getByOrderId(req) {
    const orderId = req?.query?.orderId

    try {
      const sql = `select
        o.*,
        o.name as user_name,
        od.product_id,
        od.quantity,
        p.name,
        p.img,
        p.original_price,
        od.quantity * p.original_price as amount
    from
        order_details as od
        left join orders as o on od.order_id = o.id
        left join products as p on od.product_id = p.id
    where
        order_id = '${orderId}'`
      const orderDetail = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
      })

      return this.result(200, true, Message.SUCCESS, camelcaseKeys(orderDetail))
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }
}

export default new OrderDetailService()
