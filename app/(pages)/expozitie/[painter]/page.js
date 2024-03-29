"use client"

import { useState, useEffect } from "react"
import ImagePainting from "@/app/components/expozitie/ImagePainting"
import Sidebar from "@/app/components/expozitie/Sidebar"
import Link from "next/link"
import "@/app/(pages)/page-styles.css"

const getSizeCategory = sizeCm => {
  if (!sizeCm) return "unknown"

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
  const [selectedPainter, setSelectedPainter] = useState("Aurelia Stepan")
  const [filteredPaintings, setFilteredPaintings] = useState([])
  const [allPaintings, setAllPaintings] = useState([])
  const [painters, setPainters] = useState([])
  const [availability, setAvailability] = useState("disponibile")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using POST method instead of GET
        const response = await fetch(`/api/query-db-expozitie`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
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

      if (!painting.title) {
        painting.title = ""
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
    <div className="Ip-align">
      <Sidebar
        onSearchChange={setSearchTerm}
        onSizeChange={setSize}
        onPriceChange={setPrice}
        painters={painters}
        onPainterChange={setSelectedPainter}
        selectedPainter={selectedPainter} // default painter when the page loads (Aurelia Stepan)
      />
      <div style={{ marginTop: "100px" }}>
        <div className="align-painter-buttons">
          <button className="painter-buttons" style={{ marginBottom: "15px" }}>
            <Link href="/adaugare">Adăugare creații artistice</Link>
          </button>

          <div style={{ marginBottom: "15px" }}>
            <button
              onClick={() => setAvailability("disponibile")}
              className="painter-buttons"
              style={{ marginRight: "10px" }}
            >
              Disponibile
            </button>
            <button
              onClick={() => setAvailability("indisponibile")}
              className="painter-buttons"
            >
              Vândute
            </button>
          </div>
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
    </div>
  )
}

export default PainterPage
