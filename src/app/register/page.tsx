"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import React from "react"
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterForm() {
    const router = useRouter()
    const { toast } = useToast()
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            if (userCredential.user) {
              await updateProfile(userCredential.user, {
                displayName: name
              })
            }
            router.push("/builder")
        } catch (error: any) {
            toast({
                title: "Registration Failed",
                description: error.message,
                variant: "destructive"
            })
        }
    }
    
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/builder");
        } catch (error: any) {
            toast({
                title: "Google Login Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
            <div className="flex justify-center mb-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Image src="/images/logo.png" alt="DesignSync Canvas Logo" width={240} height={54} />
                </Link>
            </div>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Name</Label>
              <Input 
                id="first-name" 
                placeholder="Max" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} type="button">
              Sign up with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
