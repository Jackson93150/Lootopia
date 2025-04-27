import { z } from "zod"

export const schemaRegister = z
  .object({
    email: z.string().email("Veuillez entrer une adresse email valide."),
    username: z.string().min(2, "Le pseudo doit contenir au moins 2 caractères."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
    confirmPassword: z.string(),
    consentCookies: z.boolean(),
    consentTerms: z.boolean().refine(val => val, {
      message: "Vous devez accepter les conditions d'utilisation.",
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas.",
  })

export const schemaConnexion = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
})
