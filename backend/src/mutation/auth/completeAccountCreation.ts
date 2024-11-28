import { MutationResolvers } from "@graphql/__generated__/graphql";

const completeAccountCreation: MutationResolvers["completeAccountCreation"] = async (_, args, context) => {
  if (context.session) {
    throw new Error("Already authenticated");
  }

  const { prisma } = context.dataSources;
  const { token, code, username, deviceName } = args;

  const request = await prisma.emailAutheticationRequest.findUnique({
    where: { id: token }
  });

  if (!request || request.code !== code) {
    throw new Error("Invalid auth token or code");
  }

  const [user, __] = await prisma.$transaction([
    prisma.user.create({
      data: {
        email: request.email,
        username,
        sessions: {
          create: {
            deviceName: deviceName ?? "Unknown",
          }
        }
      },
      include: { sessions: true }
    }),
    prisma.emailAutheticationRequest.delete({ where: { id: token } })
  ]);

  return user.sessions[0].id;
}

export default completeAccountCreation;
