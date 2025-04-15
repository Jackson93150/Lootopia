"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AppButton from "@/components/ui/AppButton"
import AppInput from "@/components/ui/AppInput"

const formSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
})

type FormValues = z.infer<typeof formSchema>

export default function ConnexionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (_values: FormValues) => {
    return
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-sm mx-auto space-y-4">
      <div className="space-y-2">
        <AppButton type="button" variant="primary">
          Continuer avec Google
        </AppButton>
        <AppButton type="button" variant="social">
          Continuer avec Facebook
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

      <AppButton type="submit" variant="primary" className="!w-50 mx-auto block">
        Continuer
      </AppButton>

      <div className="mt-2 text-center">
        <AppButton type="button" variant="primary" className="!w-50 mx-auto block opacity-85 hover:opacity-100">
          Créer un compte
        </AppButton>
      </div>
    </form>
  )
}
