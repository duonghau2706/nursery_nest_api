import { Message } from '@/utils/Message'
import ResponseUtils from '@/utils/ResponseUtils'
import log4js from 'log4js'

import { sequelize } from '@/helpers/connection'
import dayjs from 'dayjs'
import * as dotenv from 'dotenv'
import { QueryTypes } from 'sequelize'

dotenv.config()

const logger = log4js.getLogger()
class DashBroadService {
  constructor() {
    this.result = ResponseUtils
  }

  async getAllDb(req) {
    const startRevenue = req?.query?.startRevenue
    const endRevenue = req?.query?.endRevenue
    const startCate = req?.query?.startCate
    const endCate = req?.query?.endCate
    const startCatePrev = dayjs(req?.query?.startCate).subtract(1, 'month')
    const endCatePrev = dayjs(req?.query?.endCate).subtract(1, 'month')

    try {
      const cardSql = `select
        sum(total_money) as total_income,
        count(*) as total_sale,
        sum(
            case
                when status_money = 1 then 1
                else 0
            end
        ) as payment,
        sum(
            case
                when status_money = 0 then 1
                else 0
            end
        ) as unpayment,
        sum(
            case
                when status_ship = 1 then 1
                else 0
            end
        ) as ship,
        sum(
            case
                when status_ship = 0 then 1
                else 0
            end
        ) as unship
    from
        orders`

      const getCard = await sequelize.query(cardSql, {
        type: QueryTypes.SELECT,
      })

      let revenueSql = `SELECT
          EXTRACT(
              month
              from
                  created_at
          ) as month,
          sum(total_money) as revenue
      from
          orders
      where 1 = 1 `

      if (startRevenue) {
        revenueSql += ` and
          created_at
           >= '${startRevenue}'`
      }

      if (endRevenue) {
        revenueSql += ` and
          created_at
          <= '${endRevenue}'`
      }

      revenueSql += ` group by
          EXTRACT(
              month
              from
                  created_at
          )
      order by
          EXTRACT(
              month
              from
                  created_at
          )`

      const getRevenue = await sequelize.query(revenueSql, {
        type: QueryTypes.SELECT,
      })

      let revenueByCateSql = `select
    c.name,
    sum(od.quantity * original_price) as revenue_by_category
from
    order_details as od
    left join products as p on od.product_id = p.id
    left join categories as c on p.category_id = c.id
where 1 = 1 `

      if (startRevenue) {
        revenueByCateSql += ` and
           od.created_at
          >= '${startRevenue}'`
      }
      if (endRevenue) {
        revenueByCateSql += ` and
          od.created_at
          >= '${endRevenue}'`
      }
      revenueByCateSql += `group by
    c.id`

      const getRevenueByCategory = await sequelize.query(revenueByCateSql, {
        type: QueryTypes.SELECT,
      })

      let dataTableRevenueSql = `select
          EXTRACT(
              month
              from
                  od.created_at
          ) as mo,
          EXTRACT(
              year
              from
                  od.created_at
          ) as ye,
          count(*) as quantity_order,
          sum(od.quantity * original_price) as original_revenue,
          sum(
              od.quantity * original_price * COALESCE(d.sale, 0)
          ) as total_discount,
          sum(COALESCE(o.ship, 0)) as total_ship,
          sum(
              od.quantity * original_price * (1 - COALESCE(d.sale, 0)) + COALESCE(o.ship, 0)
          ) as total_revenue
      from
          order_details as od
          left join products as p on od.product_id = p.id
          left join orders as o on od.order_id = o.id
          left join discounts as d on o.discount_id = d.id
      where
          1 = 1 `
      if (startRevenue) {
        dataTableRevenueSql += ` and 
          od.created_at
           >= '${startRevenue}'`
      }

      if (endRevenue) {
        dataTableRevenueSql += ` and 
         od.created_at
           <= '${endRevenue}'`
      }

      dataTableRevenueSql += ` group by
          EXTRACT(
              month
              from
                  od.created_at
          ),
          EXTRACT(
              year
              from
                  od.created_at
          )`

      dataTableRevenueSql += ` order by ye, mo`

      const getDataTableRevenueSql = await sequelize.query(
        dataTableRevenueSql,
        {
          type: QueryTypes.SELECT,
        }
      )

      // let dataTableRevenueCategorySql = `select
      //     c.name,
      //     count(*) as quantity_order,
      //     sum(p.original_price * od.quantity) as total_revenue
      // from
      //     order_details as od
      //     left join products as p on od.product_id = p.id
      //     left join categories as c on p.category_id = c.id
      // where
      //     1 = 1`

      // if (startCate) {
      //   dataTableRevenueCategorySql += ` and od.created_at >= '${startCate}'`
      // }

      // if (endCate) {
      //   dataTableRevenueCategorySql += ` and od.created_at <= '${endCate}'`
      // }

      // dataTableRevenueCategorySql += ` group by
      //     c.name`

      let dataTableRevenueCategorySql = `with current_revenue as (
    select
        c.name,
        count(*) as quantity_order,
        sum(p.original_price * od.quantity) as total_revenue
    from
        order_details as od
        left join products as p on od.product_id = p.id
        left join categories as c on p.category_id = c.id
    where
        1 = 1 `

      if (startCate) {
        dataTableRevenueCategorySql += ` and od.created_at >= '${startCate}'`
      }

      if (endCate) {
        dataTableRevenueCategorySql += ` and od.created_at <= '${endCate}'`
      }

      dataTableRevenueCategorySql += ` group by
        c.name
),
previous_revenue as (
    select
        c.name,
        count(*) as quantity_order,
        sum(p.original_price * od.quantity) as total_revenue
    from
        order_details as od
        left join products as p on od.product_id = p.id
        left join categories as c on p.category_id = c.id
    where
        1 = 1 `

      if (startCatePrev) {
        dataTableRevenueCategorySql += ` and od.created_at >= '${startCatePrev}'`
      }

      if (endCatePrev) {
        dataTableRevenueCategorySql += ` and od.created_at <= '${endCatePrev}'`
      }

      dataTableRevenueCategorySql += ` group by
        c.name
),
revenue_change AS (
    SELECT
        cr.name,
        cr.quantity_order,
        cr.total_revenue,
        CASE
            WHEN pr.total_revenue = 0 THEN NULL
            ELSE (cr.total_revenue - pr.total_revenue) / pr.total_revenue * 100
        END AS revenue_change_percentage
    FROM
        current_revenue cr
        LEFT JOIN previous_revenue pr ON cr.name = pr.name
)
select
    name,
    quantity_order,
    total_revenue,
    ROUND(revenue_change_percentage, 2) AS revenue_change_percentage
from
    revenue_change`

      const getDataTableRevenueCategorySql = await sequelize.query(
        dataTableRevenueCategorySql,
        {
          type: QueryTypes.SELECT,
        }
      )

      const dataRes = {
        dataCard: getCard,
        dataRevenue: getRevenue,
        dataRevenueByCategory: getRevenueByCategory,
        dataTableRevenue: getDataTableRevenueSql,
        dataTableRevenueCategory: getDataTableRevenueCategorySql,
      }

      return this.result(200, true, Message.SUCCESS, dataRes)
    } catch (error) {
      throw error
    }
  }
}

export default new DashBroadService()
