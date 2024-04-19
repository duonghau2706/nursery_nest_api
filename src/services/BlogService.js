import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

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

  async getAll() {
    try {
      const res = await this.blogModel.findAll({
        order: [['updated_at', 'DESC']],
      })

      return this.result(200, true, Message.SUCCESS, res)
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

  async updateBlog(req) {
    const id = req?.body?.id
    const content = req?.body?.content
    const updateAt = req?.body?.updateAt
    const updateBy = req?.body?.updateBy

    try {
      const res = await this.blogModel.update(
        { id, content, updateAt, updateAt },
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
