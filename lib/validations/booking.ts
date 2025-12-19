import { z } from "zod";

export const bookingSchema = z.object({
  service_id: z.string().uuid("Invalid service selected"),
  scheduled_date: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Please select a future date"),
  scheduled_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  service_address: z.string().min(10, "Please provide a complete address"),
  service_city: z.string().min(2, "Please enter a city"),
  service_postal_code: z.string().min(3, "Please enter a postal code"),
  customer_notes: z.string().max(500, "Notes must not exceed 500 characters").optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  review_text: z.string().min(10, "Review must be at least 10 characters").max(1000, "Review must not exceed 1000 characters"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
