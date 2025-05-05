import { firebaseAuth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export type HttpMethod = "GET" | "PATCH" | "POST"

export interface FetchBackendArgs {
  method?: HttpMethod
  endpoint: string
  body?: unknown
  signal?: AbortSignal
  isPublic?: boolean
  onResponseNotOk?: (response: Response) => Promise<void> | void
}

export async function getJwt(): Promise<string> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async user => {
      unsubscribe()
      if (user) {
        try {
          const token = await user.getIdToken()
          resolve(token)
        } catch (err) {
          reject(err)
        }
      } else {
        reject(new Error("No user is currently signed in."))
      }
    })
  })
}

export async function fetchBack({
  endpoint,
  method = "GET",
  body,
  signal,
  isPublic = false,
}: FetchBackendArgs): Promise<Response> {
  const headers: HeadersInit = {}

  if (!isPublic) {
    const token = await getJwt()
    headers.Authorization = `Bearer ${token}`
  }

  const isFormData = body instanceof FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json"
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    signal,
  })

  return response
}
