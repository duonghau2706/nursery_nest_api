import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'
import { element as elementPaginate } from '@/helpers/paginate'

import { Op } from 'sequelize'
import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'
import { CommentModel, UserModel } from '@/models'

dotenv.config()

const logger = log4js.getLogger()
class CommentService {
  constructor() {
    this.result = ResponseUtils
    this.commentModel = CommentModel
  }

  async getAll(req) {
    const limitInput = req?.query?.perPage
    const pageInput = req?.query?.currentPage
    const product_id = req?.query?.product_id
    const user_id = req?.query?.user_id
    const product_name = req?.query?.product_name
    const user_name = req?.query?.user_name

    try {
      let sql = `select c.*, u.name as user_name, p.name as product_name from comments as c
        left join products as p on c.product_id = p.id
        left join users as u on c.user_id = u.id where 1=1`

      if (product_id?.trim()?.length > 0) {
        sql += ` and c.product_id='${product_id}'`
      }

      if (user_id?.trim()?.length > 0) {
        sql += ` and c.user_id='${user_id}'`
      }

      if (product_name?.trim()?.length > 0) {
        sql += ` and p.name='${product_name}'`
      }

      if (user_name?.trim()?.length > 0) {
        sql += ` and u.name='${user_name}'`
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
        listComment: getData,
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

  async getCommentById(req) {
    const commentId = req?.query?.commentId

    try {
      const res = await this.commentModel.findOne({ where: { id: commentId } })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async createComment(req) {
    try {
      const res = await this.commentModel.create(req?.body)

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async updateComment(req) {
    const id = req?.body?.id

    try {
      const res = await this.commentModel.update(req?.body, { where: { id } })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async deleteComment(req) {
    const listId = req?.body?.listId

    try {
      const res = await this.commentModel.destroy({
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

export default new CommentService()
