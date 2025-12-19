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
      // Add other tables as needed
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
