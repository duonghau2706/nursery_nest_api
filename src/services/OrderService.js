import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'

dotenv.config()

const logger = log4js.getLogger()
class OrderService {
  constructor() {
    this.result = ResponseUtils
  }

  async createOrder(req) {
    // const userId = req?.query?.userId
    const id = req?.body?.id
    const orderCode = req?.body?.orderCode
    const userId = req?.body?.userId
    const name = req?.body?.name === undefined ? null : `'${req?.body?.name}'`
    const phone =
      req?.body?.phone === undefined ? null : `'${req?.body?.phone}'`
    const totalMoney = req?.body?.totalMoney
    const discountId =
      req?.body?.discountId === undefined ? null : `'${req?.body?.discountId}'`
    const statusMoney = req?.body?.statusMoney
    const statusShip = req?.body?.statusShip
    const province =
      req?.body?.province === undefined ? null : `'${req?.body?.province}'`
    const district =
      req?.body?.district === undefined ? null : `'${req?.body?.district}'`
    const ward = req?.body?.ward === undefined ? null : `'${req?.body?.ward}'`
    const adress =
      req?.body?.adress === undefined ? null : `'${req?.body?.adress}'`
    const originalTotalMoney = req?.body?.originalTotalMoney
    const sale = req?.body?.sale
    const ship = req?.body?.ship
    const note = req?.body?.note === undefined ? null : `'${req?.body?.note}'`
    const createdAt = req?.body?.createdAt
    const updatedAt = req?.body?.updatedAt

    console.log('discountId', discountId)
    try {
      const sql = `insert into
    orders (
        id,
        user_id,
        name,
        phone,
        order_code,
        total_money,
        status_money,
        status_ship,
        discount_id,
        province,
        district,
        ward,
        adress,
        original_total_money,
        sale,
        ship,
        note,
        created_at,
        updated_at
    )
    values (
        '${id}',
        '${userId}',
        ${name},
        ${phone},
        '${orderCode}',
        ${totalMoney},
        ${statusMoney},
        ${statusMoney},
        ${discountId},
        ${province},
        ${district},
        ${ward},
        ${adress},
        ${originalTotalMoney},
        ${sale},
        ${ship},
        ${note},
        '${createdAt}',
        '${updatedAt}'
    )`

      console.log('ordersql', sql)

      const order = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
      })

      //return order id
      return this.result(200, true, Message.SUCCESS, {
        orderId: id,
        createdAt,
        updatedAt,
      })
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getOrdersByUserId(req) {
    const userId = req?.query?.userId

    try {
      const sql = `select * from orders where user_id = '${userId}' order by created_at desc`

      const order = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
      })

      return this.result(200, true, Message.SUCCESS, camelcaseKeys(order))
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }
}

export default new OrderService()
