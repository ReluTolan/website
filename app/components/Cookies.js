"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"

function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleConsent = () => {
    localStorage.setItem("cookie-consent", "true")
    setShowConsent(false)
  }

  if (!showConsent) {
    return null
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "lightgray",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <p>
        We use cookies to improve your experience. By using our site, you agree
        to our use of{" "}
        <Link
          href="/acord-de-prelucrare"
          style={{ textDecoration: "underline" }}
        >
          data processing
        </Link>{" "}
        and{" "}
        <Link
          href="termeni-si-conditii"
          style={{ textDecoration: "underline" }}
        >
          terms and conditions.
        </Link>
      </p>
      <button onClick={handleConsent}>I Understand</button>
    </div>
  )
}

export default CookieConsent
