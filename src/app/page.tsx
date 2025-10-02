import { redirect } from "next/navigation";
import { getIssuer } from "./onboarding/page";
import { db } from "@/db/clients";
import { Issuers } from "@/db/schema";

export default async function Home() {
  if (!(await getIssuer())) {
    redirect("/onboarding");
  }

  redirect("/recipients");
}
