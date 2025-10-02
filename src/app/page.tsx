import { redirect } from "next/navigation";
import { getIssuer } from "./onboarding/page";

export default async function Home() {
  if (!(await getIssuer())) {
    redirect("/onboarding");
  }

  redirect("/recipients");
}
