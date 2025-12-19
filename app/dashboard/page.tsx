import { getCurrentUser } from "@/app/actions/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Star, Users } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userRole = user?.profile?.role || "customer";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.profile?.full_name || "User"}!
        </h1>
        <p className="text-muted-foreground mt-1">
          {userRole === "service_provider"
            ? "Manage your services and bookings"
            : userRole === "admin"
            ? "Monitor and manage the platform"
            : "Find and book local services"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userRole === "service_provider" ? "Total Bookings" : "Active Bookings"}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              {userRole === "service_provider"
                ? "All time bookings"
                : "Bookings in progress"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userRole === "service_provider" ? "Average Rating" : "Completed"}
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userRole === "service_provider" ? "0.0" : "0"}
            </div>
            <p className="text-xs text-muted-foreground">
              {userRole === "service_provider"
                ? "Based on 0 reviews"
                : "Completed bookings"}
            </p>
          </CardContent>
        </Card>

        {userRole === "service_provider" && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.00</div>
                <p className="text-xs text-muted-foreground">All time earnings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </>
        )}

        {userRole === "admin" && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Platform users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <Badge variant="warning" className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Service providers</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            {userRole === "service_provider"
              ? "Complete your profile to start receiving bookings"
              : userRole === "admin"
              ? "Manage your platform efficiently"
              : "Get started by finding a service provider"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {userRole === "customer" && (
              <a
                href="/search"
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Find a Service</p>
                    <p className="text-sm text-muted-foreground">
                      Browse local service providers
                    </p>
                  </div>
                </div>
                <Badge>Start</Badge>
              </a>
            )}
            {userRole === "service_provider" && (
              <>
                <a
                  href="/dashboard/provider/profile"
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Complete Profile</p>
                      <p className="text-sm text-muted-foreground">
                        Add your details and services
                      </p>
                    </div>
                  </div>
                  <Badge>Setup</Badge>
                </a>
                <a
                  href="/dashboard/provider/services"
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent"
                >
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Add Services</p>
                      <p className="text-sm text-muted-foreground">
                        List your services and pricing
                      </p>
                    </div>
                  </div>
                  <Badge>Setup</Badge>
                </a>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
