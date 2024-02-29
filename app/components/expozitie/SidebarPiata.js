"use client"
import "@/app/(pages)/page-styles.css"
import { FiMenu, FiX } from "react-icons/fi"
import { useState } from "react"

const Sidebar = ({ onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-relative">
        <input
          type="text"
          placeholder="Search..."
          onChange={event => onSearchChange(event.target.value)}
        />
        <div className="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
