"use client"
import "@/app/(pages)/page-styles.css"
import { FiMenu, FiX } from "react-icons/fi"
import { useState } from "react"

const Sidebar = ({
  onSearchChange,
  onSizeChange,
  onPriceChange,
  painters,
  onPainterChange,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-relative">
        <input
          type="text"
          placeholder="Cauta tablouri..."
          onChange={event => onSearchChange(event.target.value)}
        />

        {/* Painters dropdown */}
        <div>
          <h4>Pictor</h4>
          <select
            onChange={event => onPainterChange(event.target.value)}
            defaultValue=""
          >
            <option value="">Toti pictorii</option>
            {painters.map((painter, index) => (
              <option key={index} value={painter}>
                {painter}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h4>Dimensiune</h4>
          {/* Size options */}
          {["mic", "mediu", "mare"].map(sizeOption => (
            <label key={sizeOption}>
              <input
                type="radio"
                name="size"
                value={sizeOption}
                onChange={event => onSizeChange(event.target.value)}
              />
              {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
            </label>
          ))}
        </div>

        <div>
          <h4>Pret</h4>
          {/* Price options */}
          {["0-1000", "1000-2000", "2000-3500", "3500+"].map(priceRange => (
            <label key={priceRange}>
              <input
                type="radio"
                name="price"
                value={priceRange}
                onChange={event => onPriceChange(event.target.value)}
              />
              {priceRange}
            </label>
          ))}
        </div>

        <div className="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
