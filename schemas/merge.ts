import { mergeTypeDefs } from "@graphql-tools/merge"
import { branchSchema } from "./branch.schema"

export const typeDefs = mergeTypeDefs([
  branchSchema
])