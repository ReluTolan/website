"use client"

import { useState, useEffect } from "react"
import ImagePainting from "@/app/components/expozitie/ImagePainting"
import Sidebar from "@/app/components/expozitie/Sidebar"
import Link from "next/link"

const getSizeCategory = sizeCm => {
  const [width, height] = sizeCm.split("x").map(Number)
  const area = width * height
  if (area <= 2000) return "mic"
  if (area <= 5000) return "mediu"
  return "mare"
}

const PainterPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [size, setSize] = useState("")
  const [price, setPrice] = useState("")
  const [selectedPainter, setSelectedPainter] = useState("")
  const [filteredPaintings, setFilteredPaintings] = useState([])
  const [allPaintings, setAllPaintings] = useState([])
  const [painters, setPainters] = useState([])
  const [availability, setAvailability] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/query-db-expozitie", {
          cache: "no-store",
        })
        const data = await response.json()
        setAllPaintings(data)

        // Extract and deduplicate painter names
        const uniquePainters = [
          ...new Set(data.map(painting => painting.painter)),
        ]
        setPainters(uniquePainters)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const newFilteredPaintings = allPaintings.filter(painting => {
      let minPrice, maxPrice
      if (price === "3500+") {
        minPrice = 3500
        maxPrice = Infinity
      } else {
        ;[minPrice, maxPrice] = price.split("-").map(Number)
      }
      const sizeCategory = getSizeCategory(painting.size)

      // Determine if the painting matches the availability filter
      let matchesAvailability = true
      if (availability === "disponibile") {
        // Check if description does not contain "indisponib" base
        matchesAvailability = !painting.description
          .toLowerCase()
          .includes("indisponib")
      } else if (availability === "indisponibile") {
        // Check if description contains "indisponib" base
        matchesAvailability = painting.description
          .toLowerCase()
          .includes("indisponib")
      }

      // Combine availability check with other filtering conditions
      return (
        (selectedPainter === "" || painting.painter === selectedPainter) &&
        matchesAvailability && // Check if painting matches availability filter
        (price
          ? maxPrice
            ? painting.price >= minPrice && painting.price <= maxPrice
            : painting.price >= minPrice
          : true) && // Price range filter
        (searchTerm === "" ||
          painting.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (size === "" || sizeCategory === size) // Size filter
      )
    })

    setFilteredPaintings(newFilteredPaintings)
  }, [price, searchTerm, size, allPaintings, selectedPainter, availability])

  return (
    <>
      <Sidebar
        onSearchChange={setSearchTerm}
        onSizeChange={setSize}
        onPriceChange={setPrice}
        painters={painters} // Pass painters to Sidebar
        onPainterChange={setSelectedPainter} // Handle painter selection
      />
      <div style={{ marginTop: "100px" }}>
        <button style={{ display: "block", marginLeft: "45%" }}>
          <Link href="/adaugare">Adaugare tablouri</Link>
        </button>

        <div>
          <button onClick={() => setAvailability("disponibile")}>
            Disponibile
          </button>
          <button onClick={() => setAvailability("indisponibile")}>
            Indisponibile
          </button>
        </div>

        {filteredPaintings.length > 0 ? (
          filteredPaintings.map(painting => (
            <Link
              href={`./${painting.painter}/${painting.id}`}
              key={painting.id}
            >
              {" "}
              <ImagePainting
                key={painting.id}
                src={painting.primary_image}
                alt={painting.title}
                title={painting.title}
                category={painting.category}
                description={painting.description}
                size={painting.size}
                price={painting.price}
              />
            </Link>
          ))
        ) : (
          <p>No paintings to show.</p>
        )}
      </div>
    </>
  )
}

export default PainterPage
