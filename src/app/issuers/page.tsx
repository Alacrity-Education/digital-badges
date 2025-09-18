import { createIssuer } from "./actions";

export default function IssuersPage() {
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Issuer</h1>

      <form action={createIssuer} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block mb-1">URL</label>
          <input
            type="url"
            name="url"
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Issuer
        </button>
      </form>
    </main>
  );
}
