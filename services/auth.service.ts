import { employeeMapper } from "@/lib/mappers"
import Employee from "@/models/employee.model"

export class AuthService {
  // Queries
  async getMe(id: string) {
    const employee = await Employee.findById(id)
      .populate("branchId jobPositionId")
      .lean()
    if (!employee) throw new Error("Employee is not found.")
    return employeeMapper(employee)
  }
}
