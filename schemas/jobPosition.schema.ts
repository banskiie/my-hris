import { gql } from "graphql-tag"

export const jobPositionSchema = gql`
  type JobPosition {
    id: ID
    name: String
    department: Department
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }

  type JobPositionResponse {
    success: Boolean!
    message: String!
    data: JobPosition
  }

  type JobPositionPagination {
    items: [JobPosition!]!
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  type JobPositionsResponse {
    success: Boolean!
    message: String!
    data: JobPositionPagination
  }

  type Query {
    jobPosition(id: ID): JobPositionResponse
    jobPositions(page: Int = 1, limit: Int = 20): JobPositionsResponse
  }

  input CreateJobPositionInput {
    name: String!
    departmentId: ID!
  }

  input UpdateJobPositionInput {
    name: String
    departmentId: ID
  }

  type Mutation {
    createJobPosition(input: CreateJobPositionInput!): JobPositionResponse
    updateJobPosition(
      id: ID!
      input: UpdateJobPositionInput!
    ): JobPositionResponse
    updateJobPositionStatus(id: ID!): JobPositionResponse
  }
`
