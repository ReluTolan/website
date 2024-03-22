"use client"

import { useState, useEffect } from "react"
//import { paintings } from "@/app/test-db/expuse"
import Image from "next/image"
import Link from "next/link"

const ImageDetails = ({ params }) => {
  const [data, setData] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newDescription, setNewDescription] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/query-db-expozitie`, {
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
      const response = await fetch(`/api/update-available/${painting.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newDescription }),
      })

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
  const handleImageClick = (img, index) => {
    setSelectedImageIndex(index)
  }

  const handlePrevClick = () => {
    setSelectedImageIndex(
      selectedImageIndex > 0
        ? selectedImageIndex - 1
        : painting.sub_images.length - 1
    )
  }

  const handleNextClick = () => {
    setSelectedImageIndex(
      selectedImageIndex < painting.sub_images.length - 1
        ? selectedImageIndex + 1
        : 0
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
        <b>Pictor: </b>
        {painting.painter}
      </p>
      <p>Comenzi la:</p>
      <p>
        <b>Email: </b>
        {painting.email}
      </p>
      <p>sau</p>
      <p>
        <b>Telefon: </b>
        {painting.phone_number}
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
        <div style={{ whiteSpace: "pre-wrap" }}>
          {painting.description}
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}

      <p>
        <b>Dimensiune:</b> {painting.size}
      </p>
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
      {selectedImageIndex !== null && (
        <div className="modal">
          <span className="close" onClick={() => setSelectedImageIndex(null)}>
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
            src={painting.sub_images[selectedImageIndex]} // Use selectedImageIndex to get the image
            alt={painting.title}
            layout="fill"
          />
        </div>
      )}

      <button>
        <Link href={`/delete-painting/${painting.id}`}>Delete admin</Link>
      </button>
    </div>
  )
}

export default ImageDetails
