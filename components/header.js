import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const routes = [
  { name: "home", text: "IAD Basics", route: "/" },
  { name: "design", text: "Design", route: "/design" },
  { name: "konzept", text: "konzept", route: "/konzept" },
  { name: "code", text: "code", route: "/code" },
];

function NavItem({ routeInfo }) {
  const router = useRouter();
  let navA;
  if (routeInfo.route === router.route) {
    navA = <a className="underline">{routeInfo.text}</a>;
  } else {
    navA = <a className="opacity-50  hover:opacity-100">{routeInfo.text}</a>;
  }

  return <Link href={routeInfo.route}>{navA}</Link>;
}

function NavItems() {
  return (
    <React.Fragment>
      {routes.slice(1).map((routeInfo, index) => {
        return <NavItem key={index} routeInfo={routeInfo} />;
      })}
    </React.Fragment>
  );
}

export default function Header() {
  return (
    <div className="flex flex-row justify-between mb-20 mt-8 items-end">
      <h2 className="text-2xl font-bold tracking-tight md:tracking-tighter leading-tight ">
        <Link href={routes[0].route}>
          <a className="font-sans font-bold text-3xl">IAD Basics</a>
        </Link>
      </h2>
      <div className="w-64 flex flex-row justify-between font-sans font-normal text-xl">
        <NavItems />
      </div>
    </div>
  );
}
