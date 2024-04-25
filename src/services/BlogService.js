import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'
import { element as elementPaginate } from '@/helpers/paginate'

import { Op } from 'sequelize'
import { sequelize } from '@/helpers/connection'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'
import camelcaseKeys from 'camelcase-keys'
import BlogRepository from '@/repositories/BlogRepository'
import moment from 'moment'
import { BlogModel } from '@/models'

dotenv.config()

const logger = log4js.getLogger()
class BlogService {
  constructor() {
    this.result = ResponseUtils
    this.blogModel = BlogModel
  }

  async createBlog(req) {
    try {
      const res = await BlogRepository.create(req?.body)

      return this.result(200, true, Message.SUCCESS, res)
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
    const title = req?.query?.title
    const author = req?.query?.author
    const startDate = req?.query?.startDate
    const endDate = req?.query?.endDate

    try {
      let blogSql = 'select * from blogs where 1=1'

      if (title?.trim()?.length > 0) {
        blogSql += ` and title='${title}'`
      }

      if (author?.trim()?.length > 0) {
        blogSql += ` and author='${author}'`
      }

      if (startDate?.trim()?.length > 0) {
        blogSql += ` and created_at >= '${startDate}'`
      }

      if (endDate?.trim()?.length > 0) {
        blogSql += ` and created_at <= '${endDate}'`
      }

      let getBlog = await sequelize.query(blogSql, {
        type: QueryTypes.SELECT,
      })

      let totalPageRes = 1
      let pageRes = pageInput
      let total = getBlog?.length

      if (limitInput || pageInput) {
        const { totalPage, page, offset } = elementPaginate({
          totalRecord: getBlog?.length,
          page: pageInput,
          limit: limitInput,
        })

        totalPageRes = totalPage
        pageRes = page

        getBlog = await sequelize.query(
          blogSql + ` LIMIT ${limitInput} OFFSET ${offset}`,
          { type: QueryTypes.SELECT }
        )
      }

      const dataRes = {
        listBlog: getBlog,
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
    const blogId = req?.query?.blogId

    try {
      const res = await this.blogModel.findOne({ where: { id: blogId } })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getInfo(req) {
    const title = req?.query?.title
    const author = req?.query?.author
    const startDate = req?.query?.startDate
    const endDate = req?.query?.endDate

    try {
      let sql = `select * from blogs where 1=1`

      if (title) {
        sql += ` and title='${title}'`
      }

      if (author) {
        sql += ` and author='${author}'`
      }

      if (startDate) {
        sql += ` and created_at >= '${startDate}'`
      }

      if (endDate) {
        sql += ` and created_at <= '${endDate}'`
      }

      const data = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
      })
      console.log('sql', sql)
      return this.result(200, true, Message.SUCCESS, data)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async updateBlog(req) {
    const id = req?.body?.id
    const img = req?.body?.img || ''
    const title = req?.body?.title
    const author = req?.body?.author
    const content = req?.body?.content
    const updateAt = req?.body?.updateAt
    const updateBy = req?.body?.updateBy

    try {
      const res = await this.blogModel.update(
        { id, img, title, author, content, updateAt, updateBy },
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

  async uploadBlog(req) {
    try {
      return this.result(200, true, Message.SUCCESS)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async deleteBlog(req) {
    const listId = req?.body?.listId

    try {
      const res = await this.blogModel.destroy({
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

export default new BlogService()
