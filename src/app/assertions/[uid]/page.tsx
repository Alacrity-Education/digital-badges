// app/assertions/[assertionId]/page.tsx
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAssertionByUUID } from "../actions";
import Image from "next/image";
import Head from "next/head";

export default async function AssertionPage({
  params,
  searchParams,
}: {
  params: { uid: string };
  searchParams: { format?: string };
}) {
  const { uid } = await params;
  const h = await headers();
  const accept = (h.get("accept") || "").toLowerCase();

  const sp = await searchParams;

  // detect json request — Accept header OR explicit query param OR .json suffix handling
  const wantsJson =
    String(sp.format).toLowerCase() === "json" ||
    accept.includes("application/vc+ld+json") ||
    accept.includes("application/ld+json") ||
    accept.includes("application/json");

  // Avoid redirect loop: only redirect from the page route to the API route
  if (wantsJson) {
    // server-side redirect to api endpoint
    redirect(`/api/assertions/${uid}`);
  }

  const assertion = await getAssertionByUUID(uid);
  const assertionJson = JSON.stringify(assertion, null, 2);
  return (
    <>
      <Head>
        <title>{assertion.uid}</title>
        {/* discoverability: point to the machine-readable location */}
        <link
          rel="alternate"
          type="application/vc+ld+json"
          href={`/api/assertions/${uid}`}
        />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <main className="max-w-xl mx-auto p-4">
        <div className="">
          <Image
            src={assertion.image + ""}
            alt={"badge assertion" + assertion.uid}
            height={500}
            width={500}
          />
          <h1 className="text-2xl font-bold my-4">{assertion.issuedOn}</h1>
        </div>

        {/* embed JSON-LD for in-page bakers / validators */}
        <script
          id="openbadge-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: assertionJson }}
        />
      </main>
    </>
  );
}
