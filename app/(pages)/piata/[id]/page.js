"use client"

import { useState, useEffect } from "react"
//import { paintings } from "@/app/test-db/expuse"
import Image from "next/image"
import Link from "next/link"

const ImageDetails = ({ params }) => {
  const [data, setData] = useState([])
  // Create a state variable to keep track of the currently selected image
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/query-db-piata")
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const painting = data.find(p => p.id == params.id)

  if (!painting) {
    return <p>No painting found with id {params.id}</p>
  }

  // Handle the onClick event of an image
  const handleImageClick = img => {
    setSelectedImage(img)
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
      <p>{painting.prenume}</p>
      <p>{painting.description}</p>
      <p>Price: {painting.price}</p>
      <div className="Id-big-cont">
        {painting.sub_images.map((img, index) => (
          <Image
            key={index}
            className="Id-big"
            src={img}
            alt={painting.title}
            width={300}
            height={300}
            layout="responsive"
            onClick={() => handleImageClick(img)}
          />
        ))}
      </div>
      {/* Display the modal with the selected image */}
      {selectedImage && (
        <div className="modal">
          <span className="close" onClick={() => setSelectedImage(null)}>
            &times;
          </span>
          <Image
            className="modal-content"
            src={selectedImage}
            alt={painting.title}
            layout="fill"
          />
        </div>
      )}

      <button>
        <Link href={`/delete-piata/${painting.id}`}>Delete admin</Link>
      </button>
    </div>
  )
}

export default ImageDetails
