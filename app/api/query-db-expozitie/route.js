import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET() {
  const client = await db.connect()
  try {
    const result = await client.sql`SELECT * FROM paintings;`
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    await client.end()
  }
}
