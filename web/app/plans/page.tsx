import { graphql } from "@/graphql/__generated__";
import { getClient } from "@/graphql/apollo-client";
import { cookies } from "next/headers";

const GET_PLANS = graphql(`
  query GetPlans {
    plans {
      id
      name
    }
  }
`);

export default async function PlansPage() {
  const client = getClient(cookies);
  const plans = await client.query({ query: GET_PLANS });

  if (!plans.data?.plans) {
    throw new Error("Failed to fetch plans");
  }

  return (
    <div>
      <h1>Plans</h1>
      <ul>
        {plans.data.plans.map((plan) => (
          <li key={plan.id}>{plan.name}</li>
        ))}
      </ul>
    </div>
  );
}
