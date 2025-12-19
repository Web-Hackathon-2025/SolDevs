"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BookingInput, ReviewInput } from "@/lib/validations/booking";

export async function createBooking(data: BookingInput & { provider_id: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase.from("bookings").insert([
    {
      customer_id: user.id,
      provider_id: data.provider_id,
      service_id: data.service_id,
      scheduled_date: data.scheduled_date,
      scheduled_time: data.scheduled_time,
      service_address: data.service_address,
      service_city: data.service_city,
      service_postal_code: data.service_postal_code,
      customer_notes: data.customer_notes,
      status: "requested",
    },
  ]);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/bookings");
  return { success: true };
}

export async function getUserBookings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check if user is a provider
  const { data: providerProfile } = await supabase
    .from("service_providers")
    .select("id")
    .eq("user_id", user.id)
    .single();

  let query;

  if (providerProfile) {
    // Provider: get bookings where they are the provider
    query = supabase
      .from("bookings")
      .select(`
        *,
        customer:users!customer_id(full_name, email, phone_number),
        service:services(service_name, category)
      `)
      .eq("provider_id", providerProfile.id);
  } else {
    // Customer: get bookings where they are the customer
    query = supabase
      .from("bookings")
      .select(`
        *,
        provider:service_providers!provider_id(
          business_name,
          user:users(full_name, email, phone_number)
        ),
        service:services(service_name, category)
      `)
      .eq("customer_id", user.id);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) return { error: error.message };

  return { data: data || [] };
}

export async function updateBookingStatus(
  bookingId: string,
  status: "confirmed" | "in_progress" | "completed" | "cancelled" | "rejected"
) {
  const supabase = await createClient();

  const updateData: any = { status };

  if (status === "confirmed") {
    updateData.confirmed_at = new Date().toISOString();
  } else if (status === "completed") {
    updateData.completed_at = new Date().toISOString();
  } else if (status === "cancelled") {
    updateData.cancelled_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/bookings");
  return { success: true };
}

export async function createReview(bookingId: string, data: ReviewInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Get booking details
  const { data: booking } = await supabase
    .from("bookings")
    .select("provider_id, customer_id, status")
    .eq("id", bookingId)
    .single();

  if (!booking) {
    return { error: "Booking not found" };
  }

  if (booking.status !== "completed") {
    return { error: "Can only review completed bookings" };
  }

  if (booking.customer_id !== user.id) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase.from("reviews").insert([
    {
      booking_id: bookingId,
      customer_id: user.id,
      provider_id: booking.provider_id,
      rating: data.rating,
      review_text: data.review_text,
    },
  ]);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/bookings");
  return { success: true };
}

export async function getProviderReviews(providerId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      customer:users!customer_id(full_name, avatar_url)
    `)
    .eq("provider_id", providerId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };

  return { data: data || [] };
}
