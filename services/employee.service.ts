import { employeeMapper } from "@/lib/mappers"
import { IEmployee, IEmployeeInput, IPopulatedEmployee } from "@/lib/types"
import Employee from "@/models/employee.model"
import {
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
} from "@/validators/employee.validator"
import { Types } from "mongoose"

export class EmployeeService {
  // Queries
  async getEmployeeById(id: string) {
    const employee = await Employee.findById(id)
      .populate("branchId jobPositionId")
      .lean()
    if (!employee) throw new Error("Employee is not found.")
    return employeeMapper(employee)
  }
  async getAllEmployees(page: number, limit: number) {
    const [result] = await Employee.aggregate([
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "branches",
                localField: "branchId",
                foreignField: "_id",
                as: "branch",
              },
            },
            {
              $unwind: "$branch",
            },
            {
              $lookup: {
                from: "job_positions",
                localField: "jobPositionId",
                foreignField: "_id",
                as: "jobPosition",
              },
            },
            {
              $unwind: "$jobPosition",
            },
            {
              $addFields: {
                branch: "$branch",
                jobPosition: "$jobPosition",
              },
            },
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ])
    const total = result.totalCount[0].count
    return {
      items: result.data.map((item: IPopulatedEmployee) =>
        employeeMapper(item)
      ),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }
  // Mutations
  async createEmployee(input: IEmployeeInput) {
    const validated = CreateEmployeeSchema.parse(input)
    const [empNoAlreadyExists] = await Promise.all([
      Employee.exists({ employeeNo: input.employeeNo }),
    ])
    if (empNoAlreadyExists) throw new Error("Employee number already exists.")
    const employee = await Employee.create(validated)
    return await this.getEmployeeById(employee.id)
  }
  async updateEmployee(id: string, input: IEmployeeInput) {
    const validated = UpdateEmployeeSchema.parse(input)
    const [empNoAlreadyExists] = await Promise.all([
      Employee.exists({
        employeeNo: input.employeeNo,
        _id: { $ne: new Types.ObjectId(id) },
      }),
    ])
    if (empNoAlreadyExists) throw new Error("Employee number already exists.")
    const employee = await Employee.findByIdAndUpdate(id, validated, {
      populate: "branchId jobPositionId",
      returnDocument: "after",
    })
    if (!employee) throw new Error("Employee is not found.")
    return employeeMapper(employee)
  }
  async updateEmployeeStatus(id: string) {
    const isActive = await Employee.findById(id)
      .select("-_id isActive")
      .then((res) => res.isActive)
      .catch((e) => {
        throw Error("Employee is not found.")
      })
    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        isActive: !isActive,
      },
      {
        populate: "branchId jobPositionId",
        returnDocument: "after",
      }
    )
    if (!employee) throw new Error("Employee is not found.")
    return employeeMapper(employee)
  }
}
