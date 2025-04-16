"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import ToggleSwitch from "@/components/ui/ToggleSwitch";


const formSchema = z
    .object({
        email: z.string().email("Veuillez entrer une adresse email valide."),
        username: z.string().min(2, "Le pseudo doit contenir au moins 2 caractères."),
        password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
        confirmPassword: z.string(),
        consentCookies: z.boolean(),
        consentTerms: z
            .boolean()
            .refine(val => val, {
                message: "Vous devez accepter les conditions d'utilisation.",
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Les mots de passe ne correspondent pas.",
    });

type FormValues = z.infer<typeof formSchema>;

export default function InscriptionForm() {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            consentCookies: false,
            consentTerms: true,
        },
    });

    const onSubmit = (values: FormValues) => {
        console.log("Inscription :", values);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-sm mx-auto space-y-4">
            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-brown mb-1">
                    Email
                    <AppInput
                        id="email"
                        type="email"
                        placeholder="Entrez votre adresse email"
                        {...register("email")}
                    />
                </label>
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            {/* Pseudo */}
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-dark-brown mb-1">
                    Pseudo
                    <AppInput
                        id="username"
                        type="text"
                        placeholder="Entrez votre pseudo"
                        {...register("username")}
                    />
                </label>
                {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username.message}</p>}
            </div>

            {/* Mot de passe */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-dark-brown mb-1">
                    Mot de passe
                    <AppInput
                        id="password"
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        {...register("password")}
                    />
                </label>
                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-brown mb-1">
                    <AppInput
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                        {...register("confirmPassword")}
                    />
                </label>
                {errors.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>

            <ToggleSwitch
                id="consentTerms"
                label="J'accepte les conditions"
                checked={watch("consentTerms")}
                onChange={(e) => setValue("consentTerms", e.target.checked)}
                error={errors.consentTerms?.message}
            />

            <ToggleSwitch
                id="consentCookies"
                label="J'accepte les cookies"
                checked={watch("consentCookies")}
                onChange={(e) => setValue("consentCookies", e.target.checked)}
                error={errors.consentCookies?.message}
            />

            <AppButton type="submit" variant="primary" className="!w-40 mx-auto block">
                S’inscrire
            </AppButton>
        </form>
    );
}
