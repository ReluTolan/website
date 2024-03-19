"use client"
import { useState } from "react"

function SubmitForm() {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const handleImageChange = e => {
    setImage(e.target.files[0])
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleContentChange = e => {
    setContent(e.target.value)
  }

  // upload image to and retreiv the url
  const uploadImage = async () => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("sourcePage", "pastila")

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      return data.imageUrl // Assuming the response includes the URL in a `url` field
    } catch (error) {
      console.error("Failed to upload image", error)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Upload the image and get the URL
    const imageUrl = await uploadImage()
    setImageUrl(imageUrl) // Update state if needed

    // Now, submit the title, content, and imageUrl to your database
    try {
      const response = await fetch("/api/insert-pastila", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          title,
          content,
        }),
      })
      const data = await response.json()

      if (response.ok) {
        // Use window alert for success message
        alert(data.message || "Form successfully submitted!")
      } else {
        throw new Error(data.error || "An unknown error occurred")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form style={{ marginTop: "100px" }} onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Content"
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default SubmitForm
