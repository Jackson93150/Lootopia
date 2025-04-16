import axios from "axios"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import { app } from "@/lib/firebase"

const auth = getAuth(app)

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  const idToken = await userCredential.user.getIdToken()

  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    withCredentials: true,
  })

  return res
}

export async function me() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
    withCredentials: true,
  })

  return res
}
