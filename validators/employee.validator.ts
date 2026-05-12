import Employee from "@/models/employee.model"
import { EmployeeStatus, Role } from "@/lib/types"
import { z } from "zod"

export const CreateEmployeeSchema = z.object({
  firstName: z.string().nonempty("First name must not be empty."),
  lastName: z.string().nonempty("Last name must not be empty."),
  role: z.enum(Object.values(Role), "Please select a valid role."),
  employeeNo: z.string().nonempty("Employee no. must not be empty."),
  birthday: z.coerce.date("Invalid birthday."),
  branchId: z.string().nonempty("Branch must not be empty."),
  jobPositionId: z.string().nonempty("Job Position must not be empty."),
})

export const UpdateEmployeeSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(Object.values(Role), "Please select a valid role.").optional(),
  employeeNo: z.string().optional(),
  birthday: z.coerce.date().optional(),
  branchId: z.string().optional(),
  jobPositionId: z.string().optional(),
})
