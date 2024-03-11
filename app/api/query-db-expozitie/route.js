import { db } from "@vercel/postgres"
const client = await db.connect()
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await client.sql`SELECT * FROM paintings;`
    const response = new NextResponse()
    response.body = result.rows
    response.headers.set("Cache-Control", "s-maxage=0, stale-while-revalidate")
    return response
  } catch (error) {
    const response = new NextResponse()
    response.body = { error: error.message }
    response.status = 500
    response.headers.set("Cache-Control", "s-maxage=0, stale-while-revalidate")
    return response
  }
}
