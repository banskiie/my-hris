import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { gql } from "@apollo/client"
import { client } from "@/lib/apollo"

const LOGIN = gql`
  mutation Login($employeeNo: String!, $password: String!) {
    login(employeeNo: $employeeNo, password: $password) {
      success
      message
      data {
        id
        firstName
        lastName
        role
        employeeNo
        birthday
        status
        createdAt
        updatedAt
      }
    }
  }
`

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        employeeNo: {
          label: "Employee No.",
          type: "text",
        },
      },
      authorize: async ({ username, password }: any) => {
        const result = await client.mutate({
          mutation: LOGIN,
          variables: {
            username,
            password,
          },
        })
        if (!result) throw new Error("Invalid sign in.")
        return (result.data as any).login
      },
    }),
  ],
} as NextAuthOptions)

export { handler as GET, handler as POST }
