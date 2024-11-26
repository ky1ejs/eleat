import { Account, MutationResolvers } from "@graphql/__generated__/graphql"
import { PrismaClient, User } from "@prisma/client"

const validateAuthCodeAndFindAccount = async (token: string, code: string, prisma: PrismaClient): Promise<User | true> => {
  console.log(token, code)
  if (!token || !code) {
    throw new Error("Invalid code")
  }

  const request = await prisma.emailAutheticationRequest.findUnique({
    where: { id: token }
  })

  console.log(request)
  if (!request || request.code !== code) {
    console.log("FUCK")
    throw new Error("Invalid code")
  }

  const fiveMins = 1000 * 60 * 5
  if (request.createdAt.valueOf() + fiveMins < new Date().valueOf()) {
    throw new Error("Code expired")
  }

  const account = await prisma.user.findUnique({
    where: { email: request.email }
  })

  return account ?? true
}

const validateEmailAuthentication: MutationResolvers["validateEmailAuthentication"] = async (
  _,
  { token, code, deviceName },
  { dataSources: { prisma } }
) => {
  const result = await validateAuthCodeAndFindAccount(token, code, prisma)
  if (result === true) {
    return {
      __typename: "EmptyResponse"
    }
  }

  const session = await prisma.session.create({
    data: {
      userId: result.id,
      deviceName: deviceName ?? "Unknown",
    }
  })

  return {
    __typename: "SuccessfulAuthentication",
    account: userToAccount(result),
    sessionToken: session.id
  }
}

function userToAccount(user: User): Account {
  return {
    email: user.email,
    username: user.username,
  }
}

export default validateEmailAuthentication;
