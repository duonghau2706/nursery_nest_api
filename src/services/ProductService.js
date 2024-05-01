import { element as elementPaginate } from '@/helpers/paginate'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

import { sequelize } from '@/helpers/connection'
import { ProductModel } from '@/models'
import camelcaseKeys from 'camelcase-keys'
import * as dotenv from 'dotenv'
import { Op, QueryTypes } from 'sequelize'

dotenv.config()

const logger = log4js.getLogger()
class ProductService {
  constructor() {
    this.result = ResponseUtils
    this.productModel = ProductModel
  }

  async getProductByCategory(req) {
    try {
      let sql = 'select * from products group by'

      if (name?.trim()?.length > 0) {
        sql += ` and name='${name}'`
      }

      if (category?.trim()?.length > 0) {
        sql += ` and category=${category}`
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
        listProduct: getData,
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

  async getAll(req) {
    const limitInput = req?.query?.perPage
    const pageInput = req?.query?.currentPage
    const name = req?.query?.name
    const category_id = req?.query?.category_id

    // const category = req?.query?.category

    try {
      let sql =
        'select p.*, c.name as category_name from products as p left join categories as c on p.category_id = c.id '

      if (name?.trim()?.length > 0) {
        sql += ` and p.name='${name}'`
      }

      if (category_id?.trim()?.length > 0) {
        sql += ` and p.category_id=${category_id}`
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
        listProduct: getData,
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

  async getAllProduct() {
    try {
      const allSql = `SELECT * from products`
      const getAll = await sequelize.query(allSql, {
        type: QueryTypes.SELECT,
      })

      const klmSql = `SELECT * from products WHERE category = 0`
      const getAllKLM = await sequelize.query(klmSql, {
        type: QueryTypes.SELECT,
      })

      const btcSql = `SELECT * from products WHERE category = 1`
      const getAllBTC = await sequelize.query(btcSql, {
        type: QueryTypes.SELECT,
      })

      const kkdnSql = `SELECT * from products WHERE category = 2`
      const getAllKKDN = await sequelize.query(kkdnSql, {
        type: QueryTypes.SELECT,
      })

      const knSql = `SELECT * from products WHERE category = 3`
      const getAllKN = await sequelize.query(knSql, {
        type: QueryTypes.SELECT,
      })

      const mhsSql = `SELECT * from products WHERE category = 4`
      const getAllMHS = await sequelize.query(mhsSql, {
        type: QueryTypes.SELECT,
      })

      const data = {
        all: camelcaseKeys(getAll),
        klm: camelcaseKeys(getAllKLM),
        btc: camelcaseKeys(getAllBTC),
        kkdn: camelcaseKeys(getAllKKDN),
        kn: camelcaseKeys(getAllKN),
        mhs: camelcaseKeys(getAllMHS),
      }

      return this.result(200, true, Message.SUCCESS, data)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getCommentById(req) {
    const id = req?.query?.id

    try {
      const avgRatedSql = `SELECT product_id, avg(rated) from COMMENTS where product_id = '${id}' GROUP by product_id`
      const getAvgRated = await sequelize.query(avgRatedSql, {
        type: QueryTypes.SELECT,
      })

      const lstCmtSql = `select COMMENTS.*, users.name from COMMENTS left join users on COMMENTS.user_id = users.id WHERE product_id = '${id}'`
      const getLstCmt = await sequelize.query(lstCmtSql, {
        type: QueryTypes.SELECT,
      })

      const data = {
        avgRated: getAvgRated,
        lstCmt: getLstCmt,
      }

      return this.result(200, true, Message.SUCCESS, data)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async getProductById(req) {
    const id = req?.query?.id
    try {
      const res = await this.productModel.findOne({
        where: { id },
      })

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async createProduct(req) {
    try {
      const res = await this.productModel.create(req?.body)

      return this.result(200, true, Message.SUCCESS, res)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }

  async updateProduct(req) {
    const id = req?.body?.id
    const name = req?.body?.name
    const category = req?.body?.category?.value
    const original_price = req?.body?.originalPrice
    const img = req?.body?.img
    const description = req?.body?.description
    const updated_by = req?.body?.updated_by
    const updated_at = req?.body?.updated_at

    try {
      const res = await this.productModel.update(
        {
          name,
          category,
          original_price,
          description,
          img,
          updated_at,
          updated_by,
        },
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

  async deleteProduct(req) {
    const listId = req?.body?.listId

    try {
      const res = await this.productModel.destroy({
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

  async getSortedProductByCondition(req) {
    const categoryId = req?.query?.categoryId
    const minRange = req?.query?.minRange
    const maxRange = req?.query?.maxRange
    const cmpType = req?.query?.cmpType
    const type = req?.query?.type

    try {
      let lstPrdSql = `select * from products where category_id = '${categoryId}'`

      if (minRange) {
        lstPrdSql += ` and original_price >= ${minRange}`
      }

      if (maxRange) {
        lstPrdSql += ` and original_price < ${maxRange}`
      }

      //order by
      if (cmpType) {
        lstPrdSql += ` order by ${cmpType}`
      }

      //DESC, ASC
      if (type) {
        lstPrdSql += ` ${type}`
      }

      const getLstPrd = await sequelize.query(lstPrdSql, {
        type: QueryTypes.SELECT,
      })

      return this.result(200, true, Message.SUCCESS, getLstPrd)
    } catch (error) {
      throw {
        statusCode: 400,
        message: error?.message,
      }
    }
  }
}

export default new ProductService()
