import { model, Schema, Types } from "mongoose"

interface Category {
  name: string;
  imageSrc?: string;
  user: Types.ObjectId;
}

const categorySchema = new Schema<Category>({
  name: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    default: "",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
})

export const Category = model<Category>("categories", categorySchema)
