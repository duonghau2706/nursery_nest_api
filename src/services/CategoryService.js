import { element as elementPaginate } from '@/helpers/paginate'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

import { sequelize } from '@/helpers/connection'
import { CategoryModel } from '@/models'
import * as dotenv from 'dotenv'
import { Op, QueryTypes } from 'sequelize'

dotenv.config()

const logger = log4js.getLogger()
class CategoryService {
  constructor() {
    this.result = ResponseUtils
    this.categoryModel = CategoryModel
  }

  async getAll(req) {
    const limitInput = req?.query?.perPage
    const pageInput = req?.query?.currentPage
    const name = req?.query?.name

    try {
      let sql = 'select * from categories where 1=1'

      if (name?.trim()?.length > 0) {
        sql += ` and name='${name}'`
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
        listCategory: getData,
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

  async getCategoryById(req) {
    const categoryId = req?.query?.categoryId

    try {
      const res = await this.categoryModel.findOne({
        where: { id: categoryId },
      })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async createCategory(req) {
    try {
      console.log('req', req?.body)
      const res = await this.categoryModel.create(req?.body)

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async updateCategory(req) {
    const id = req?.body?.id

    try {
      const res = await this.categoryModel.update(req?.body, { where: { id } })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async deleteCategory(req) {
    const listId = req?.body?.listId

    try {
      const res = await this.categoryModel.destroy({
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

export default new CategoryService()
