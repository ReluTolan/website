import { db } from "@vercel/postgres"
const client = await db.connect()
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await client.sql`SELECT * FROM paintings;`
    return new NextResponse.json(result.rows).withHeader(
      "Cache-Control",
      "s-maxage=0, stale-while-revalidate"
    )
  } catch (error) {
    return new NextResponse.json(
      { error: error.message },
      { status: 500 }
    ).withHeader("Cache-Control", "s-maxage=0, stale-while-revalidate")
  }
}
