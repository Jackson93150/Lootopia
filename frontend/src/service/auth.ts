import axios from "axios"
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"

import { app } from "@/lib/firebase"

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

interface RegisterProps {
  email: string
  password: string
  username: string
}

export async function registerUser(user: RegisterProps) {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/precheck`, {
      email: user.email,
      username: user.username,
    })

    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
    const newUser = userCredential.user

    await sendEmailVerification(newUser)

    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        email: user.email,
        username: user.username,
        uid: newUser.uid,
      },
      {
        withCredentials: true,
      },
    )

    return newUser
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        throw new Error(error.response.data.message)
      }
    }

    throw new Error("Erreur lors de l'inscription.")
  }
}

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  const idToken = await userCredential.user.getIdToken()

  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
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
