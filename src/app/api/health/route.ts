import { NextResponse } from "next/server";
import { db, pool } from "../../../db/clients";
import { sql } from "drizzle-orm";
import { badges } from "../../../db/schema";

export async function GET() {
  try {
    const now = await pool.query("SELECT NOW() AS now");
    const rows = await db.select({ count: sql<number>`count(*)` }).from(badges);

    return NextResponse.json({
      ok: true,
      now: now.rows[0]?.now,
      badgesCount: Number(rows[0]?.count ?? 0),
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
