import Department from "@/models/department.model"
import { z } from "zod"

export const CreateDepartmentSchema = z.object({
  name: z.string().nonempty("Name must not be empty."),
})

export const UpdateDepartmentSchema = z.object({
  name: z.string().optional(),
})
