/* eslint-disable @next/next/no-img-element */
"use client"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from 'react-icons/fa';
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AlertOctagonIcon, Loader } from "lucide-react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

import { useState } from "react"
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "password is required" })
})

export const SignInView = () => {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    
    
    const [loadingState, setLoadingState] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setLoadingState("email"); // Set specific loading state
        authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
                callbackURL: "/"
            },
            {
                onSuccess: () => {
                    setLoadingState(null)
                    router.push('/')
                },
                onError: ({ error }) => {
                    setLoadingState(null)
                    setError(error.message)
                }
            })
    }

    const onSocial = (provider: "github" | "google") => {
        setError(null);
        setLoadingState(provider); // Set specific loading state (e.g. "google")
        authClient.signIn.social(
            {
                provider: provider,
                callbackURL: '/'
            },
            {
                onSuccess: () => {
                    setLoadingState(null)
                },
                onError: ({ error }) => {
                    setLoadingState(null)
                    setError(error.message)
                }
            })
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome Back
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        login to your account
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="*********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!!error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <AlertOctagonIcon className="size-4 text-destructive!" />
                                        <AlertTitle>invalid email or password</AlertTitle>
                                    </Alert>
                                )}
                                
                                {/* EMAIL BUTTON */}
                                <Button
                                    // Disable if ANY loading is happening
                                    disabled={!!loadingState} 
                                    type="submit"
                                    className="w-full"
                                >
                                    {loadingState === 'email' ? (
                                        <>
                                            <Loader className="animate-spin mr-2 size-4" /> 
                                            Signing in...
                                        </>
                                    ) : "Sign in"}
                                </Button>

                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    
                                    {/* GOOGLE BUTTON */}
                                    <Button
                                        disabled={!!loadingState}
                                        onClick={() => onSocial('google')}
                                        variant="outline"
                                        type="button"
                                        className="w-full"
                                    >
                                        {loadingState === 'google' ? (
                                            <Loader className="animate-spin size-4" />
                                        ) : <FcGoogle className="size-4" />
                                        }
                                        {/* Optional: Add margin if text is present */}
                                        <span className="ml-2">
                                            {loadingState === 'google' ? "Connecting..." : "Google"}
                                        </span>
                                    </Button>

                                    {/* GITHUB BUTTON */}
                                    <Button
                                        disabled={!!loadingState}
                                        onClick={() => onSocial('github')}
                                        variant="outline"
                                        type="button"
                                        className="w-full"
                                    >
                                        {loadingState === 'github' ? (
                                            <Loader className="animate-spin size-4" />
                                        ) : <FaGithub className="size-4" />
                                        }
                                        <span className="ml-2">
                                            {loadingState === 'github' ? "Connecting..." : "GitHub"}
                                        </span>
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account? {""}
                                    <Link href="/sign-up" className="underline underline-offset-4">
                                        sign up
                                    </Link>
                                </div>
                            </div>

                        </form>
                    </Form>

                    <div className="md:flex flex-col justify-center items-center gap-y-2 bg-radial from-green-800 to-black relative hidden">
                        <img src="/logo.svg" alt="logo" className="h-23 w=[92px] " />
                        <p className="text-2xl font-semibold text-white">RYO.AI</p>
                    </div>
                </CardContent>

            </Card>
            <div className="text-muted-foreground text-sm *:[a]:hover:text-primary text-center text-x5 text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>
        </div>
    )
}


