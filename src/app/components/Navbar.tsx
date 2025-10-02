import React from "react";
import { getIssuer } from "../onboarding/page";
import Link from "next/link";
import { Issuer } from "@/db/schema";

export default async function Navbar() {
  //fetch issuer to show name in navbar
  const issuer = await getIssuer();
  if (!issuer) {
    return null;
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{issuer.name}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/badges">Badges</Link>
          </li>
          <li>
            <Link href="/recipients">Recipients</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
