import { format, isValid } from "date-fns"

export function formatDate(date?: string | Date | null) {
  if (!date) return null
  const parsedDate = new Date(date)
  return isValid(parsedDate) ? format(parsedDate, "PPpp") : null
}
