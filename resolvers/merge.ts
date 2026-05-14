import { mergeResolvers } from "@graphql-tools/merge"
import { branchResolver } from "./branch.resolver"
import { departmentResolver } from "./department.resolver"
import { jobPositionResolver } from "./jobPosition.resolver"
import { employeeResolver } from "./employee.resolver"
import { authResolver } from "./auth.resolver"

export const resolvers = mergeResolvers([
  authResolver,
  employeeResolver,
  branchResolver,
  departmentResolver,
  jobPositionResolver,
])
