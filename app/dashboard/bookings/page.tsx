"use client";

import { useEffect, useState } from "react";
import { getUserBookings, updateBookingStatus } from "@/app/actions/bookings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { BOOKING_STATUS_LABELS } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  async function loadBookings() {
    const result = await getUserBookings();
    if (result.data) {
      setBookings(result.data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleStatusUpdate(bookingId: string, status: any) {
    await updateBookingStatus(bookingId, status);
    loadBookings();
  }

  const filteredBookings = bookings.filter((booking) =>
    filter === "all" ? true : booking.status === filter
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "completed":
        return "default";
      case "cancelled":
      case "rejected":
        return "destructive";
      default:
        return "warning";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your service bookings and appointments
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "requested" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("requested")}
        >
          Requested
        </Button>
        <Button
          variant={filter === "confirmed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("confirmed")}
        >
          Confirmed
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No bookings found</p>
            <Link href="/search">
              <Button variant="outline" className="mt-4">
                Find Services
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">
                        {booking.service?.service_name || "Service"}
                      </CardTitle>
                      <Badge variant={getStatusBadgeVariant(booking.status)}>
                        {BOOKING_STATUS_LABELS[booking.status as keyof typeof BOOKING_STATUS_LABELS]}
                      </Badge>
                    </div>
                    <CardDescription>
                      Booking #{booking.booking_number}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {booking.provider?.business_name ||
                        booking.provider?.user?.full_name ||
                        booking.customer?.full_name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(booking.scheduled_date)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatTime(booking.scheduled_time)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.service_address}</span>
                  </div>

                  {booking.customer_notes && (
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      <p className="font-medium mb-1">Notes:</p>
                      <p className="text-muted-foreground">{booking.customer_notes}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {booking.status === "requested" && booking.provider && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusUpdate(booking.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    {booking.status === "confirmed" && booking.provider && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.id, "completed")}
                      >
                        Mark Complete
                      </Button>
                    )}

                    {booking.status === "completed" && booking.customer && (
                      <Link href={`/bookings/${booking.id}/review`}>
                        <Button size="sm">Leave Review</Button>
                      </Link>
                    )}

                    {(booking.status === "requested" || booking.status === "confirmed") && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
