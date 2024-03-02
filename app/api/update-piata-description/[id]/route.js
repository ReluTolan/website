import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function PUT(request, { params }) {
  const { description } = await request.json()
  try {
    await sql`UPDATE piata SET description = ${description} WHERE id = ${params.id};`
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message })
  }
}
