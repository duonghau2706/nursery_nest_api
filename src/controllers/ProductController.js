import ProductService from '@/services/ProductService'
import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import * as dotenv from 'dotenv'
import log4js from 'log4js'

dotenv.config()
const logger = log4js.getLogger()

export default class ProductController {
  constructor() {
    this.response = ResponseUtils
  }

  async getProductByCategory(req, res, next) {
    try {
      const lstPrd = await ProductService.getProductByCategory()
      res.status(200).json(this.response(200, Message.SUCCESS, null, lstPrd))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getAllProduct(req, res, next) {
    try {
      const lstPrd = await ProductService.getAllProduct()
      res.status(200).json(this.response(200, Message.SUCCESS, null, lstPrd))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getAll(req, res, next) {
    try {
      const lstPrd = await ProductService.getAll(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, lstPrd))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async createProduct(req, res, next) {
    try {
      const lstPrd = await ProductService.createProduct(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, lstPrd))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async updateProduct(req, res, next) {
    try {
      const lstPrd = await ProductService.updateProduct(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, lstPrd))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const lstPrd = await ProductService.deleteProduct(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, lstPrd))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getCommentById(req, res, next) {
    try {
      const lstCmt = await ProductService.getCommentById(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, lstCmt))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getProductById(req, res, next) {
    try {
      const prd = await ProductService.getProductById(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, prd))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }

  async getSortedProductByCondition(req, res, next) {
    try {
      const lstPrd = await ProductService.getSortedProductByCondition(req)
      res.status(200).json(this.response(200, Message.SUCCESS, null, lstPrd))
    } catch (error) {
      console.log(error)
      res.status(400).json(this.response(400, error.message, null))
    }
  }
}
