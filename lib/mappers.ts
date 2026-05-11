import { format } from "date-fns"
import {
  IBranch,
  IDepartment,
  IJobPosition,
  IPopulatedJobPosition,
} from "./types"

export function branchMapper(branch: IBranch) {
  return {
    id: branch._id.toString(),
    name: branch.name,
    code: branch.code,
    address: branch.address,
    isActive: branch.isActive,
    createdAt: format(new Date(String(branch?.createdAt || "")), "PPpp"),
    updatedAt: format(new Date(String(branch?.updatedAt || "")), "PPpp"),
  }
}

export function departmentMapper(dept: IDepartment) {
  return {
    id: dept._id.toString(),
    name: dept.name,
    isActive: dept.isActive,
    createdAt: format(new Date(String(dept?.createdAt || "")), "PPpp"),
    updatedAt: format(new Date(String(dept?.updatedAt || "")), "PPpp"),
  }
}

export function jobPositionMapper(position: IPopulatedJobPosition) {
  return {
    id: position._id.toString(),
    name: position.name,
    department: departmentMapper(position.departmentId),
    isActive: position.isActive,
    createdAt: format(new Date(String(position?.createdAt || "")), "PPpp"),
    updatedAt: format(new Date(String(position?.updatedAt || "")), "PPpp"),
  }
}
