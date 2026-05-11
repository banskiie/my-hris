import { branchMapper } from "@/lib/mappers"
import { IBranch, IBranchInput } from "@/lib/types"
import Branch from "@/models/branch.model"
import { CreateBranchSchema, UpdateBranchSchema } from "@/validators/branch.validator"
import { Types } from "mongoose"

export class BranchService {
  // Queries
  async getBranchById(id: string) {
    const branch = await Branch.findById(id).lean()
    if (!branch) throw new Error("Branch is not found.")
    return branchMapper(branch)
  }
  async getAllBranches(page: number, limit: number) {
    const [result] = await Branch.aggregate([
      {
        $facet: {
          data: [{
            $skip: (page - 1) * limit
          },
          {
            $limit: limit
          }],
          totalCount: [
            { $count: "count" }
          ],
        }
      }
    ])
    const total = result.totalCount[0].count
    return {
      items: result.data.map((item: IBranch) => branchMapper(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
  // Mutations
  async createBranch(input: IBranchInput) {
    const validated = CreateBranchSchema.parse(input)
    const [nameAlreadyExists, codeAlreadyExists] = await Promise.all([
      Branch.exists({ name: input.name }),
      Branch.exists({ code: input.code })
    ])
    if (nameAlreadyExists) throw new Error("Branch name already exists.")
    if (codeAlreadyExists) throw new Error("Branch code already exists.")
    const branch = await Branch.create(validated)
    return branchMapper(branch)
  }
  async updateBranch(id: string, input: IBranchInput) {
    const validated = UpdateBranchSchema.parse(input)
    const [nameAlreadyExists, codeAlreadyExists] = await Promise.all([
      Branch.exists({ name: input.name, _id: { $ne: new Types.ObjectId(id) } }),
      Branch.exists({ code: input.code, _id: { $ne: new Types.ObjectId(id) } })
    ])
    if (nameAlreadyExists) throw new Error("Branch name already exists.")
    if (codeAlreadyExists) throw new Error("Branch code already exists.")
    const branch = await Branch.findByIdAndUpdate(id, validated, {
      returnDocument: "after"
    })
    if (!branch) throw new Error("Branch is not found.")
    return branchMapper(branch)
  }
  async updateBranchStatus(id: string) {
    const isActive = await Branch.findById(id).select("-_id isActive").then(res => res.isActive).catch(e => { throw Error("Branch is not found.") })
    const branch = await Branch.findByIdAndUpdate(id, {
      isActive: !isActive
    }, {
      returnDocument: "after"
    })
    if (!branch) throw new Error("Branch is not found.")
    return branchMapper(branch)
  }
} 