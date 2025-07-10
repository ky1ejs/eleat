import { Query, QueryResolvers } from "@graphql/__generated__/graphql";

const getPlans: QueryResolvers["plans"] = async (_, __, context) => {
  const { session, dataSources: { prisma } } = context;
  if (!session) {
    throw new Error("Not authenticated");
  }

  const plans = prisma.plan.findMany({ where: { user_id: session.user.id } });
  return plans;
}

export default getPlans;
