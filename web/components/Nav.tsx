"use client";

import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@/supabase/SupabaseSessionProvider";

export function Nav() {
  const user = useSession();
  const supabase = createClientComponentClient();

  const logOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex items-center justify-between bg-green-300">
      <div>
        <h1 className="text-3xl">Eleat</h1>
      </div>
      <div className="flex items-center gap-6">
        <NavItem title="Items" route="/items" />
        <NavItem title="Plans" route="/plans" />
        <div>
          {user.session?.user.email && (
            <Link href="/profile">
              <h3>{user.session.user.email}</h3>
            </Link>
          )}
          {user.session ? (
            <button className="text-sm" onClick={logOut}>
              Log out
            </button>
          ) : (
            <Link className="text-sm" href={"/auth"}>
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const NavItem = ({ title, route }: { title: string; route: string }) => (
  <div>
    <Link className="text-lg" href={route}>
      {title}
    </Link>
  </div>
);
