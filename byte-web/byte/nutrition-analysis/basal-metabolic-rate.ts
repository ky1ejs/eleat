import { UserData } from "@models";

export function calculateBmr(user: UserData, withActivity: boolean): number {
  if (!user.dob) {
    return 0;
  }
  if (!user.weight_in_grams) {
    return 0;
  }
  if (!user.height_in_milimeters) {
    return 0;
  }
  const diff = Math.abs(user.dob.toDate().getTime() - new Date().getTime());
  const years = Math.ceil(diff / (1000 * 3600 * 24 * 365));
  // Mifflin-St Jeor Equation - https://www.calculator.net/bmr-calculator.html
  let base =
    (user.weight_in_grams / 1000) * 10 + (user.height_in_milimeters / 100) * 6.25 - years * 5 + 5;
  if (withActivity && user.activity) {
    base = base * user.activity.multiplier;
  }
  return base;
}


