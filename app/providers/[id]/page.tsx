import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Briefcase, Calendar } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/types";
import Link from "next/link";

export default async function ProviderProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: provider } = await supabase
    .from("service_providers")
    .select(`
      *,
      user:users(full_name, email, avatar_url),
      services(*),
      reviews:reviews(
        *,
        customer:users!customer_id(full_name, avatar_url)
      )
    `)
    .eq("id", params.id)
    .eq("status", "active")
    .single();

  if (!provider) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={provider.user?.avatar_url} />
              <AvatarFallback className="text-2xl">
                {getInitials(provider.business_name || provider.user?.full_name || "U")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {provider.business_name || provider.user?.full_name}
              </h1>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{provider.average_rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">
                    ({provider.total_reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.city}, {provider.state}</span>
                </div>

                {provider.experience_years > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>{provider.experience_years} years experience</span>
                  </div>
                )}
              </div>

              {provider.is_available && (
                <Badge variant="success" className="mt-3">
                  Available Now
                </Badge>
              )}
            </div>

            <Link href={`/book/${provider.id}`}>
              <Button size="lg" className="w-full md:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Book Service
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {provider.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>{provider.services?.length || 0} services available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {provider.services && provider.services.length > 0 ? (
                  provider.services.map((service: any) => (
                    <div
                      key={service.id}
                      className="flex items-start justify-between rounded-lg border p-4"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{service.service_name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {service.description}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          {SERVICE_CATEGORIES.find((c) => c.value === service.category)?.label}
                        </Badge>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold">${service.base_price}</p>
                        <p className="text-sm text-muted-foreground">{service.price_unit}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No services listed</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                {provider.reviews?.filter((r: any) => r.is_approved).length || 0} reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {provider.reviews && provider.reviews.length > 0 ? (
                  provider.reviews
                    .filter((review: any) => review.is_approved)
                    .map((review: any) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.customer?.avatar_url} />
                            <AvatarFallback>
                              {getInitials(review.customer?.full_name || "U")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{review.customer?.full_name}</p>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground pl-13">
                          {review.review_text}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-muted-foreground">No reviews yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="font-medium">{provider.city}, {provider.state}</p>
                  <p className="text-sm text-muted-foreground">
                    {provider.postal_code}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Serves within {provider.service_radius_km} km
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Bookings</span>
                <span className="font-semibold">{provider.total_bookings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reviews</span>
                <span className="font-semibold">{provider.total_reviews}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Rating</span>
                <span className="font-semibold">{provider.average_rating.toFixed(1)} / 5.0</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
