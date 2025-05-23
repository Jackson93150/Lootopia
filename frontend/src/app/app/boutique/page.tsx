"use client"
import { getCrownsPackages } from "@/service/shop"
import { useEffect, useState } from "react"
import Shop from "../../../components/boutique/boutique-page"

export default function ShopPage() {
  const [crownPackages, setCrownPackages] = useState([])

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await getCrownsPackages()
        setCrownPackages(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des crown packages :", error)
      }
    }

    fetchPackages()
  }, [])

  return <Shop crownPackages={crownPackages} />
}
