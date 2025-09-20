import { db } from "@/db/clients";
import { issuers } from "@/db/schema";

import { redirect } from "next/navigation";
import { Issuer } from "../models/Issuer";
export default async function Onboarding() {
    // check if issuer has been created
    const hasIssuer = (await db.select().from(issuers).limit(1) as Issuer[]).length > 0;
    if (hasIssuer) {
        redirect("/");
    }


    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2 w-max min-w-max">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">Onboarding</h1>
            <form className="flex flex-col gap-10 w-max min-w-max">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">What is your name?</legend>
                    <input type="text" className="input" placeholder="Type here" />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">What is your name?</legend>
                    <input type="text" className="input" placeholder="Type here" />

                </fieldset>
                <fieldset className="fieldset ">

                    <label className="label">
                        <input type="checkbox" defaultChecked className="checkbox" />
                        Remember me
                    </label>
                </fieldset>
                <button type="submit" className="btn btn-neutral self-center">Submit</button>
            </form>
            {/* <p className="pt-10 text-center"><span>T&C</span> ©Alacrity Education</p> */}
        </main>
    )
}