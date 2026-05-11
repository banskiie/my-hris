import Branch from "@/models/branch.model"
import { z } from "zod"

export const CreateBranchSchema = z.object({
  name: z.string().nonempty("Name must not be empty."),
  code: z.string().min(2).max(20),
  address: z.string().optional(),
})

export const UpdateBranchSchema = z.object({
  name: z.string().nonempty("Name must not be empty.").optional(),
  code: z.string().min(2).max(20).optional(),
  address: z.string().optional(),
})
