import { IDepartment } from "@/lib/types"
import { Schema, models, model } from "mongoose"

const Department = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
)

export default models.Department || model<IDepartment>("Department", Department)
