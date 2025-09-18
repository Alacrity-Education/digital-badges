# Badge Actions – Return Values

## `createBadge(formData: FormData): Promise<void>`
- Inserts a new badge into the database.
- **Return type:** `Promise<void>` (server actions require `void`).
- Errors: silently ignores if name is missing.

## `deleteBadge(formData: FormData): Promise<void>`
- Deletes a badge by its `id`.
- **Return type:** `Promise<void>`.
- Errors: silently ignores if `id` is invalid.
