import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import mime from "mime-types"

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
})

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file
  const contentType = mime.lookup(fileName) || "application/octet-stream"
  const key = `images/${fileName}-${Date.now()}`

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  // Construct the URL for the uploaded image
  // Note: This URL format assumes the bucket is not configured for a custom domain.
  // Adjust accordingly if you're using a custom domain.
  const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`
  return imageUrl
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const imageUrl = await uploadFileToS3(buffer, file.name)

    // Return the image URL in the response
    return NextResponse.json({ success: true, imageUrl })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
