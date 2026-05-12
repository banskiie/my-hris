import { gql } from "graphql-tag"

export const authSchema = gql`
  type Query {
    me: Employee
  }
`
