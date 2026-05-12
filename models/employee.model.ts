import { EmployeeStatus, IEmployee, Role } from "@/lib/types"
import { Schema, models, model } from "mongoose"

const Employee = new Schema<IEmployee>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
    },
    employeeNo: {
      type: String,
      unique: true,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(EmployeeStatus),
      default: EmployeeStatus.ACTIVE,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    jobPositionId: {
      type: Schema.Types.ObjectId,
      ref: "Job_Position",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.Employee || model<IEmployee>("Employee", Employee)
