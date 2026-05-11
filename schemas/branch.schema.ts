import { gql } from "graphql-tag"

export const branchSchema = gql`
  type Branch {
    id: ID
    name: String
    code: String
    address: String
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }

  type BranchResponse {
    success: Boolean!
    message: String!
    data: Branch
  }

  type BranchPagination {
    items: [Branch!]!
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  type BranchesResponse {
    success: Boolean!
    message: String!
    data: Branch
  }

  type Query {
    branch(id: ID): BranchResponse
    branches(page: Int = 1, limit: Int = 20): BranchesResponse
  }

  input CreateBranchInput {
    name: String!
    code: String!
    address: String
    isActive: Boolean = true
  }

  input UpdateBranchInput {
    name: String
    code: String
    address: String
  }

  type Mutation {
    createBranch(input: CreateBranchInput!): BranchResponse
    updateBranch(id: ID!, input: CreateBranchInput!): BranchResponse
    updateStatusBranch(id: ID!): BranchResponse
  }
`
