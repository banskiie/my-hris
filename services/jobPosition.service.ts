import { jobPositionMapper } from "@/lib/mappers"
import {
  IJobPosition,
  IJobPositionInput,
  IPopulatedJobPosition,
} from "@/lib/types"
import JobPosition from "@/models/jobPosition.model"
import {
  CreateJobPositionSchema,
  UpdateJobPositionSchema,
} from "@/validators/jobPosition.validator"
import { Types } from "mongoose"

export class JobPositionService {
  // Queries
  async getJobPositionById(id: string) {
    const jobPosition = await JobPosition.findById(id)
      .populate("departmentId")
      .lean()
    if (!jobPosition) throw new Error("JobPosition is not found.")
    return jobPositionMapper(jobPosition)
  }
  async getAllJobPositions(page: number, limit: number) {
    const [result] = await JobPosition.aggregate([
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "departments",
                localField: "departmentId",
                foreignField: "_id",
                as: "department",
              },
            },
            {
              $unwind: "$department",
            },
            {
              $addFields: {
                department: "$department",
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
      items: result.data.map((item: IPopulatedJobPosition) =>
        jobPositionMapper(item)
      ),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }
  // Mutations
  async createJobPosition(input: IJobPositionInput) {
    const validated = CreateJobPositionSchema.parse(input)
    const [nameAlreadyExists] = await Promise.all([
      JobPosition.exists({ name: input.name }),
    ])
    if (nameAlreadyExists) throw new Error("JobPosition name already exists.")
    const jobPosition = await JobPosition.create(validated)
    const newJobPosition = await JobPosition.findById(jobPosition._id)
      .populate("departmentId")
      .lean()
    return jobPositionMapper(newJobPosition)
  }
  async updateJobPosition(id: string, input: IJobPositionInput) {
    const validated = UpdateJobPositionSchema.parse(input)
    const [nameAlreadyExists] = await Promise.all([
      JobPosition.exists({
        name: input.name,
        _id: { $ne: new Types.ObjectId(id) },
      }),
    ])
    if (nameAlreadyExists) throw new Error("JobPosition name already exists.")
    const jobPosition = await JobPosition.findByIdAndUpdate(id, validated, {
      populate: "document",
      returnDocument: "after",
    })
    if (!jobPosition) throw new Error("JobPosition is not found.")
    return jobPositionMapper(jobPosition)
  }
  async updateJobPositionStatus(id: string) {
    const isActive = await JobPosition.findById(id)
      .select("-_id isActive")
      .then((res) => res.isActive)
      .catch((e) => {
        throw Error("JobPosition is not found.")
      })
    const jobPosition = await JobPosition.findByIdAndUpdate(
      id,
      {
        isActive: !isActive,
      },
      {
        populate: "departmentId",
        returnDocument: "after",
      }
    )
    if (!jobPosition) throw new Error("JobPosition is not found.")
    return jobPositionMapper(jobPosition)
  }
}
