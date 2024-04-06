"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import "@/app/(pages)/page-styles.css"

const Page = () => {
  const [pastilas, setPastilas] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/query-db-pastila", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })
        const data = await response.json()
        setPastilas(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Link href={"/adaugare-pastila"}>
          <button className="painter-buttons" style={{ marginTop: "100px" }}>
            Adaugare admin
          </button>
        </Link>
        <h2 style={{ marginBottom: "10px" }}>
          Consumul moderat de IA (inteligență artificială) îmbunătățește
          calitatea vieții !
        </h2>
        <h2>
          Consumul excesiv de IA poate dăuna grav moralității și/sau
          obiectivității !
        </h2>
      </div>
      {pastilas.map((pastila, index) => (
        <div
          key={index}
          style={{
            marginBottom: "10px",
            border: "2px solid black",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h1>{pastila.title}</h1>
          <Link href={`/pastila-de-ia/${pastila.id}`}>
            {pastila.content.split(".", 1)[0]}.
          </Link>
        </div>
      ))}
    </>
  )
}

export default Page
