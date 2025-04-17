import axios from "axios"
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

import { app } from "@/lib/firebase"

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

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

export async function loginGoogle() {
  signInWithPopup(auth, provider)
    .then(async result => {
      GoogleAuthProvider.credentialFromResult(result)
      const idToken = await result.user.getIdToken()

      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        withCredentials: true,
      })
      return res
    })
    .catch(error => {
      console.error(error)
      console.error(GoogleAuthProvider.credentialFromError(error))
    })
}

export async function me() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
    withCredentials: true,
  })

  return res
}

export async function getUserById(id: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/user/${id}`, {
    withCredentials: true,
  })

  return res.data
}
