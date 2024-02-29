import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function POST(request) {
  const {
    painter,
    primaryImage,
    subImages,
    title,
    description,
    size,
    price,
    email,
    phoneNumber,
  } = await request.json()
  const priceInt = parseInt(price, 10)

  try {
    if (
      !painter ||
      !primaryImage ||
      !title ||
      !description ||
      !size ||
      !price ||
      !email ||
      !phoneNumber
    ) {
      throw new Error("Missing required fields")
    }

    await sql`INSERT INTO paintings (painter, primary_image, sub_images, title, description, size, price, email, phone_number) 
      VALUES (${painter}, ${primaryImage}, ${JSON.stringify(
      subImages
    )}, ${title}, ${description}, ${size}, ${priceInt}, ${email}, ${phoneNumber});`
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const success = { message: "Formularul a fost incarcat cu succes!" }
  return NextResponse.json(success, { status: 200 })
}
