import { mergeTypeDefs } from "@graphql-tools/merge"
import { branchSchema } from "./branch.schema"
import { departmentSchema } from "./department.schema"
import { jobPositionSchema } from "./jobPosition.schema"
import { employeeSchema } from "./employee.schema"

export const typeDefs = mergeTypeDefs([
  branchSchema,
  departmentSchema,
  jobPositionSchema,
  employeeSchema,
])
