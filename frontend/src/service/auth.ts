import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"

import { app } from "@/lib/firebase"
import { fetchBack } from "@/utils/fetch"

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

interface RegisterProps {
  email: string
  password: string
  username: string
}

export async function registerUser(user: RegisterProps) {
  try {
    const precheck = await fetchBack({
      endpoint: "/users/precheck",
      method: "POST",
      body: {
        email: user.email,
        username: user.username,
      },
      isPublic: true,
    })

    if (!precheck.ok) {
      const errorData = await precheck.json()
      if (precheck.status === 409) {
        throw new Error(errorData.message)
      }
      throw new Error("Erreur lors de la pré-vérification.")
    }

    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
    const newUser = userCredential.user

    await sendEmailVerification(newUser)

    const register = await fetchBack({
      endpoint: "/auth/register",
      method: "POST",
      body: {
        email: user.email,
        username: user.username,
        uid: newUser.uid,
      },
    })

    if (!register.ok) {
      throw new Error("Erreur lors de l'enregistrement sur le backend.")
    }

    return newUser
  } catch (error) {
    console.error(error)
    throw new Error("Erreur lors de l'inscription.")
  }
}

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return await userCredential.user.getIdToken()
}

export async function loginGoogle() {
  try {
    await signInWithPopup(auth, provider)

    const res = await fetchBack({
      endpoint: "/users/login",
      method: "GET",
    })

    if (!res.ok) {
      throw new Error("Erreur lors du login Google backend.")
    }

    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error("Erreur lors de l'authentification avec Google.")
  }
}
