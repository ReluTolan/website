import { db } from "@vercel/postgres"
const client = await db.connect()
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
})

// ... (import statements remain the same)

export async function DELETE(request, { params }) {
  try {
    const result =
      await client.sql`SELECT primary_image, sub_images FROM paintings WHERE id = ${params.id};`
    const primary_image = result.rows[0]?.primary_image
    const sub_images = result.rows[0]?.sub_images || []

    const subImagesArray = Array.isArray(sub_images)
      ? sub_images
      : JSON.parse(sub_images)

    const allImages = [primary_image, ...subImagesArray].filter(Boolean)

    // Delete images from S3
    await Promise.all(
      allImages.map(async image => {
        const key = image.replace(
          "https://relu-stepan.s3.eu-north-1.amazonaws.com/",
          ""
        )
        const deleteParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key,
        }
        await s3Client.send(new DeleteObjectCommand(deleteParams))
      })
    )

    // Once all images are deleted, remove the entry from the database
    await client.sql`DELETE FROM paintings WHERE id = ${params.id};`

    // Respond with a JSON object to indicate success
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    // Respond with a JSON object to indicate error
    return NextResponse.json({ success: false, error: e.message })
  }
}
