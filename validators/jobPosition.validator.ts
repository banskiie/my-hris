import JobPosition from "@/models/jobPosition.model"
import { z } from "zod"

export const CreateJobPositionSchema = z.object({
  name: z.string().nonempty("Name must not be empty."),
  departmentId: z.string().nonempty("Department must not be empty."),
})

export const UpdateJobPositionSchema = z.object({
  name: z.string().nonempty("Name must not be empty.").optional(),
  departmentId: z.string().optional(),
})
