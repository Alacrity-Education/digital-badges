import { redirect } from "next/navigation";
import { hasIssuer } from "./onboarding/page";
import AwardeesView from "./components/AwardeesView";

export default async function Home() {




  if (! await hasIssuer()) {
    redirect("/onboarding");
  }

  redirect("/awardees");




}


