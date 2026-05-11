import { JobPositionService } from "@/services/jobPosition.service"
import { IJobPositionInput } from "@/lib/types"

const jobPositionService = new JobPositionService()

export const jobPositionResolver = {
  Query: {
    jobPosition: async (_: any, { id }: { id: string }) => {
      const jobPosition = await jobPositionService.getJobPositionById(id)
      return {
        success: true,
        message: "Job Position fetched successfully.",
        data: jobPosition,
      }
    },
    jobPositions: async (
      _: any,
      { page, limit }: { page: number; limit: number }
    ) => {
      const jobPositions = await jobPositionService.getAllJobPositions(
        page,
        limit
      )
      return {
        success: true,
        message: "Job Position fetched successfully.",
        data: jobPositions,
      }
    },
  },
  Mutation: {
    createJobPosition: async (
      _: unknown,
      { input }: { input: IJobPositionInput }
    ) => {
      const jobPosition = await jobPositionService.createJobPosition(input)
      return {
        success: true,
        message: "Job Position created successfully.",
        data: jobPosition,
      }
    },
    updateJobPosition: async (
      _: unknown,
      { id, input }: { id: string; input: IJobPositionInput }
    ) => {
      const jobPosition = await jobPositionService.updateJobPosition(id, input)
      return {
        success: true,
        message: "Job Position updated successfully.",
        data: jobPosition,
      }
    },
    updateJobPositionStatus: async (_: unknown, { id }: { id: string }) => {
      const jobPosition = await jobPositionService.updateJobPositionStatus(id)
      return {
        success: true,
        message: "Job Position status updated successfully.",
        data: jobPosition,
      }
    },
  },
}
