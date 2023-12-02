import { Suspense } from "react";
import { Items } from "./items";

export default async function Page() {
  return (
    <Suspense fallback={<h2>...loading items</h2>}>
      <Items />
    </Suspense>
  );
}
