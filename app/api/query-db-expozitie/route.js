import { db } from "@vercel/postgres"
const client = await db.connect()
import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await sql`SELECT * FROM paintings;`
    // Add cache-control header to disable caching
    const response = NextResponse.json(result.rows)
    response.headers.set("Cache-Control", "no-store")
    return response
  } catch (error) {
    const response = NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
    response.headers.set("Cache-Control", "no-store")
    return response
  }
}
