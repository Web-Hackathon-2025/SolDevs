// This file is auto-generated from Supabase schema
// You can also use the Supabase CLI to generate this: npx supabase gen types typescript

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone_number: string | null;
          role: "customer" | "service_provider" | "admin";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["users"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      service_providers: {
        Row: {
          id: string;
          user_id: string;
          business_name: string | null;
          description: string | null;
          experience_years: number | null;
          address: string | null;
          city: string | null;
          state: string | null;
          postal_code: string | null;
          latitude: number | null;
          longitude: number | null;
          service_radius_km: number;
          status: "active" | "suspended" | "pending_approval" | "rejected";
          verification_documents: any | null;
          average_rating: number;
          total_reviews: number;
          total_bookings: number;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["service_providers"]["Row"], "id" | "created_at" | "updated_at" | "average_rating" | "total_reviews" | "total_bookings">;
        Update: Partial<Database["public"]["Tables"]["service_providers"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          booking_number: string;
          customer_id: string;
          provider_id: string;
          service_id: string | null;
          status: "requested" | "confirmed" | "in_progress" | "completed" | "cancelled" | "rejected";
          scheduled_date: string;
          scheduled_time: string;
          estimated_duration_minutes: number | null;
          service_address: string;
          service_city: string | null;
          service_postal_code: string | null;
          service_latitude: number | null;
          service_longitude: number | null;
          quoted_price: number | null;
          final_price: number | null;
          customer_notes: string | null;
          provider_notes: string | null;
          cancellation_reason: string | null;
          requested_at: string;
          confirmed_at: string | null;
          completed_at: string | null;
          cancelled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["bookings"]["Row"], "id" | "booking_number" | "requested_at" | "confirmed_at" | "completed_at" | "cancelled_at" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      services: {
        Row: {
          id: string;
          provider_id: string;
          category: "plumbing" | "electrical" | "cleaning" | "tutoring" | "carpentry" | "painting" | "appliance_repair" | "ac_repair" | "pest_control" | "gardening" | "beauty_salon" | "other";
          service_name: string;
          description: string | null;
          base_price: number | null;
          price_unit: string;
          duration_minutes: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["services"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
      };
      reviews: {
        Row: {
          id: string;
          booking_id: string;
          customer_id: string;
          provider_id: string;
          rating: number;
          review_text: string | null;
          provider_response: string | null;
          provider_response_at: string | null;
          is_flagged: boolean;
          is_approved: boolean;
          moderation_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["reviews"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string | null;
          related_booking_id: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["notifications"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      user_role: "customer" | "service_provider" | "admin";
      account_status: "active" | "suspended" | "pending_approval" | "rejected";
      booking_status: "requested" | "confirmed" | "in_progress" | "completed" | "cancelled" | "rejected";
      service_category: "plumbing" | "electrical" | "cleaning" | "tutoring" | "carpentry" | "painting" | "appliance_repair" | "ac_repair" | "pest_control" | "gardening" | "beauty_salon" | "other";
    };
  };
};
