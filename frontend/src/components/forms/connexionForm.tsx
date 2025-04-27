"use client"

import { login } from "@/service/auth"
import { me } from "@/service/user"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import AppButton from "@/components/ui/AppButton"
import AppInput from "@/components/ui/AppInput"
import { schemaConnexion } from "@/lib/zod/schemas"
import Image from "next/image"
import { ToastContainer, toast } from "react-toastify"

type FormValues = z.infer<typeof schemaConnexion>

export default function ConnexionForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaConnexion),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values.email, values.password)
      const m = await me()
      console.info(m)
      router.push("/")
    } catch (_error) {
      toast.error("Email ou mot de passe invalide", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-sm mx-auto space-y-4">
      <div className="flex w-full justify-center">
        <AppButton
          type="button"
          variant="primary"
          className="!w-50 mx-auto block"
          icon={
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="google"
              width={15}
              height={15}
            />
          }
        >
          Continuer avec Google
        </AppButton>
      </div>
      <div className="flex justify-center">
        <p className="text-white font-extrabold text-sm">Ou</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-brown mb-1" htmlFor="email">
          Email
          <AppInput id="email" placeholder="Entrez votre adresse email" type="email" {...register("email")} />
        </label>
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-brown mb-1" htmlFor="password">
          Mot de passe
          <AppInput id="password" placeholder="Entrez votre mot de passe" type="password" {...register("password")} />
        </label>
        {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      <div className="text-right mt-1 mb-2">
        <Link href="/mot-de-passe-oublie" className="text-xs underline text-blue-600">
          Mot de passe oublié ?
        </Link>
      </div>

      <div className="flex flex-col w-full gap-2 items-center">
        <AppButton type="submit" variant="primary" className="!w-50 mx-auto block">
          Continuer
        </AppButton>

        <AppButton
          type="button"
          variant="primary"
          className="!w-50 mx-auto block"
          onClick={() => router.push("/inscription")}
        >
          Créer un compte
        </AppButton>
      </div>
      <ToastContainer position="bottom-right" theme="colored" limit={5} stacked />
    </form>
  )
}
