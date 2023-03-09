export interface Order {
  date?: Date
  order?: number
  user?: string
  list: OrderPosition[]
  _id?: string
}

export interface OrderPosition {
  name: string
  quantity: number
  cost: number
  _id?: string
}
