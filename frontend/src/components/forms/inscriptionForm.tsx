"use client"

import AppButton from "@/components/ui/AppButton"
import AppInput from "@/components/ui/AppInput"
import TermsModal from "@/components/ui/TermsModal"
import ToggleSwitch from "@/components/ui/ToggleSwitch"
import { schemaRegister } from "@/lib/zod/schemas"
import { registerUser } from "@/service/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import type { z } from "zod"

type FormValues = z.infer<typeof schemaRegister>

export default function InscriptionForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      consentCookies: false,
      consentTerms: true,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const { email, password, username } = values

      await registerUser({ email, password, username })

      toast.success("Inscription réussie", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    } catch (error) {
      const err = error as Error
      toast.error(err.message, {
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

  const [showTerms, setShowTerms] = useState(false)

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
          Créer avec Google
        </AppButton>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark-brown mb-1">
          Email
          <AppInput
            id="email"
            type="email"
            placeholder="Entrez votre adresse email"
            {...register("email")}
            className="bg-sand-light !text-black border-4 border-beige focus:border-beige hover:border-beige"
          />
        </label>
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-dark-brown mb-1">
          Pseudo
          <AppInput
            id="username"
            type="text"
            placeholder="Entrez votre pseudo"
            {...register("username")}
            className="bg-sand-light !text-black border-4 border-beige focus:border-beige hover:border-beige"
          />
        </label>
        {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-dark-brown mb-1">
          Mot de passe
          <AppInput
            id="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            {...register("password")}
            className="bg-sand-light !text-black border-4 border-beige focus:border-beige hover:border-beige"
          />
        </label>
        {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-brown mb-1">
          <AppInput
            id="confirmPassword"
            type="password"
            placeholder="Confirmez votre mot de passe"
            {...register("confirmPassword")}
            className="bg-sand-light !text-black border-4 border-beige focus:border-beige hover:border-beige"
          />
        </label>
        {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <ToggleSwitch
        id="consentTerms"
        label="J'accepte les conditions"
        checked={watch("consentTerms")}
        onChange={e => setValue("consentTerms", e.target.checked)}
        error={errors.consentTerms?.message}
        labelClassName="underline cursor-pointer"
        onLabelClick={() => setShowTerms(true)}
      />
      {showTerms && (
        <TermsModal
          title="Conditions d'utilisation"
          description="En acceptant, vous confirmez avoir lu et accepté les conditions d’utilisation."
          onAccept={() => {
            setValue("consentTerms", true)
            setShowTerms(false)
          }}
          onDecline={() => {
            setValue("consentTerms", false)
            setShowTerms(false)
          }}
        />
      )}

      <ToggleSwitch
        id="consentCookies"
        label="J'accepte les cookies"
        checked={watch("consentCookies")}
        onChange={e => setValue("consentCookies", e.target.checked)}
        error={errors.consentCookies?.message}
        onLabelClick={() => setShowTerms(true)}
      />
      <div className="flex w-full justify-center">
        <AppButton type="submit" variant="primary" className="!w-40 mx-auto block">
          S’inscrire
        </AppButton>
      </div>
      <ToastContainer position="bottom-right" theme="colored" limit={5} stacked />
    </form>
  )
}
