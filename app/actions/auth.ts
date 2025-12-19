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
      console.error("Signup error details:", JSON.stringify(signUpError, null, 2));
      return { error: signUpError.message };
    }

    if (!authData.user) {
      return { error: "Signup failed - no user created" };
    }

    // Verify profile creation and update phone number (which trigger might miss)
    if (data.phone_number) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ phone_number: data.phone_number })
        .eq("id", authData.user.id);

      if (updateError) {
        console.error("Error updating phone number:", updateError);
        // Continue, as user is created
      }
    }


    revalidatePath("/", "layout");
    redirect("/dashboard");
  } catch (error: any) {
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
