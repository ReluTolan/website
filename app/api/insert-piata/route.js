import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function POST(request) {
  const {
    nume,
    prenume,
    primaryImage,
    subImages,
    title,
    description,
    price,
    email,
    phoneNumber,
  } = await request.json()

  const priceInt = parseInt(price, 10)

  try {
    // Validate required fields
    if (
      !nume ||
      !prenume ||
      !primaryImage ||
      !title ||
      !description ||
      !price ||
      !email ||
      !phoneNumber
    ) {
      throw new Error("Missing required fields")
    }

    // Insert the new product into the 'piata' table
    await sql`INSERT INTO piata (nume, prenume, primary_image, sub_images, title, description, price, email, phone) 
      VALUES (${nume}, ${prenume}, ${primaryImage}, ${JSON.stringify(
      subImages
    )}, ${title}, ${description}, ${priceInt}, ${email}, ${phoneNumber});`
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Optionally, retrieve and return the newly inserted product or a success message
  return NextResponse.json(
    { success: true, message: "Produs adaugat cu succes!" },
    { status: 200 }
  )
}
