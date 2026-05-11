import { IBranch } from "@/lib/types"
import { Schema, models, model } from "mongoose"

const Branch = new Schema<IBranch>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.Branch || model<IBranch>("Branch", Branch)
