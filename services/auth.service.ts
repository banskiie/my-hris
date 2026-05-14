import { employeeMapper } from "@/lib/mappers"
import Employee from "@/models/employee.model"
import bcrypt from "bcryptjs"

export class AuthService {
  // Queries
  async getMe(id: string) {
    const employee = await Employee.findById(id)
      .populate("branchId jobPositionId")
      .lean()
    if (!employee) throw new Error("Employee is not found.")
    return employeeMapper(employee)
  }
  // Mutations
  async login(employeeNo: string, password: string) {
    const employee = await Employee.findOne({
      employeeNo,
    })
      .populate("branchId jobPositionId")
      .select("+password")
      .lean()
    if (!employee) throw new Error("Employee does not exist.")
    const isPasswordValid = await bcrypt.compare(password, employee.password)
    if (!isPasswordValid) throw new Error("Invalid password.")
    return employeeMapper(employee)
  }
}
