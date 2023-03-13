import { model, Schema, Types } from 'mongoose'

interface Order {
  date?: Date;
  order: number;
  list: Types.Array<ListItem>;
  user: Types.ObjectId;
}

interface ListItem {
  name: string;
  quantity: number;
  const: number;
}

const orderSchema = new Schema<Order>({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      cost: {
        type: Number
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})
export const Order = model<Order>('orders', orderSchema)
