import { DepartmentService } from "@/services/department.service"
import { IDepartmentInput } from "@/lib/types"

const departmentService = new DepartmentService()

export const departmentResolver = {
  Query: {
    department: async (_: any, { id }: { id: string }) => {
      const department = await departmentService.getDepartmentById(id)
      return {
        success: true,
        message: "Department fetched successfully.",
        data: department
      }
    },
    departments: async (_: any, { page, limit }: { page: number, limit: number }) => {
      const departments = await departmentService.getAllDepartments(page, limit)
      return {
        success: true,
        message: "Department fetched successfully.",
        data: departments
      }
    }
  },
  Mutation: {
    createDepartment: async (_: unknown, { input }: { input: IDepartmentInput }) => {
      const department = await departmentService.createDepartment(input)
      return {
        success: true,
        message: "Department created successfully.",
        data: department
      }
    },
    updateDepartment: async (_: unknown, { id, input }: { id: string, input: IDepartmentInput }) => {
      const department = await departmentService.updateDepartment(id, input)
      return {
        success: true,
        message: "Department updated successfully.",
        data: department
      }
    },
    updateDepartmentStatus: async (_: unknown, { id }: { id: string }) => {
      const department = await departmentService.updateDepartmentStatus(id)
      return {
        success: true,
        message: "Department status updated successfully.",
        data: department
      }
    }
  }
}