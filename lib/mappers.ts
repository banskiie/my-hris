import { format } from "date-fns"
import {
  IBranch,
  IDepartment,
  IEmployee,
  IPopulatedEmployee,
  IPopulatedJobPosition,
} from "./types"
import { formatDate } from "./helpers"

export function branchMapper(branch: IBranch) {
  return {
    id: branch._id.toString(),
    name: branch.name,
    code: branch.code,
    address: branch.address,
    isActive: branch.isActive,
    createdAt: formatDate(branch.createdAt),
    updatedAt: formatDate(branch.updatedAt),
  }
}

export function departmentMapper(dept: IDepartment) {
  return {
    id: dept._id.toString(),
    name: dept.name,
    isActive: dept.isActive,
    createdAt: formatDate(dept.createdAt),
    updatedAt: formatDate(dept.updatedAt),
  }
}

export function jobPositionMapper(position: IPopulatedJobPosition) {
  return {
    id: position._id.toString(),
    name: position.name,
    department: departmentMapper(position.departmentId),
    isActive: position.isActive,
    createdAt: formatDate(position.createdAt),
    updatedAt: formatDate(position.updatedAt),
  }
}

export function employeeMapper(employee: IPopulatedEmployee) {
  return {
    id: employee._id.toString(),
    firstName: employee.firstName,
    lastName: employee.lastName,
    birthday: formatDate(employee.birthday),
    role: employee.role,
    employeeNo: employee.employeeNo,
    branch: branchMapper(employee.branchId),
    jobPosition: jobPositionMapper(employee.jobPositionId),
    status: employee.status,
    createdAt: formatDate(employee.createdAt),
    updatedAt: formatDate(employee.updatedAt),
  }
}
