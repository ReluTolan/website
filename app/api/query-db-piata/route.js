import { db } from "@vercel/postgres"
const client = await db.connect()
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await client.sql`SELECT * FROM piata;`
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
