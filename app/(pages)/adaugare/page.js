"use client"

import React, { useState, useRef } from "react"
import "../page-styles.css"
import ErrorMessageModal from "@/app/components/ErrorModal"

export default function PaintForm() {
  const [painter, setPainter] = useState("")
  const [subImages, setSubImages] = useState([null]) // Initialize with null for file inputs
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [size, setSize] = useState("")
  const [price, setPrice] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [primaryImageFileName, setPrimaryImageFileName] = useState("")
  const [subImageFileNames, setSubImageFileNames] = useState([])

  const primaryImageFileRef = useRef(null)
  const subImageFileRefs = useRef([])

  const handlePrimaryImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setPrimaryImageFileName(file.name)
    } else {
      setPrimaryImageFileName("")
    }
  }

  const handleSubImageChange = index => e => {
    const files = e.target.files
    if (files.length > 0) {
      const file = files[0]
      subImageFileRefs.current[index] = file // Keep storing the file object
      // Update the file name in the state
      const newFileNames = [...subImageFileNames]
      newFileNames[index] = file.name
      setSubImageFileNames(newFileNames)
    } else {
      // Reset the file name at this index if no file is selected
      const newFileNames = [...subImageFileNames]
      newFileNames[index] = undefined // Or use "" to clear the name
      setSubImageFileNames(newFileNames)
    }
  }

  // Handle click on "Add sub-image" button
  const handleAddSubImage = () => {
    setSubImages([...subImages, null]) // Just to trigger a new input field
    subImageFileRefs.current.push(null)
  }

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault()

    const sizeRegex = /^\d+x\d+$/
    if (!sizeRegex.test(size)) {
      setError(
        "Dimensiunea trebuie să fie în formatul 'număr x număr' (exemplu: 10x10, 100x200, etc). Fara spatii sau alte caractere (doar cifre si x)."
      )
      return // Stop the form submission
    }

    // Upload primary image
    const primaryImageFile = primaryImageFileRef.current.files[0]
    if (!primaryImageFile) {
      setError("Trebuie sa selectezi imaginea de baza.")
      return
    }
    let primaryImageUrl = ""
    if (primaryImageFile) {
      const formDataPrimary = new FormData()
      formDataPrimary.append("file", primaryImageFile)
      try {
        const primaryImageResponse = await fetch("/api/s3-upload", {
          method: "POST",
          body: formDataPrimary,
        })
        if (!primaryImageResponse.ok) {
          setError(`Imaginea principala a refuzat sa fie incarcata.`)
          return
        } else {
          const primaryImageBlob = await primaryImageResponse.json()
          primaryImageUrl = primaryImageBlob.imageUrl
        }
      } catch (error) {
        console.error(
          "O prostie de eroare de la server (nu e vina website-ului): ",
          error
        )
        setError(
          "Imaginea principala a refuzat sa fie incarcata. Eroare probabil de la internet."
        )
      }
    }

    // Upload sub-images
    const subImageUploadPromises = subImageFileRefs.current.map(
      async (file, index) => {
        if (!file) return null
        const formDataSub = new FormData()
        formDataSub.append("file", file)
        try {
          const subImageResponse = await fetch("/api/s3-upload", {
            method: "POST",
            body: formDataSub,
          })
          const subImageBlob = await subImageResponse.json()
          return subImageBlob.imageUrl
        } catch (error) {
          console.error(`Error uploading sub image ${index + 1}:`, error)
          return null
        }
      }
    )

    const subImageUrls = await Promise.all(subImageUploadPromises)

    // Filter out any null values in case there were upload errors
    const filteredSubImageUrls = subImageUrls.filter(url => url !== null)

    // Construct form data with updated image URLs
    const formData = {
      painter,
      primaryImage: primaryImageUrl,
      subImages: filteredSubImageUrls,
      title,
      description,
      size,
      price,
      email,
      phoneNumber,
    }

    // Submit form data
    try {
      const response = await fetch("/api/insert-paintings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Success:", result)
        // Optionally reset the form or provide user feedback
      } else {
        console.error("Error:", response.statusText)
        // Handle HTTP error responses
      }
    } catch (error) {
      console.error("Error:", error)
      // Handle network errors
    }
  }

  return (
    <div style={{ backgroundColor: "#3F577D", height: "100vh" }}>
      <ErrorMessageModal message={error} onClose={() => setError("")} />
      <div className="paintings-form">
        <form onSubmit={handleSubmit} style={{ marginTop: "150px" }}>
          <input
            type="text"
            value={painter}
            onChange={e => setPainter(e.target.value)}
            placeholder="Pictor"
            required
          />
          <label className="file-label" style={{ marginBottom: "20px" }}>
            {primaryImageFileName
              ? `Imagine selectată: ${primaryImageFileName}`
              : "Imaginea principală a picturii"}
            <input
              type="file"
              className="file-input"
              ref={primaryImageFileRef}
              onChange={handlePrimaryImageChange}
            />
          </label>

          {subImages.map((_, index) => (
            <label
              className="file-label"
              style={{ marginBottom: "20px" }}
              key={index}
            >
              {subImageFileNames[index]
                ? `Imagine adiacentă selectată: ${subImageFileNames[index]}`
                : `Imagine adiacentă ${index + 1}`}
              <input
                type="file"
                className="file-input"
                onChange={handleSubImageChange(index)}
              />
            </label>
          ))}

          <button type="button" onClick={handleAddSubImage}>
            Adauga imagini adiacente
          </button>

          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titlu"
            required
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descriere"
            required
          ></textarea>
          <input
            type="text"
            value={size}
            onChange={e => setSize(e.target.value)}
            placeholder="Dimensiune"
            required
          />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Preț"
            required
          />

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="tel"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="Număr de telefon"
            required
          />

          <button type="submit">Trimite</button>
        </form>
      </div>
    </div>
  )
}
