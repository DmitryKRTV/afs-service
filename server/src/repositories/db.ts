import mongoose from "mongoose"

export async function runDb() {
  try {
    mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.ASF_MONGODB || '')
    console.log("Connected MongoDB")
  } catch {
    console.log("MongoDB connect failed")
  }
}
