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

async function uploadFileToS3(file, fileName, sourceFolder) {
  const fileBuffer = file
  const contentType = mime.lookup(fileName) || "application/octet-stream"
  // Dynamically set the folder based on the source page
  const key = `${sourceFolder}/${fileName}-${Date.now()}`

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  // Construct the URL for the uploaded image
  const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`
  return imageUrl
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")
    // Extract the sourcePage identifier; default to 'unknown' if not provided
    const sourcePage = formData.get("sourcePage") || "unknown"

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    // Pass the buffer, file name, and source folder to the upload function
    const imageUrl = await uploadFileToS3(buffer, file.name, sourcePage)

    // Return the image URL in the response
    return NextResponse.json({ success: true, imageUrl })
  } catch (error) {
    // Provide a more descriptive error message in the JSON response
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
