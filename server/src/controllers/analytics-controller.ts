import { Request, Response } from 'express'
import { errorHandler } from '../utils/errorHandler'
import { Order } from '../models/Order.model'
import { hasUser } from '../utils/passportUser'
import moment from 'moment'

export const analyticsController = {
  async overview(req: Request, res: Response) {
    try {
      if (hasUser(req)) {
        const allOrders = await Order.find({ user: req.user._id }).sort('1')
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []
        // Total orders amount committed yesterday
        const totalYesterdayOrdersNumber = yesterdayOrders.length
        // Total orders amount committed since the shop has been founded
        const totalOrdersNumber = allOrders.length
        // Total days amount
        const totalDaysNumber = Object.keys(ordersMap).length
        // Total amount of orders per day
        const totalOrdersPerDay = (totalOrdersNumber / totalDaysNumber).toFixed(0)
        // Percent of orders committed yesterday to total amount of days
        const ordersYesterdayPercent = (((totalYesterdayOrdersNumber / +totalOrdersPerDay) - 1) * 100).toFixed(2)
        // Total margin since the shop has been founded
        const totalMargin = calculatePrice(allOrders)
        // Average Margin per day
        const marginPerDay = totalMargin / totalDaysNumber
        // Margin for yesterday
        const yesterdayMargin = calculatePrice(yesterdayOrders)
        // Percent of margin for yesterday to margin per day
        const marginPercent = (((yesterdayMargin / +marginPerDay) - 1) * 100).toFixed(2)
        // Comparison of margins yesterday and per day
        const compareMargin = (yesterdayMargin - marginPerDay).toFixed(2)
        // Comparison of orders' number yesterday and number of orders per day
        const compareOrdersNumber = (totalYesterdayOrdersNumber - +totalOrdersPerDay).toFixed(2)
        res.status(200).json({
          margin: {
            percent: Math.abs(+marginPercent),
            compare: Math.abs(+compareMargin),
            yesterday: +yesterdayMargin,
            isHigher: +marginPercent > 0
          },
          orders: {
            percent: Math.abs(+ordersYesterdayPercent),
            compare: Math.abs(+compareOrdersNumber),
            yesterday: totalYesterdayOrdersNumber,
            isHigher: +ordersYesterdayPercent > 0
          }
        })
      } else {
        throw new Error('Error occurred')
      }
    } catch (e) {
      errorHandler(res, e)
    }
    res.status(200).json({
      overview: true
    })
  },
  analytics(req: Request, res: Response) {
    res.status(200).json({
      analytics: true
    })
  }
}

function getOrdersMap(orders: Order[] = []): DaysOrder {
  const daysOrder: DaysOrder = {}
  orders.forEach(order => {
      const date: string = moment(order.date).format('DD.MM.YYYY')
      if (date === moment().format('DD.MM.YYYY')) {
        return
      }
      if (!daysOrder[date]) {
        daysOrder[date] = []
      }
      daysOrder[date].push(order)
    }
  )
  return daysOrder
}

interface DaysOrder {
  [key: string]: Order[];
}

function calculatePrice(orders: Order[] = []): number {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return orderTotal += item.cost * item.quantity
    }, 0)
    return total += orderPrice
  }, 0)
}