"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import Link from "next/link";

import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";

const formSchema = z.object({
    email: z.string().email("Veuillez entrer une adresse email valide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ConnexionForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: FormValues) => {
        console.log(values);
    };

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
                <label className="block text-sm font-medium text-dark-brown mb-1">Email</label>
                <AppInput
                    placeholder="Entrez votre adresse email"
                    type="email"
                    {...register("email")}
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-dark-brown mb-1">Mot de passe</label>
                <AppInput
                    placeholder="Entrez votre mot de passe"
                    type="password"
                    {...register("password")}
                />
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
                <p className="text-white font-extrabold text-sm pb-2">Pas encore de compte ?</p>
                <AppButton type="button" variant="primary" className="!w-50 mx-auto block">
                    Créer un compte
                </AppButton>
            </div>
        </form>
    );
}
