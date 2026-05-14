import { gql } from "graphql-tag"

export const authSchema = gql`
  type Query {
    me: Employee
  }

  type AuthResponse {
    success: Boolean!
    message: String!
    data: Employee
  }

  type Mutation {
    login(employeeNo: String!, password: String!): AuthResponse
  }
`
