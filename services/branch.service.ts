import { IBranchInput } from "@/lib/types"
import Branch from "@/models/branch.model"
import { CreateBranchSchema } from "@/validators/branch.validator"

export class BranchService {
  // Queries
  async getBranchById(id: string) {
    const branch = await Branch.findById(id).lean()
    if (!branch) throw new Error("Branch not found.")
    return branch
  }
  // Mutations
  async createBranch(input: IBranchInput) {
    const validated = CreateBranchSchema.parseAsync(input)
    const [nameAlreadyExists] = await Promise.all([
      await Branch.find({ name: input.name }),
      await Branch.find({ code: input.code })
    ])
    if (nameAlreadyExists) throw new Error("Branch name already exists")

    const branch = await Branch.create(validated)
  }
} 