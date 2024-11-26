import { PrismaClient, Session, User } from "@prisma/client"

export interface GraphQLContext {
  session?: Session & { user: User }
  dataSources: {
    prisma: PrismaClient
  }
}
