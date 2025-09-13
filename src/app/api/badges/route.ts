import { NextResponse } from "next/server";
import { db } from "@/db/clients";
import { badges } from "@/db/schema";

export async function GET() {
  const rows = await db.select().from(badges);
  return NextResponse.json(rows);
}
