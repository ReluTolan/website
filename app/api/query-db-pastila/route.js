import { db } from "@vercel/postgres"
const client = await db.connect()
import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const result = await sql`SELECT * FROM pastila;`
    const response = NextResponse.json(result.rows)
    return response
  } catch (error) {
    const response = NextResponse.json({ error: error.message })
    return response
  }
}
