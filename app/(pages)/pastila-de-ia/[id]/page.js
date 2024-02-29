"use client"

import { useState, useEffect } from "react"
import "@/app/(pages)/page-styles.css"

const Page = ({ params }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/query-db-pastila")
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const pastila = data.find(p => p.id == params.id)

  if (!pastila) {
    return <div style={{ marginTop: "100px" }}>Se incarca...</div> // or some other placeholder content
  }

  return (
    <div className="pastila-focus" style={{ marginTop: "100px" }}>
      <img src={pastila.image} alt="" />
      <h1>{pastila.title}</h1>
      <p>{pastila.content}</p>
    </div>
  )
}

export default Page