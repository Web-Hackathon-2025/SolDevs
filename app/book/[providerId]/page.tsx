"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { bookingSchema, type BookingInput } from "@/lib/validations/booking";
import { createBooking } from "@/app/actions/bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import Link from "next/link";

export default function BookServicePage() {
  const router = useRouter();
  const params = useParams();
  const providerId = params.providerId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    // In a real app, fetch provider's services here
    // For now, we'll rely on the user selecting a service
  }, [providerId]);

  async function onSubmit(data: BookingInput) {
    setIsLoading(true);
    setError(null);

    const result = await createBooking({
      ...data,
      provider_id: providerId,
    });

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/dashboard/bookings");
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/providers/${providerId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Provider Profile
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Book a Service</h1>
          <p className="text-muted-foreground mt-1">
            Fill in the details to request a service booking
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>
              Provide information about your service request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="service_id">Service</Label>
                <Input
                  id="service_id"
                  placeholder="Service ID (from provider's services)"
                  {...register("service_id")}
                  disabled={isLoading}
                />
                {errors.service_id && (
                  <p className="text-sm text-destructive">{errors.service_id.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Enter the service ID from the provider's profile
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="scheduled_date">Date</Label>
                  <Input
                    id="scheduled_date"
                    type="date"
                    min={today}
                    {...register("scheduled_date")}
                    disabled={isLoading}
                  />
                  {errors.scheduled_date && (
                    <p className="text-sm text-destructive">{errors.scheduled_date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduled_time">Time</Label>
                  <Input
                    id="scheduled_time"
                    type="time"
                    {...register("scheduled_time")}
                    disabled={isLoading}
                  />
                  {errors.scheduled_time && (
                    <p className="text-sm text-destructive">{errors.scheduled_time.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_address">Service Address</Label>
                <Input
                  id="service_address"
                  placeholder="123 Main St, Apt 4B"
                  {...register("service_address")}
                  disabled={isLoading}
                />
                {errors.service_address && (
                  <p className="text-sm text-destructive">{errors.service_address.message}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="service_city">City</Label>
                  <Input
                    id="service_city"
                    placeholder="New York"
                    {...register("service_city")}
                    disabled={isLoading}
                  />
                  {errors.service_city && (
                    <p className="text-sm text-destructive">{errors.service_city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_postal_code">Postal Code</Label>
                  <Input
                    id="service_postal_code"
                    placeholder="10001"
                    {...register("service_postal_code")}
                    disabled={isLoading}
                  />
                  {errors.service_postal_code && (
                    <p className="text-sm text-destructive">
                      {errors.service_postal_code.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer_notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="customer_notes"
                  placeholder="Any specific requirements or details..."
                  rows={4}
                  {...register("customer_notes")}
                  disabled={isLoading}
                />
                {errors.customer_notes && (
                  <p className="text-sm text-destructive">{errors.customer_notes.message}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
