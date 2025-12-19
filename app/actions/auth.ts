"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { LoginInput, SignupInput } from "@/lib/validations/auth";

export async function login(data: LoginInput) {
  try {
    const supabase = await createClient();

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error("Login error:", error);
      return { error: error.message };
    }

    if (!authData.user) {
      return { error: "Authentication failed" };
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT" || (error.digest && error.digest.startsWith("NEXT_REDIRECT"))) {
      throw error;
    }
    console.error("Login exception:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function signup(data: SignupInput) {
  try {
    const supabase = await createClient();

    // First, sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
          phone_number: data.phone_number || null,
          role: data.role,
        },
      },
    });

    if (signUpError) {
      console.error("Signup error details:", {
        message: signUpError.message,
        name: signUpError.name,
        code: (signUpError as any).code,
        status: (signUpError as any).status,
        raw: JSON.stringify(signUpError)
      });
      // Return a more descriptive error if available, or the generic one
      return {
        error: `${signUpError.message || "Signup failed"} ${(signUpError as any).code ? `(Code: ${(signUpError as any).code})` : ""
          }`.trim()
      };
    }

    if (!authData.user) {
      return { error: "Signup failed - no user created" };
    }

    // SELF-HEALING: Check if profile exists (Trigger might have failed silently with "Safe" script)
    const { data: profileCheck } = await supabase
      .from("users")
      .select("id")
      .eq("id", authData.user.id)
      .single();

    if (!profileCheck) {
      console.log("Trigger failed to create profile. Executing manual fallback...");
      const { error: manualInsertError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: data.email,
        full_name: data.full_name,
        role: data.role || 'customer',
        phone_number: data.phone_number || null,
      } as any);

      if (manualInsertError) {
        console.error("Manual profile creation failed:", manualInsertError);
        // We still don't fail the request, but we log it correctly
      }
    } else if (data.phone_number) {
      // If profile exists, just update phone number
      await supabase
        .from("users")
        .update({ phone_number: data.phone_number } as any)
        .eq("id", authData.user.id);
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT" || (error.digest && error.digest.startsWith("NEXT_REDIRECT"))) {
      throw error;
    }
    console.error("Signup exception:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/");
  } catch (error) {
    console.error("SignOut error:", error);
    redirect("/");
  }
}

export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    // Fetch user profile from public.users table
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      // Return user without profile if profile doesn't exist yet
      return { ...user, profile: null };
    }

    return { ...user, profile };
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}
