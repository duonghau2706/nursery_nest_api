import express from 'express'

import ejs from 'ejs'
import path from 'path'
// import contactInforRouter from './contactInforApi'
// import customerRouter from './customerApi'
// import CustomerResourceRouter from './customerResourceApi'
import dashBoardRouter from './dashBoardApi'
// import inquiryApi from './inquiryApi'
import loginRouter from './loginApi'
import movieRouter from './movieApi'
import registerRouter from './registerApi'
import pdfRouter from './reportPdf'
// import salekitRouter from './salekitApi'
import sendMailRouter from './sendMailApi'
// import sharepointRouter from './sharepointApi'
// import templateRouter from './templateApi'
import transactionHistoriesRouter from './transactionHistoriesApi'
import userRouter from './userApi'
import productRouter from './productApi'
import cartRouter from './cartApi'
import discountRouter from './discountApi'
import orderRouter from './orderApi'
import orderDetailRouter from './orderDetailApi'
import blogRouter from './blogApi'
import categoryRouter from './categoryApi'
import commentRouter from './commentApi'

const router = express.Router()

// router.use('', helperRouter)
// router.use('/ms-teams', msTeamsRouter)
router.use('/report', pdfRouter)
router.use('/dash-board', dashBoardRouter)
router.use('/comment', commentRouter)
router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/blog', blogRouter)
router.use('/order-detail', orderDetailRouter)
router.use('/order', orderRouter)
router.use('/cart', cartRouter)
router.use('/product', productRouter)
router.use('/discount', discountRouter)

router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/movie', movieRouter)
router.use('/transaction-histories', transactionHistoriesRouter)

router.post('/render-ejs-revenue', (req, res) => {
  const listRevenue = req?.body?.listRevenue
  const startRevenue = req?.body?.startRevenue
  const endRevenue = req?.body?.endRevenue
  const curDay = req?.body?.curDay
  const curMonth = req?.body?.curMonth
  const curYear = req?.body?.curYear
  const name = req?.body?.name

  const filePath = path.join(__dirname, '..', 'view', 'revenue.ejs')
  ejs.renderFile(
    filePath,
    {
      data: listRevenue || [],
      start: startRevenue || 'trước',
      end: endRevenue || 'hiện tại',
      curDay,
      curMonth,
      curYear,
      name,
    },
    (err, data) => {
      if (err) {
        return res.send('Loi roi huhu')
      }
      // return res.render(filePath, { data: 'hihi' })
      return res.send(data)
    }
  )
})

router.post('/render-ejs-revenue-category', (req, res) => {
  const listRevenueCate = req?.body?.listRevenueCate
  const startCate = req?.body?.startCate
  const endCate = req?.body?.endCate
  const curDay = req?.body?.curDay
  const curMonth = req?.body?.curMonth
  const curYear = req?.body?.curYear
  const name = req?.body?.name

  const filePath = path.join(__dirname, '..', 'view', 'revenueCategory.ejs')
  ejs.renderFile(
    filePath,
    {
      data: listRevenueCate || [],
      start: startCate || 'trước',
      end: endCate || 'hiện tại',
      curDay,
      curMonth,
      curYear,
      name,
    },
    (err, data) => {
      if (err) {
        return res.send('Loi roi huhu')
      }
      // return res.render(filePath, { data: 'hihi' })
      return res.send(data)
    }
  )
})

router.post('/render-ejs-movie', (req, res) => {
  const listMovie = req?.body?.listMovie
  const startMovie = req?.body?.startMovie
  const endMovie = req?.body?.endMovie
  const curDay = req?.body?.curDay
  const curMonth = req?.body?.curMonth
  const curYear = req?.body?.curYear
  const name = req?.body?.name

  const filePath = path.join(__dirname, '..', 'view', 'movie.ejs')
  ejs.renderFile(
    filePath,
    {
      data: listMovie || [],
      start: startMovie || 'trước',
      end: endMovie || 'hiện tại',
      curDay,
      curMonth,
      curYear,
      name,
    },
    (err, data) => {
      if (err) {
        return res.send('Loi roi huhu movie')
      }
      // return res.render(filePath, { data: 'hihi' })
      return res.send(data)
    }
  )
})

// router.use('/template', templateRouter)
// router.use('/customer', customerRouter)
// router.use('/inquiry', inquiryApi)
router.use('/send-mail', sendMailRouter)
// router.use('/customer-resource', CustomerResourceRouter)
// router.use('/contact-infor', contactInforRouter)
// router.use('/sharepoint', sharepointRouter)
// router.use('/salekit', salekitRouter)

export default router
