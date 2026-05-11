import { gql } from "graphql-tag"

export const departmentSchema = gql`
  type Department {
    id: ID
    name: String
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }

  type DepartmentResponse {
    success: Boolean!
    message: String!
    data: Department
  }

  type DepartmentPagination {
    items: [Department!]!
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  type DepartmentsResponse {
    success: Boolean!
    message: String!
    data: DepartmentPagination
  }

  type Query {
    department(id: ID): DepartmentResponse
    departments(page: Int = 1, limit: Int = 20): DepartmentsResponse
  }

  input CreateDepartmentInput {
    name: String!
  }

  input UpdateDepartmentInput {
    name: String
  }

  type Mutation {
    createDepartment(input: CreateDepartmentInput!): DepartmentResponse
    updateDepartment(id: ID!, input: UpdateDepartmentInput!): DepartmentResponse
    updateDepartmentStatus(id: ID!): DepartmentResponse
  }
`
