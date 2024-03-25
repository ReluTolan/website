"use client"

import React, { useState, useRef } from "react"
import "../page-styles.css"
import ErrorMessageModal from "@/app/components/ErrorModal"
import Link from "next/link"

const sanitizeFolderName = (nume, prenume) => {
  const folderName = `${nume}_${prenume}`.toLowerCase()
  return folderName.replace(/[^a-z0-9_]/g, "")
}

export default function ProductForm() {
  const [nume, setNume] = useState("")
  const [prenume, setPrenume] = useState("")
  const [primaryImageFileName, setPrimaryImageFileName] = useState("")
  const [subImages, setSubImages] = useState([null])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [subImageFileNames, setSubImageFileNames] = useState([])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const primaryImageFileRef = useRef(null)
  const subImageFileRefs = useRef([])

  const setErrorWithReset = newError => {
    setError("")
    setTimeout(() => setError(newError), 0)
  }

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

  const handleAddSubImage = () => {
    setSubImages([...subImages, null]) // Just to trigger a new input field
    subImageFileRefs.current.push(null)
  }

  const handleSubmit = async e => {
    if (isSubmitting) return
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    if (!termsAccepted || !dataProcessingAccepted) {
      setErrorWithReset(
        "Pentru a trimite formularul, trebuie sa fiti de acord cu termenii si conditiile si cu prelucrarea datelor."
      )
      setIsSubmitting(false)
      return
    }
    const folderName = sanitizeFolderName(nume, prenume)

    // Upload primary image
    const primaryImageFile = primaryImageFileRef.current.files[0]
    if (!primaryImageFile) {
      setErrorWithReset("Trebuie sa selectezi imaginea de baza.")
      setIsSubmitting(false)
      return
    }

    let primaryImageUrl = ""
    if (primaryImageFile) {
      const formDataPrimary = new FormData()
      formDataPrimary.append("file", primaryImageFile)
      formDataPrimary.append("sourcePage", folderName) // Specify the source page
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
        console.error("Error uploading primary image: ", error)
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
        formDataSub.append("sourcePage", folderName) // Specify the source page for each sub-image
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
    const filteredSubImageUrls = subImageUrls.filter(url => url !== null)

    // Construct form data with updated image URLs
    const formData = {
      nume,
      prenume,
      primaryImage: primaryImageUrl,
      subImages: filteredSubImageUrls,
      title,
      description,
      price, // Ensure price is correctly formatted as a number
      email,
      phoneNumber,
    }

    // Submit form data to your API
    try {
      const response = await fetch("/api/insert-piata", {
        // Ensure this endpoint matches your API for inserting products
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        setError(result.message)
        console.log(result.message)
      } else {
        console.error("Error:", response.statusText)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ backgroundColor: "#3F577D", height: "100%" }}>
      <ErrorMessageModal message={error} onClose={() => setError("")} />
      <div className="paintings-form">
        <form onSubmit={handleSubmit} style={{ marginTop: "150px" }}>
          {/* Nume input */}
          <input
            type="text"
            value={nume}
            onChange={e => setNume(e.target.value)}
            placeholder="Nume"
            required
          />
          {/* Prenume input */}
          <input
            type="text"
            value={prenume}
            onChange={e => setPrenume(e.target.value)}
            placeholder="Prenume"
            required
          />

          {/* Primary Image Upload */}
          <label className="file-label" style={{ marginBottom: "20px" }}>
            {primaryImageFileName
              ? `Imagine selectată: ${primaryImageFileName}`
              : "Imaginea principală"}
            <input
              type="file"
              className="file-input"
              ref={primaryImageFileRef}
              onChange={handlePrimaryImageChange}
              required
            />
          </label>

          {/* Sub Images Upload */}
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
            Adaugă imagine adiacentă
          </button>

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titlu"
            required
          />

          {/* Description textarea */}
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descriere"
            required
          ></textarea>

          {/* Price input */}
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Preț"
            required
          />

          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          {/* Phone Number input */}
          <input
            type="tel"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="Număr de telefon"
            required
          />

          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={e => setTermsAccepted(e.target.checked)}
            />
            Accept
            <Link
              href="/termeni-si-conditii"
              style={{ textDecoration: "underline" }}
              target="_blank"
            >
              {" "}
              termenii si conditiile.
            </Link>
          </label>

          <label>
            <input
              type="checkbox"
              checked={dataProcessingAccepted}
              onChange={e => setDataProcessingAccepted(e.target.checked)}
            />
            Am fost informat privind{" "}
            <Link
              href={"/acord-de-prelucrare"}
              style={{ textDecoration: "underline" }}
              target="_blank"
            >
              {" "}
              prelucrarea datelor personale.{" "}
            </Link>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ display: "block" }}
          >
            {isSubmitting
              ? "In acest moment formularul se trimite."
              : "Trimite"}
          </button>
        </form>
      </div>
    </div>
  )
}
