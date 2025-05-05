import { z } from "zod"

// ------ AUTH ------
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

// ------ Auction ------

export const schemaAuction = z
  .object({
    direct_sale: z.boolean().default(false),
    fix_price: z.number().int().min(1).nullable().default(Number.NaN),
    auction_price: z.number().int().min(1),
    timer: z.enum(["1h", "1d", "1w"], {
      required_error: "Vous devez choisir une durée pour l'enchère.",
    }),
  })
  .refine(
    data => {
      if (data.direct_sale) {
        return data.fix_price !== null && Number.isInteger(data.fix_price) && data.fix_price >= 1
      }
      return true
    },
    {
      path: ["fix_price"],
      message: "Un prix doit être renseigné pour une vente directe.",
    },
  )

  export const schemaAddAuction = 
    z.object({
      auction_price: z.number().int().min(2),
    })