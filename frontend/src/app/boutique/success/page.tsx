"use client"
import { successSessionCheckout } from "@/service/shop"
import { getCrownsPackages } from "@/service/shop"
import { useEffect, useState } from "react"
import BoutiquePage from "../components/boutique-page"

export default function ShopPage() {
  const [crownPackages, setCrownPackages] = useState([])

  useEffect(() => {
    async function successCheckout() {
      const sessionId = new URLSearchParams(window.location.search).get("session_id")

      if (sessionId) {
        await successSessionCheckout(sessionId)
      }
    }

    async function fetchPackages() {
      try {
        const data = await getCrownsPackages()
        console.log(data)
        setCrownPackages(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des crown packages :", error)
      }
    }

    fetchPackages()
    successCheckout()
  }, [])

  return <BoutiquePage crownPackages={crownPackages} />
}
