import { db } from "@/db/clients";
import { badgeAssertions, badgeClasses, recipients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createAssertion, updateAssertion, deleteAssertion } from "./actions";

export default async function AssertionsPage() {
  // data for dropdowns
  const allBadgeClasses = await db.select().from(badgeClasses);
  const allRecipients = await db.select().from(recipients);

  // join assertions with class & recipient so we can show names
  const rows = await db
    .select({
      assertion: badgeAssertions,
      badge: badgeClasses,
      recipient: recipients,
    })
    .from(badgeAssertions)
    .leftJoin(badgeClasses, eq(badgeAssertions.badgeId, badgeClasses.id))
    .leftJoin(recipients, eq(badgeAssertions.recipientId, recipients.id));

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Badge Assertions</h1>

      {/* ASSIGN (CREATE) */}
      <section className="border p-4 rounded space-y-3">
        <h2 className="font-semibold">Assign Badge to User</h2>
        <form action={createAssertion} className="space-y-2">
          <div>
            <label className="block text-sm mb-1">Badge Class</label>
            <select name="badgeId" required className="border p-2 w-full rounded">
              <option value="">-- choose --</option>
              {allBadgeClasses.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Recipient</label>
            <select name="recipientId" required className="border p-2 w-full rounded">
              <option value="">-- choose --</option>
              {allRecipients.map((r) => (
                <option key={r.id} value={r.id}>{r.identity}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Image URL (optional)</label>
            <input name="image" className="border p-2 w-full rounded" placeholder="https://..." />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded">
            Assign
          </button>
        </form>
      </section>

      {/* LIST + UPDATE + REVOKE */}
      <section className="space-y-4">
        <h2 className="font-semibold">All Assertions</h2>

        {rows.length === 0 ? (
          <p className="text-sm text-gray-600">No assertions yet.</p>
        ) : (
          <ul className="space-y-4">
            {rows.map((row) => (
              <li key={row.assertion.id} className="border p-4 rounded space-y-3">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">UUID: {row.assertion.uuid}</div>
                    <div className="text-sm">Badge: {row.badge?.name ?? "-"}</div>
                    <div className="text-sm">Recipient: {row.recipient?.identity ?? "-"}</div>
                    <div className="text-sm">Issued On: {String(row.assertion.issuedOn)}</div>
                    {row.assertion.image && (
                      <div className="text-sm">Image: {row.assertion.image}</div>
                    )}
                  </div>

                  {/* REVOKE */}
                  <form action={deleteAssertion}>
                    <input type="hidden" name="id" value={row.assertion.id} />
                    <button className="text-red-600 hover:underline" type="submit">
                      revoke
                    </button>
                  </form>
                </div>

                {/* UPDATE */}
                <form action={updateAssertion} className="grid gap-2 md:grid-cols-4">
                  <input type="hidden" name="id" value={row.assertion.id} />

                  <select name="badgeId" className="border p-2 rounded">
                    <option value="">(keep)</option>
                    {allBadgeClasses.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>

                  <select name="recipientId" className="border p-2 rounded">
                    <option value="">(keep)</option>
                    {allRecipients.map((r) => (
                      <option key={r.id} value={r.id}>{r.identity}</option>
                    ))}
                  </select>

                  <input
                    name="image"
                    placeholder="new image url (optional)"
                    className="border p-2 rounded"
                  />

                  <button type="submit" className="bg-yellow-500 text-white px-3 py-2 rounded">
                    update
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
