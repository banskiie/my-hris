import { IJobPosition } from "@/lib/types"
import { Schema, models, model } from "mongoose"

const JobPosition = new Schema<IJobPosition>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
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

export default models.Job_Position || model<IJobPosition>("Job_Position", JobPosition)
