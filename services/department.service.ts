import { departmentMapper } from "@/lib/mappers"
import { IDepartment, IDepartmentInput } from "@/lib/types"
import Department from "@/models/department.model"
import { CreateDepartmentSchema, UpdateDepartmentSchema } from "@/validators/department.validator"
import { Types } from "mongoose"

export class DepartmentService {
  // Queries
  async getDepartmentById(id: string) {
    const department = await Department.findById(id).lean()
    if (!department) throw new Error("Department is not found.")
    return departmentMapper(department)
  }
  async getAllDepartments(page: number, limit: number) {
    const [result] = await Department.aggregate([
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
      items: result.data.map((item: IDepartment) => departmentMapper(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
  // Mutations
  async createDepartment(input: IDepartmentInput) {
    const validated = CreateDepartmentSchema.parse(input)
    const [nameAlreadyExists] = await Promise.all([
      Department.exists({ name: input.name }),
    ])
    if (nameAlreadyExists) throw new Error("Department name already exists.")
    const department = await Department.create(validated)
    return departmentMapper(department)
  }
  async updateDepartment(id: string, input: IDepartmentInput) {
    const validated = UpdateDepartmentSchema.parse(input)
    const [nameAlreadyExists] = await Promise.all([
      Department.exists({ name: input.name, _id: { $ne: new Types.ObjectId(id) } }),
    ])
    if (nameAlreadyExists) throw new Error("Department name already exists.")
    const department = await Department.findByIdAndUpdate(id, validated, {
      returnDocument: "after"
    })
    if (!department) throw new Error("Department is not found.")
    return departmentMapper(department)
  }
  async updateDepartmentStatus(id: string) {
    const isActive = await Department.findById(id).select("-_id isActive").then(res => res.isActive).catch(e => { throw Error("Department is not found.") })
    const department = await Department.findByIdAndUpdate(id, {
      isActive: !isActive
    }, {
      returnDocument: "after"
    })
    if (!department) throw new Error("Department is not found.")
    return departmentMapper(department)
  }
} 