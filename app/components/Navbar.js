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
          <Link href="/" className="navbar-link">
            Acasa
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/expozitie/Aurelia" className="navbar-link">
            Expozitie cu vanzare
          </Link>
        </li>

        <li className="navbar-item">
          <Link href="/adaugare" className="navbar-link">
            Adaugare tablouri
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/constignatie" className="navbar-link">
            Piata de vechi
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/adaugare-piata" className="navbar-link">
            Adaugare piata
          </Link>
        </li>

        <li className="navbar-item">
          <Link href="/istoria-artei" className="navbar-link">
            Cum cumpar
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/pastila-de-ia" className="navbar-link">
            Pastila de IA
          </Link>
        </li>
      </ul>
    </nav>
  )
}
