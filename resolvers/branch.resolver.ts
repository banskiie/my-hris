import { BranchService } from "@/services/branch.service"

const branchService = new BranchService()

export const branchResolver = {
  Query: {
    branch: async (_: any, { id }: { id: string }) => {
      const branch = await branchService.getBranchById(id)
      return {
        success: true,
        message: "Branch ",
        data: branch
      }
    }
  }
}