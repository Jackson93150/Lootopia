export async function safeJson(res: Response) {
  const text = await res.text()
  if (!text) return null

  try {
    return JSON.parse(text)
  } catch (err) {
    console.error("Erreur de parsing JSON :", err)
    return null
  }
}
