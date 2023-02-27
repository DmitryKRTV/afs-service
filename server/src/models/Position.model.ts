import { model, Schema, Types } from "mongoose"

interface Position {
  name: string;
  cost: number;
  category: Types.ObjectId;
  user: Types.ObjectId;
}

const positionSchema = new Schema<Position>({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
})

export const Position = model<Position>("positions", positionSchema)
