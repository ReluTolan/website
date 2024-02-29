"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const Page = () => {
  const [pastilas, setPastilas] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/query-db-pastila")
      const data = await response.json()
      setPastilas(data)
    }

    fetchData().catch(console.error)
  }, [])

  return (
    <>
      <Link href={"/adaugare-pastila"}>
        <button style={{ marginTop: "100px" }}>Adaugare admin</button>
      </Link>
      {pastilas.map((pastila, index) => (
        <div
          key={index}
          style={{
            marginBottom: "10px",
            border: "2px solid black",
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
