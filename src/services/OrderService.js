import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'
import { element as elementPaginate } from '@/helpers/paginate'

import { Op } from 'sequelize'
import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'
import { OrderModel } from '@/models'

dotenv.config()

const logger = log4js.getLogger()
class OrderService {
  constructor() {
    this.result = ResponseUtils
    this.orderModel = OrderModel
  }

  async getAllOrder(req) {
    const limitInput = req?.query?.perPage
    const pageInput = req?.query?.currentPage
    const orderCode = req?.query?.orderCode
    const name = req?.query?.name
    const phone = req?.query?.phone
    const discountCode = req?.query?.discountCode
    const statusMoney = req?.query?.statusMoney
    const statusShip = req?.query?.statusShip

    try {
      let sql =
        'select o.*, d.code as discount_code from orders as o left join discounts as d on o.discount_id = d.id where 1=1'

      if (orderCode?.trim()?.length > 0) {
        sql += ` and o.order_code='${orderCode}'`
      }

      if (name?.trim()?.length > 0) {
        sql += ` and o.name='${name}'`
      }

      if (phone?.trim()?.length > 0) {
        sql += ` and o.phone='${phone}'`
      }

      if (discountCode?.trim()?.length > 0) {
        sql += ` and d.discount_code='${discountCode}'`
      }

      if (statusMoney?.trim()?.length > 0) {
        sql += ` and o.status_money=${statusMoney}`
      }

      if (statusShip?.trim()?.length > 0) {
        sql += ` and o.status_ship=${statusShip}`
      }

      let getData = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
      })

      let totalPageRes = 1
      let pageRes = pageInput
      let total = getData?.length

      if (limitInput || pageInput) {
        const { totalPage, page, offset } = elementPaginate({
          totalRecord: getData?.length,
          page: pageInput,
          limit: limitInput,
        })

        totalPageRes = totalPage
        pageRes = page

        getData = await sequelize.query(
          sql + ` LIMIT ${limitInput} OFFSET ${offset}`,
          { type: QueryTypes.SELECT }
        )
      }

      const dataRes = {
        listOrder: getData,
        pagination: {
          totalPageRes: +totalPageRes,
          pageRes: +pageRes,
          total: +total,
        },
      }

      return this.result(200, true, Message.SUCCESS, dataRes)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
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

  async getOrderById(req) {
    const orderId = req?.query?.orderId

    try {
      const res = await this.orderModel.findOne({ where: { id: orderId } })

      return this.result(200, true, Message.SUCCESS, res)
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

  async updateOrder(req) {
    const id = req?.body?.id

    try {
      const res = await this.orderModel.update(req?.body, { where: { id } })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async deleteOrder(req) {
    const listId = req?.body?.listId

    try {
      const res = await this.orderModel.destroy({
        where: {
          id: {
            [Op.in]: listId,
          },
        },
      })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }
}

export default new OrderService()
