import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function POST(request) {
  const { imageUrl, title, content } = await request.json()

  try {
    await sql`INSERT INTO pastila (image, title, content) 
      VALUES (${imageUrl}, ${title}, ${content});`
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  const success = { message: "Formularul a fost incarcat cu succes!" }
  return NextResponse.json(success, { status: 200 })
}
