import { BranchService } from "@/services/branch.service"
import { IBranchInput } from "@/lib/types"

const branchService = new BranchService()

export const branchResolver = {
  Query: {
    branch: async (_: any, { id }: { id: string }) => {
      const branch = await branchService.getBranchById(id)
      return {
        success: true,
        message: "Branch fetched successfully.",
        data: branch
      }
    },
    branches: async (_: any, { page, limit }: { page: number, limit: number }) => {
      const branches = await branchService.getAllBranches(page, limit)
      return {
        success: true,
        message: "Branch fetched successfully.",
        data: branches
      }
    }
  },
  Mutation: {
    createBranch: async (_: unknown, { input }: { input: IBranchInput }) => {
      const branch = await branchService.createBranch(input)
      return {
        success: true,
        message: "Branch created successfully.",
        data: branch
      }
    },
    updateBranch: async (_: unknown, { id, input }: { id: string, input: IBranchInput }) => {
      const branch = await branchService.updateBranch(id, input)
      return {
        success: true,
        message: "Branch updated successfully.",
        data: branch
      }
    },
    updateBranchStatus: async (_: unknown, { id }: { id: string }) => {
      const branch = await branchService.updateBranchStatus(id)
      return {
        success: true,
        message: "Branch status updated successfully.",
        data: branch
      }
    }
  }
}