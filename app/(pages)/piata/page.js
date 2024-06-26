"use client"

import { useState, useEffect } from "react"
import ImagePainting from "@/app/components/expozitie/ImagePainting"
import Sidebar from "@/app/components/expozitie/SidebarPiata"
import Link from "next/link"
import "@/app/(pages)/page-styles.css"

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true) // Add state to track sidebar openness

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
        setAllProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const newFilteredProducts = allProducts.filter(product => {
      return (
        searchTerm === "" ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

    setFilteredProducts(newFilteredProducts)
  }, [searchTerm, allProducts])

  return (
    <div className="Ip-align">
      <Sidebar onSearchChange={setSearchTerm} />
      <div style={{ marginTop: "100px" }}>
        <div className="align-painter-buttons">
          <button className="painter-buttons" style={{ marginBottom: "20px" }}>
            <Link href="/adaugare-piata">Adaugare</Link>
          </button>
        </div>

        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link href={`./piata/${product.id}`} key={product.id}>
              {/* Changed from Link to div for simplicity, adjust as needed */}
              <ImagePainting
                src={product.primary_image}
                alt={product.title}
                title={product.title}
                description={product.description}
                price={product.price}
                // Handle other props as needed
              />
            </Link>
          ))
        ) : (
          <p>No products to show.</p>
        )}
      </div>
    </div>
  )
}

export default ProductPage
