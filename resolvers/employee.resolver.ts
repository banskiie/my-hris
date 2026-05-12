import { EmployeeService } from "@/services/employee.service"
import { IEmployeeInput } from "@/lib/types"

const employeeService = new EmployeeService()

export const employeeResolver = {
  Query: {
    employee: async (_: any, { id }: { id: string }) => {
      const employee = await employeeService.getEmployeeById(id)
      return {
        success: true,
        message: "Employee fetched successfully.",
        data: employee,
      }
    },
    employees: async (
      _: any,
      { page, limit }: { page: number; limit: number }
    ) => {
      const employees = await employeeService.getAllEmployees(page, limit)
      return {
        success: true,
        message: "Employee fetched successfully.",
        data: employees,
      }
    },
  },
  Mutation: {
    createEmployee: async (
      _: unknown,
      { input }: { input: IEmployeeInput }
    ) => {
      const employee = await employeeService.createEmployee(input)
      return {
        success: true,
        message: "Employee created successfully.",
        data: employee,
      }
    },
    updateEmployee: async (
      _: unknown,
      { id, input }: { id: string; input: IEmployeeInput }
    ) => {
      const employee = await employeeService.updateEmployee(id, input)
      return {
        success: true,
        message: "Employee updated successfully.",
        data: employee,
      }
    },
    updateEmployeeStatus: async (_: unknown, { id }: { id: string }) => {
      const employee = await employeeService.updateEmployeeStatus(id)
      return {
        success: true,
        message: "Employee status updated successfully.",
        data: employee,
      }
    },
  },
}
