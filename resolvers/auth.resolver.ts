import { AuthService } from "@/services/auth.service"

const authService = new AuthService()

export const authResolver = {
  Query: {
    employee: async (_: any, { id }: { id: string }) => {
      const employee = await authService.getMe(id)
      return {
        success: true,
        message: "Employee fetched successfully.",
        data: employee,
      }
    },
  },
}
