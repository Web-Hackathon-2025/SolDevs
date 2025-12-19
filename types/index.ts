// Type definitions for Karigar application

export type UserRole = "customer" | "service_provider" | "admin";
export type AccountStatus = "active" | "suspended" | "pending_approval" | "rejected";
export type BookingStatus = "requested" | "confirmed" | "in_progress" | "completed" | "cancelled" | "rejected";
export type ServiceCategory =
  | "plumbing"
  | "electrical"
  | "cleaning"
  | "tutoring"
  | "carpentry"
  | "painting"
  | "appliance_repair"
  | "ac_repair"
  | "pest_control"
  | "gardening"
  | "beauty_salon"
  | "other";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceProvider {
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
  status: AccountStatus;
  verification_documents: any | null;
  average_rating: number;
  total_reviews: number;
  total_bookings: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Service {
  id: string;
  provider_id: string;
  category: ServiceCategory;
  service_name: string;
  description: string | null;
  base_price: number | null;
  price_unit: string;
  duration_minutes: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  provider?: ServiceProvider;
}

export interface AvailabilitySchedule {
  id: string;
  provider_id: string;
  day_of_week: number; // 0-6 (Sunday-Saturday)
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface UnavailableDate {
  id: string;
  provider_id: string;
  unavailable_date: string;
  reason: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_number: string;
  customer_id: string;
  provider_id: string;
  service_id: string | null;
  status: BookingStatus;
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
  customer?: User;
  provider?: ServiceProvider;
  service?: Service;
}

export interface Review {
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
  customer?: User;
  provider?: ServiceProvider;
  booking?: Booking;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string | null;
  related_booking_id: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Dispute {
  id: string;
  booking_id: string;
  reporter_id: string;
  reported_against_id: string;
  dispute_type: string | null;
  description: string;
  evidence_urls: any | null;
  status: string;
  admin_notes: string | null;
  resolution: string | null;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
  updated_at: string;
}

// Utility types
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface SignUpFormData {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  role: UserRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ServiceProviderProfileFormData {
  business_name: string;
  description: string;
  experience_years: number;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  service_radius_km: number;
}

export interface ServiceFormData {
  category: ServiceCategory;
  service_name: string;
  description: string;
  base_price: number;
  price_unit: string;
  duration_minutes: number;
}

export interface BookingFormData {
  provider_id: string;
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  service_address: string;
  service_city: string;
  service_postal_code: string;
  customer_notes: string;
}

export interface ReviewFormData {
  rating: number;
  review_text: string;
}

// Search/Filter types
export interface SearchFilters {
  category?: ServiceCategory;
  city?: string;
  minRating?: number;
  maxPrice?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
  query?: string;
}

export const SERVICE_CATEGORIES: { value: ServiceCategory; label: string }[] = [
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "cleaning", label: "Cleaning" },
  { value: "tutoring", label: "Tutoring" },
  { value: "carpentry", label: "Carpentry" },
  { value: "painting", label: "Painting" },
  { value: "appliance_repair", label: "Appliance Repair" },
  { value: "ac_repair", label: "AC Repair" },
  { value: "pest_control", label: "Pest Control" },
  { value: "gardening", label: "Gardening" },
  { value: "beauty_salon", label: "Beauty & Salon" },
  { value: "other", label: "Other" },
];

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  requested: "Requested",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  rejected: "Rejected",
};

export const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  active: "Active",
  suspended: "Suspended",
  pending_approval: "Pending Approval",
  rejected: "Rejected",
};
