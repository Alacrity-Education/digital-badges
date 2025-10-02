import { db } from "@/db/clients";
import { Issuer, Issuers } from "@/db/schema";

import { redirect } from "next/navigation";

import { createIssuer } from "./actions";
export default async function Onboarding() {
  // check if issuer has been created
  if (await getIssuer()) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-5xl md:text-6xl font-bold mb-10">Onboarding</h1>
      <form
        action={createIssuer}
        className="flex flex-col gap-6 w-max min-w-max"
      >
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Issuer Name</legend>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Issuer Url</legend>
          <input
            name="url"
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Engine Base Url</legend>
          <input
            name="engineUrl"
            type="text"
            className="input"
            placeholder="Type here"
          />
        </fieldset>
        {/* <fieldset className="fieldset ">
                    <label className="label">
                        <input type="checkbox" defaultChecked className="checkbox" />
                        Remember me
                    </label>
                </fieldset> */}
        <button type="submit" className="btn btn-neutral self-center mt-2">
          Submit
        </button>
      </form>
    </main>
  );
}

export async function getIssuer() {
  return ((await db.select().from(Issuers).limit(1)) as Issuer[])[0];
}
