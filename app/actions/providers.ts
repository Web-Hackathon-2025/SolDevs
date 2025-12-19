"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ServiceProviderProfileInput, ServiceInput } from "@/lib/validations/profile";

export async function createOrUpdateProviderProfile(data: ServiceProviderProfileInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check if profile exists
  const { data: existing } = await supabase
    .from("service_providers")
    .select("id")
    .eq("user_id", user.id)
    .single();

  const profileData = {
    user_id: user.id,
    ...data,
    status: "pending_approval",
  };

  if (existing) {
    const { error } = await supabase
      .from("service_providers")
      .update(profileData)
      .eq("user_id", user.id);

    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("service_providers")
      .insert([profileData]);

    if (error) return { error: error.message };
  }

  revalidatePath("/dashboard/provider/profile");
  return { success: true };
}

export async function getProviderProfile(userId?: string) {
  const supabase = await createClient();

  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;

  if (!targetUserId) {
    return { error: "User not found" };
  }

  const { data, error } = await supabase
    .from("service_providers")
    .select("*")
    .eq("user_id", targetUserId)
    .single();

  if (error) return { error: error.message };

  return { data };
}

export async function createService(data: ServiceInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Get provider ID
  const { data: provider } = await supabase
    .from("service_providers")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!provider) {
    return { error: "Provider profile not found. Please create your profile first." };
  }

  const { error } = await supabase.from("services").insert([
    {
      provider_id: provider.id,
      ...data,
    },
  ]);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/provider/services");
  return { success: true };
}

export async function getProviderServices() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { data: provider } = await supabase
    .from("service_providers")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!provider) {
    return { data: [] };
  }

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", provider.id)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };

  return { data: data || [] };
}

export async function deleteService(serviceId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", serviceId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/provider/services");
  return { success: true };
}

export async function searchProviders(filters: {
  category?: string;
  city?: string;
  query?: string;
  limit?: number;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("service_providers")
    .select(`
      *,
      user:users(full_name, email),
      services(*)
    `)
    .eq("status", "active");

  if (filters.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }

  if (filters.category) {
    query = query.contains("services", [{ category: filters.category }]);
  }

  query = query.limit(filters.limit || 20);

  const { data, error } = await query;

  if (error) return { error: error.message };

  return { data: data || [] };
}
