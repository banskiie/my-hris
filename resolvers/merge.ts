import { mergeResolvers } from "@graphql-tools/merge"
import { branchResolver } from "./branch.resolver"

export const resolvers = mergeResolvers([
  branchResolver
])