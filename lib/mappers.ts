import { format } from "date-fns"
import { IBranch } from "./types"

export function branchMapper(branch: IBranch) {
  return {
    id: branch._id.toString(),
    name: branch.name,
    code: branch.code,
    address: branch.address,
    createdAt: format(new Date(String(branch?.createdAt || "")), "PPpp"),
    updatedAt: format(new Date(String(branch?.updatedAt || "")), "PPpp")
  }
}