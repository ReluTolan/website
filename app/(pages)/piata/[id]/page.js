"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import "@/app/(pages)/page-styles.css"

const ImageDetails = ({ params }) => {
  const [data, setData] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newDescription, setNewDescription] = useState("")

  useEffect(() => {
    if (selectedImage) {
      window.history.pushState(null, null, window.location.pathname)
    }
  }, [selectedImage])

  useEffect(() => {
    const handlePopState = () => {
      setSelectedImage(null)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/query-db-piata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const painting = data.find(p => p.id == params.id)

  const handleEditClick = () => {
    setNewDescription(painting.description)
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `/api/update-piata-description/${painting.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: newDescription }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update description")
      }

      const updatedPainting = await response.json()
      setData(
        data.map(p => (p.id === updatedPainting.id ? updatedPainting : p))
      )
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  // Handle the onClick event of an image
  const handleImageClick = img => {
    setSelectedImage(img)
  }

  const handlePrevClick = () => {
    const currentIndex = [
      painting.primary_image,
      ...painting.sub_images,
    ].indexOf(selectedImage)
    setSelectedImage(
      currentIndex > 0
        ? [painting.primary_image, ...painting.sub_images][currentIndex - 1]
        : [painting.primary_image, ...painting.sub_images][
            painting.sub_images.length
          ]
    )
  }

  const handleNextClick = () => {
    const currentIndex = [
      painting.primary_image,
      ...painting.sub_images,
    ].indexOf(selectedImage)
    setSelectedImage(
      currentIndex < painting.sub_images.length
        ? [painting.primary_image, ...painting.sub_images][currentIndex + 1]
        : painting.primary_image
    )
  }

  if (!painting) {
    return <p>No painting found with id {params.id}</p>
  }

  // If a painting is found, display its details
  return (
    <div className="Id-all" style={{ marginTop: "100px" }}>
      <h1>{painting.title}</h1>
      <Image
        className="Id-frame"
        src={painting.primary_image}
        alt={painting.title}
        width={300}
        height={300}
        layout="responsive"
        onClick={() => handleImageClick(painting.primary_image)}
      />
      <p>
        <b>Nume vanzator:</b> {painting.prenume}
      </p>
      <p>
        <b>Email:</b> {painting.email}
      </p>
      <p>
        <b>Telefon:</b> {painting.phone}
      </p>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <p>
          {painting.description}
          <button onClick={handleEditClick}>Edit</button>
        </p>
      )}

      <p style={{ fontSize: "50px", color: "red" }}>
        <b>Pret:</b> {painting.price} lei
      </p>

      <div className="Id-big-cont">
        {painting.sub_images &&
          painting.sub_images.map((img, index) => (
            <Image
              key={index}
              className="Id-big"
              src={img}
              alt={painting.title}
              width={300}
              height={300}
              layout="responsive"
              onClick={() => handleImageClick(img, index)} // Pass the index to handleImageClick
            />
          ))}
      </div>
      {/* Display the modal with the selected image */}
      {selectedImage && (
        <div className="modal">
          <span className="close" onClick={() => setSelectedImage(null)}>
            &times;
          </span>
          <button className="cycle" onClick={handlePrevClick}>
            Inapoi
          </button>
          <button className="cycle" onClick={handleNextClick}>
            Inainte
          </button>
          <Image
            className="modal-content"
            src={selectedImage} // Use selectedImage to get the image
            alt={painting.title}
            layout="fill"
          />
        </div>
      )}
      <button className="painter-buttons" style={{ marginTop: "20px" }}>
        <Link href={`/delete-piata/${painting.id}`}>Sterge pagina</Link>
      </button>
    </div>
  )
}

export default ImageDetails
