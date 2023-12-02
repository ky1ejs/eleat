"use client";
export const dynamic = "force-dynamic";

import { useSession } from "@/supabase/SupabaseSessionProvider";
import { graphql } from "@/graphql/gql";
import { useMutation, useQuery } from "urql";
import { UserProfileFragment } from "@/graphql/gql/graphql";
// import { calculateUsersMacroTargets } from "@/nutrition/macro-nutrient-targets";
// import { calculateBmr } from "@/nutrition/bmr";
import { FormField } from "@/components/FormField";
import { useForm, Controller } from "react-hook-form";
import { Session } from "@supabase/auth-helpers-nextjs";

const USER_PROFILE = graphql(`
  query UserProfile($user_id: UUID!) {
    user_profileCollection(filter: { user_id: { eq: $user_id } }) {
      edges {
        node {
          ...UserProfile
        }
      }
    }
  }
`);

const UPDATE_USER_PROFILE = graphql(`
  mutation UpdateUserProfile($user_id: UUID!, $data: user_profileUpdateInput!) {
    updateuser_profileCollection(
      set: $data
      filter: { user_id: { eq: $user_id } }
    ) {
      affectedCount
    }
  }
`);

const LIST_PHYSICAL_ACTIVITY_LEVELS = graphql(`
  query ListPhysicalActivityLevels {
    physical_activity_levelCollection {
      edges {
        node {
          ...PhysicalActivityLevel
        }
      }
    }
  }
`);

const removeAttrFromObject = <O extends object, A extends keyof O>(
  object: O,
  attr: A[],
): Omit<O, A> => {
  const newObject = { ...object };

  attr.forEach((a) => {
    if (a in newObject) {
      delete newObject[a];
    }
  });

  return newObject;
};

export default function Page() {
  const { session } = useSession();
  return session ? (
    <LoggedInContent session={session} />
  ) : (
    <div>Not logged in</div>
  );
}

const LoggedInContent = ({ session }: { session: Session }) => {
  const [{ data: userProfileData }] = useQuery({
    query: USER_PROFILE,
    variables: { user_id: session.user.id },
  });

  const [{ data: physicalActivityLevels }] = useQuery({
    query: LIST_PHYSICAL_ACTIVITY_LEVELS,
  });

  const [, update] = useMutation(UPDATE_USER_PROFILE);

  const profile = userProfileData?.user_profileCollection?.edges.at(0)?.node;

  const defaultValues: Partial<UserProfileFragment> = {
    ...profile,
    weight_in_grams: profile?.weight_in_grams
      ? profile.weight_in_grams / 100
      : undefined,
  };

  const { handleSubmit, control } = useForm<UserProfileFragment>({
    defaultValues,
  });

  const updateUser = (userUpdate: UserProfileFragment) => {
    const cleanedUpdate = removeAttrFromObject(userUpdate, [
      "physical_activity_level",
      "macro_target",
      "nodeId",
      "__typename",
    ]);
    update({
      user_id: session.user.id,
      data: {
        ...cleanedUpdate,
        weight_in_grams: cleanedUpdate.weight_in_grams ?? 0 * 100,
      },
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  // const targerMacroAmounts = calculateUsersMacroTargets(profile, true);
  // const targetCarbs = Math.round(targerMacroAmounts.carbs_in_grams);
  // const targetProtein = Math.round(targerMacroAmounts.protein_in_grams);
  // const targetFat = Math.round(targerMacroAmounts.fat_in_grams);
  // const targetCals = calculateBmr(profile, false);
  // const targetCalsWithActivity = calculateBmr(profile, true);
  // const totalCals =
  //   targetCalsWithActivity + (profile.amount_of_surplus_calories || 0);

  return (
    <div>
      <form onSubmit={handleSubmit(updateUser)}>
        <FormField
          label="username"
          control={control}
          name="username"
          isRequired={false}
        />
        <FormField
          label="Height (cm)"
          control={control}
          name="height_in_cm"
          isRequired={false}
        />
        <FormField
          label="Weight"
          control={control}
          name="weight_in_grams"
          isRequired={false}
        />
        <FormField
          label="Date of birth"
          type="date"
          control={control}
          name="date_of_birth"
          isRequired={false}
        />
        {/* <FormField
          label="Calory goal"
          type="date"
          control={control}
          name="surplus"
          isRequired={false}
        /> */}
        <Controller
          control={control}
          name="physical_activity_level_id"
          render={({ field }) => (
            <>
              Activity
              <select
                ref={field.ref}
                onChange={field.onChange}
                placeholder="select"
              >
                {physicalActivityLevels?.physical_activity_levelCollection?.edges.map(
                  ({ node: activity }) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.name}
                    </option>
                  ),
                )}
              </select>
            </>
          )}
        />

        {/* <h3>BMR + Activ ity: {targetCalsWithActivity}</h3> */}
        <h4>Macros</h4>
        <FormField
          label="protein % target"
          control={control}
          name="protein"
          isRequired={false}
        />
        <FormField
          label="carb % target"
          control={control}
          name="carbs"
          isRequired={false}
        />
        <FormField
          label="fat % target"
          control={control}
          name="fat"
          isRequired={false}
        />
        <button type="submit">Save</button>
        {/* <h4>Target Cals: {totalCals}</h4>/
        <h4>
          Protein = {targetProtein}g, Carbs = {targetCarbs}g, Fat = {targetFat}g
        </h4> */}
      </form>
    </div>
  );
};
