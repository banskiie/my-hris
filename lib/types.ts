import { Types } from "mongoose"

export enum Role {
  EMPLOYEE = "EMPLOYEE",
  APPROVER = "APPROVER",
  ADMIN = "ADMIN",
}

export enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

// Department
export interface IDepartment {
  _id: Types.ObjectId
  name: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IDepartmentInput {
  name: String
}

// Branch
export interface IBranch {
  _id: Types.ObjectId
  name: string
  code: string
  address: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IBranchInput {
  name: string
  code: string
  address: string
}

// Job Position
export interface IJobPosition {
  _id: Types.ObjectId
  name: string
  departmentId: Types.ObjectId
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IPopulatedJobPosition {
  _id: Types.ObjectId
  name: string
  departmentId: IDepartment
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IJobPositionInput {
  name: string
  departmentId: string
}

// Employee
export interface IEmployee {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  birthday: string
  role: Role
  employeeNo: string
  password: string
  branchId: Types.ObjectId
  jobPositionId: Types.ObjectId
  status: EmployeeStatus
  createdAt?: Date
  updatedAt?: Date
}
