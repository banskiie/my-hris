import { gql } from "graphql-tag"

export const employeeSchema = gql`
  enum Role {
    ADMIN
    EMPLOYEE
  }

  enum EmployeeStatus {
    ACTIVE
    INACTIVE
  }

  type Employee {
    id: ID
    firstName: String
    lastName: String
    role: Role
    employeeNo: String
    birthday: String
    status: EmployeeStatus
    branch: Branch
    jobPosition: JobPosition
    createdAt: String
    updatedAt: String
  }

  type EmployeeResponse {
    success: Boolean!
    message: String!
    data: Employee
  }

  type EmployeePagination {
    items: [Employee!]!
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  type EmployeesResponse {
    success: Boolean!
    message: String!
    data: EmployeePagination
  }

  type Query {
    employee(id: ID): EmployeeResponse
    employees(page: Int = 1, limit: Int = 20): EmployeesResponse
  }

  input CreateEmployeeInput {
    firstName: String!
    lastName: String!
    role: Role!
    employeeNo: String!
    birthday: String!
    branchId: ID!
    jobPositionId: ID!
  }

  input UpdateEmployeeInput {
    firstName: String
    lastName: String
    role: Role
    employeeNo: String
    birthday: String
    branchId: ID
    jobPositionId: ID
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): EmployeeResponse
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): EmployeeResponse
    updateEmployeeStatus(id: ID!): EmployeeResponse
  }
`
