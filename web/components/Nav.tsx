import Link from "next/link";

export function Nav() {
  return (
    <div className="flex items-center gap-8 bg-green-700">
      <div>
        <h1 className="text-3xl">Eleat</h1>
      </div>
      <div className="flex items-center gap-6">
        <NavItem title="Items" route="/items" />
        <NavItem title="Plans" route="/plans" />
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
