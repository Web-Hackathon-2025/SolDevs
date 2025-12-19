"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signupSchema, type SignupInput } from "@/lib/validations/auth";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, Briefcase, Loader2, Mail, Lock, Phone, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<"customer" | "service_provider">("customer");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "customer",
    },
  });

  function handleRoleChange(role: "customer" | "service_provider") {
    setSelectedRole(role);
    setValue("role", role);
  }

  async function onSubmit(data: SignupInput) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signup(data);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <Card className="glass border-0 shadow-premium-lg overflow-hidden relative w-full max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600" />
        <CardHeader className="text-center pt-8 pb-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-green-700">Check your inbox</CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-2">
            We've sent a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center pb-8">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Please click the link in the email to activate your account. Once verified, you can sign in to access your dashboard.
          </p>
          <div className="pt-4">
            <Link href="/login">
              <Button className="w-full h-11 text-base font-semibold shadow-md active:scale-95 transition-transform" variant="default">
                Proceed to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-0 shadow-premium-lg overflow-hidden relative w-full max-w-lg mx-auto">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-indigo-500" />

      <CardHeader className="space-y-2 text-center pb-2">
        <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Join Karigar to find services or offer your skills
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-4 flex items-start space-x-2 text-sm text-destructive animate-in fade-in slide-in-from-top-2">
              <div className="mt-0.5 min-w-[1.25rem]"><CheckCircle2 className="h-5 w-5 rotate-45" /></div>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3">
            <Label className="text-sm font-medium">I want to</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("customer")}
                className={cn(
                  "relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md",
                  selectedRole === "customer"
                    ? "border-primary bg-primary/5 shadow-inner"
                    : "border-border bg-background/50 hover:border-primary/50 hover:bg-background"
                )}
              >
                <div className={cn(
                  "rounded-full p-2.5 transition-colors",
                  selectedRole === "customer" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <User className="h-6 w-6" />
                </div>
                <span className={cn("text-sm font-semibold", selectedRole === "customer" ? "text-primary" : "text-muted-foreground")}>
                  Find Services
                </span>
                {selectedRole === "customer" && (
                  <div className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("service_provider")}
                className={cn(
                  "relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md",
                  selectedRole === "service_provider"
                    ? "border-primary bg-primary/5 shadow-inner"
                    : "border-border bg-background/50 hover:border-primary/50 hover:bg-background"
                )}
              >
                <div className={cn(
                  "rounded-full p-2.5 transition-colors",
                  selectedRole === "service_provider" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <Briefcase className="h-6 w-6" />
                </div>
                <span className={cn("text-sm font-semibold", selectedRole === "service_provider" ? "text-primary" : "text-muted-foreground")}>
                  Offer Services
                </span>
                {selectedRole === "service_provider" && (
                  <div className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            </div>
            <input type="hidden" {...register("role")} />
            {errors.role && (
              <p className="text-sm text-destructive font-medium pl-1">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-sm font-medium">Full Name</Label>
            <div className="relative group">
              <div className="absolute left-3 top-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                <User className="h-5 w-5" />
              </div>
              <Input
                id="full_name"
                placeholder="John Doe"
                className="pl-10 h-11 bg-background/50 border-input/60 focus:bg-background transition-all"
                {...register("full_name")}
                disabled={isLoading}
              />
            </div>
            {errors.full_name && (
              <p className="text-sm text-destructive font-medium pl-1">{errors.full_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative group">
              <div className="absolute left-3 top-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="pl-10 h-11 bg-background/50 border-input/60 focus:bg-background transition-all"
                {...register("email")}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive font-medium pl-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number" className="text-sm font-medium">Phone Number (Optional)</Label>
            <div className="relative group">
              <div className="absolute left-3 top-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <Input
                id="phone_number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="pl-10 h-11 bg-background/50 border-input/60 focus:bg-background transition-all"
                {...register("phone_number")}
                disabled={isLoading}
              />
            </div>
            {errors.phone_number && (
              <p className="text-sm text-destructive font-medium pl-1">{errors.phone_number.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11 bg-background/50 border-input/60 focus:bg-background transition-all"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive font-medium pl-1">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="h-11 bg-background/50 border-input/60 focus:bg-background transition-all"
                {...register("confirmPassword")}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive font-medium pl-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold shadow-premium hover:shadow-premium-lg transition-all mt-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form >
      </CardContent >
      <CardFooter className="bg-secondary/20 py-4">
        <p className="text-center text-sm text-muted-foreground w-full">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary/80 font-semibold hover:underline transition-all">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card >
  );
}
