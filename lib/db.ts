import mongoose from "mongoose"
import { setServers } from "node:dns/promises"

setServers(["1.1.1.1", "8.8.8.8"])

const DB_URI = process.env.DB_URI || null
const DB_NAME = process.env.DB_NAME || null
const DB_APP = process.env.DB_APP || null

export const connectDB = async () => {
  if (!DB_URI || !DB_NAME || !DB_APP)
    throw new Error("Missing database environment variables.")
  try {
    await mongoose.connect(DB_URI, {
      dbName: DB_NAME,
      appName: DB_APP,
    })
  } catch (error) {
    throw error
  }
}
