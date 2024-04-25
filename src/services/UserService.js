import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'
import { element as elementPaginate } from '@/helpers/paginate'

import { Op } from 'sequelize'
import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'
import { UserModel } from '@/models'

dotenv.config()

const logger = log4js.getLogger()
class UserService {
  constructor() {
    this.result = ResponseUtils
    this.userModel = UserModel
  }

  async getAllUser(req) {
    const limitInput = req?.query?.perPage
    const pageInput = req?.query?.currentPage
    const name = req?.query?.name
    const email = req?.query?.email
    const phone = req?.query?.phone

    try {
      let sql = 'select * from users where 1=1'

      if (name?.trim()?.length > 0) {
        sql += ` and name='${name}'`
      }

      if (email?.trim()?.length > 0) {
        sql += ` and email='${email}'`
      }

      if (phone?.trim()?.length > 0) {
        sql += ` and phone='${phone}'`
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
        listUser: getData,
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

  async getUserById(req) {
    const userId = req?.query?.userId

    try {
      const res = await this.userModel.findOne({ where: { id: userId } })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async createUser(req) {
    try {
      const res = await this.userModel.create(req?.body)

      return this.result(200, true, Message.SUCCESS, res)
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
      const res = await this.userModel.findOne({
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

  async updateUser(req) {
    const id = req?.body?.id

    try {
      const res = await this.userModel.update(req?.body, { where: { id } })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async deleteUser(req) {
    const listId = req?.body?.listId

    try {
      const res = await this.userModel.destroy({
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

export default new UserService()
