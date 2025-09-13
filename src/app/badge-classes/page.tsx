import { db } from "@/db/clients";
import { badgeClasses, issuers } from "@/db/schema";
import { createBadgeClass, updateBadgeClass, deleteBadgeClass } from "./actions";

export default async function BadgeClassesPage() {
  const all = await db.select().from(badgeClasses);
  const allIssuers = await db.select().from(issuers);

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Badge Classes</h1>

      {/* CREATE FORM */}
      <form action={createBadgeClass} className="space-y-3 border p-4 rounded">
        <h2 className="font-semibold">Create Badge Class</h2>
        <input type="text" name="name" placeholder="Name" required className="border p-2 w-full"/>
        <textarea name="description" placeholder="Description" className="border p-2 w-full"></textarea>
        <input type="text" name="image" placeholder="Image URL" className="border p-2 w-full"/>
        <input type="text" name="criteria" placeholder="Criteria" className="border p-2 w-full"/>
        <select name="issuerId" required className="border p-2 w-full">
          <option value="">-- Select Issuer --</option>
          {allIssuers.map((i) => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Create</button>
      </form>

      {/* LIST + UPDATE + DELETE */}
      <div className="space-y-4">
        {all.map((b) => (
          <div key={b.id} className="border p-4 rounded space-y-2">
            <div className="font-semibold">{b.name}</div>
            <div className="text-sm">{b.description}</div>

            {/* UPDATE FORM */}
            <form action={updateBadgeClass} className="space-y-2">
              <input type="hidden" name="id" value={b.id}/>
              <input type="text" name="name" defaultValue={b.name} className="border p-1 w-full"/>
              <textarea name="description" defaultValue={b.description ?? ""} className="border p-1 w-full"></textarea>
              <input type="text" name="image" defaultValue={b.image ?? ""} className="border p-1 w-full"/>
              <input type="text" name="criteria" defaultValue={b.criteria ?? ""} className="border p-1 w-full"/>
              <button type="submit" className="bg-yellow-500 text-white px-2 py-1 rounded">Update</button>
            </form>

            {/* DELETE FORM */}
            <form action={deleteBadgeClass}>
              <input type="hidden" name="id" value={b.id}/>
              <button type="submit" className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
