import { UserProfileFragment } from "@/graphql/gql/graphql";

export function calculateBmr(
  user: UserProfileFragment,
  withActivity: boolean,
): number {
  if (!user.date_of_birth || !user.weight_in_grams || !user.height_in_cm) {
    return 0;
  }

  console.log(user.date_of_birth);
  console.log(typeof user.date_of_birth);
  const diff = Math.abs(user.date_of_birth.getTime() - new Date().getTime());
  const years = Math.ceil(diff / (1000 * 3600 * 24 * 365));
  // Mifflin-St Jeor Equation - https://www.calculator.net/bmr-calculator.html
  let base =
    (user.weight_in_grams / 1000) * 10 +
    (user.height_in_cm / 100) * 6.25 -
    years * 5 +
    5;
  if (withActivity && user.physical_activity_level) {
    base = base * user.physical_activity_level.multiplier;
  }
  return base;
}
