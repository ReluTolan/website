"use client"
import { useState } from "react"
import { FiMenu } from "react-icons/fi"
import Link from "next/link"
import "../globals.css"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <FiMenu className="hamburger" onClick={() => setIsOpen(!isOpen)} />
      <ul className={`navbar-list ${isOpen ? "open" : ""}`}>
        <li className="navbar-item">
          <Link
            href="/"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Acasa
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            href="/expozitie/artisti"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Expozitie cu vanzare
          </Link>
        </li>

        <li className="navbar-item">
          <Link
            href="/piata"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Piata de vechi
          </Link>
        </li>

        <li className="navbar-item">
          <Link
            href="/cum-cumpar-vand"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Cum cumpar / cum vand
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            href="/pastila-de-ia"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Pastila de IA
          </Link>
        </li>
      </ul>
    </nav>
  )
}
