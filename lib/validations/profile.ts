import { z } from "zod";

export const serviceProviderProfileSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters").optional(),
  description: z.string().min(50, "Description must be at least 50 characters").max(1000, "Description must not exceed 1000 characters"),
  experience_years: z.number().min(0, "Experience must be a positive number").max(100, "Experience must be realistic"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state"),
  postal_code: z.string().min(3, "Please enter a valid postal code"),
  service_radius_km: z.number().min(1, "Service radius must be at least 1 km").max(100, "Service radius cannot exceed 100 km"),
});

export const serviceSchema = z.object({
  category: z.enum([
    "plumbing",
    "electrical",
    "cleaning",
    "tutoring",
    "carpentry",
    "painting",
    "appliance_repair",
    "ac_repair",
    "pest_control",
    "gardening",
    "beauty_salon",
    "other",
  ], { required_error: "Please select a category" }),
  service_name: z.string().min(5, "Service name must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  base_price: z.number().min(0, "Price must be a positive number"),
  price_unit: z.string().default("per hour"),
  duration_minutes: z.number().min(15, "Duration must be at least 15 minutes").optional(),
});

export type ServiceProviderProfileInput = z.infer<typeof serviceProviderProfileSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
