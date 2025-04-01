"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import Link from "next/link";

interface FormValues {
    email: string;
    password: string;
}

const formSchema = z.object({
    email: z.string().email("Veuillez entrer une adresse email valide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

export default function ConnexionForm() {
    const form = useForm({
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

        <Form {...form}>
            <div className="log-with-socialnetworks pb-3">
                <Button type="button" variant="outline" className="w-full mb-2">Continuer avec Google</Button>
                <Button type="button" variant="outline" className="w-full text-blue-600">Continuer avec Facebook</Button>
            </div>
            <div className="flex justify-center p-2">
                <p className="text-white font-extrabold text-lg stroke-black">Or</p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <Label htmlFor="email">Email</Label>
                            <FormControl>
                                <Input id="email" placeholder="Entrez votre adresse email"  className="bg-[#FDFCE3] border-6 border-[#D7B189] h-11 placeholder:text-xs"{...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <Label htmlFor="password">Mot de Passe</Label>
                            <FormControl>
                                <Input id="password" type="password" placeholder="Entrez votre mot de passe" className="bg-[#FDFCE3] border-6 border-[#D7B189] h-11 placeholder:text-xs" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Link href="mot-de-passe-oublie" className="text-xs block text-right">Mot de passe oublié ?</Link>
                <Button type="submit" className="block mx-auto bg-[#EFF8FD] border-6  border-[#F6CB9E] text-black rounded-xl h-10 font-semibold flex hover:bg-white ">Continuer</Button>
            </form>
            <div className="create-account">
                <div className="flex justify-center p-2">
                    <p className="text-white font-extrabold text-lg stroke-black">Pas encore de compte ? </p>
                </div>
                <Button type="button" className="block mx-auto bg-[#EFF8FD] border-6  border-[#F6CB9E] text-black rounded-xl font-semibold text-xs flex hover:bg-white">Créer un compte</Button>
            </div>
        </Form>
    );
}
