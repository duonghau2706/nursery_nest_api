import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'
import { element as elementPaginate } from '@/helpers/paginate'

import { Op } from 'sequelize'
import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'
import { DiscountModel } from '@/models'

dotenv.config()

const logger = log4js.getLogger()
class DiscountService {
  constructor() {
    this.result = ResponseUtils
    this.discountModel = DiscountModel
  }

  async create(req) {
    const code = req?.body?.code
    const sale = req?.body?.sale
    const created_by = req?.body?.created_by
    const created_at = req?.body?.created_at
    const updated_at = req?.body?.updated_at
    const start_date = req?.body?.startDate
    const end_date = req?.body?.endDate

    try {
      const res = await this.discountModel.create({
        code,
        sale,
        start_date,
        end_date,
        created_by,
        created_at,
        updated_at,
      })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getDiscountByCode(req) {
    // const userId = req?.query?.userId
    const code = req?.query?.code

    try {
      const discountSql = `SELECT * from discounts where code = '${code}'`
      const discount = await sequelize.query(discountSql, {
        type: QueryTypes.SELECT,
      })

      return this.result(200, true, Message.SUCCESS, discount)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getAll(req) {
    const limitInput = req?.query?.perPage
    const pageInput = req?.query?.currentPage
    const code = req?.query?.code
    const sale = req?.query?.sale
    const startDate = req?.query?.startDate
    const endDate = req?.query?.endDate

    try {
      let sql = 'select * from discounts where 1=1'

      if (code?.trim()?.length > 0) {
        sql += ` and code='${code}'`
      }

      if (sale?.trim()?.length > 0) {
        sql += ` and sale='${sale}'`
      }

      if (startDate?.trim()?.length > 0) {
        sql += ` and created_at >= '${startDate}'`
      }

      if (endDate?.trim()?.length > 0) {
        sql += ` and created_at <= '${endDate}'`
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
        listDiscount: getData,
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

  async getById(req) {
    const discountId = req?.query?.discountId

    try {
      const res = await this.discountModel.findOne({
        where: { id: discountId },
      })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async updateDiscount(req) {
    const id = req?.body?.id
    const code = req?.body?.code
    const sale = req?.body?.sale
    const startDate = req?.body?.startDate
    const endDate = req?.body?.endDate

    try {
      const res = await this.discountModel.update(
        { code, sale, start_date: startDate, end_date: endDate },
        { where: { id } }
      )

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async deleteDiscount(req) {
    const listId = req?.body?.listId

    try {
      const res = await this.discountModel.destroy({
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

export default new DiscountService()
