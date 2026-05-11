import { mergeResolvers } from "@graphql-tools/merge"
import { branchResolver } from "./branch.resolver"
import { departmentResolver } from "./department.resolver"
import { jobPositionResolver } from "./jobPosition.resolver"

export const resolvers = mergeResolvers([
  branchResolver,
  departmentResolver,
  jobPositionResolver,
])
