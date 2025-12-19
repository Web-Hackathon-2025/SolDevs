"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceProviderProfileSchema, type ServiceProviderProfileInput } from "@/lib/validations/profile";
import { createOrUpdateProviderProfile, getProviderProfile } from "@/app/actions/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function ProviderProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [profileStatus, setProfileStatus] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ServiceProviderProfileInput>({
    resolver: zodResolver(serviceProviderProfileSchema),
  });

  useEffect(() => {
    async function loadProfile() {
      const result = await getProviderProfile();
      if (result.data) {
        const profile = result.data;
        setValue("business_name", profile.business_name || "");
        setValue("description", profile.description || "");
        setValue("experience_years", profile.experience_years || 0);
        setValue("address", profile.address || "");
        setValue("city", profile.city || "");
        setValue("state", profile.state || "");
        setValue("postal_code", profile.postal_code || "");
        setValue("service_radius_km", profile.service_radius_km || 10);
        setProfileStatus(profile.status);
      }
    }
    loadProfile();
  }, [setValue]);

  async function onSubmit(data: ServiceProviderProfileInput) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const result = await createOrUpdateProviderProfile(data);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setProfileStatus("pending_approval");
    }

    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Service Provider Profile</h1>
        <p className="text-muted-foreground mt-1">
          Complete your profile to start receiving booking requests
        </p>
      </div>

      {profileStatus && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Profile Status:</span>
              <Badge
                variant={
                  profileStatus === "active"
                    ? "success"
                    : profileStatus === "pending_approval"
                    ? "warning"
                    : "destructive"
                }
              >
                {profileStatus.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
            {profileStatus === "pending_approval" && (
              <p className="text-sm text-muted-foreground mt-2">
                Your profile is under review. You'll be able to receive bookings once approved.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Provide details about your services and experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
                Profile updated successfully!
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name (Optional)</Label>
              <Input
                id="business_name"
                placeholder="e.g., ABC Plumbing Services"
                {...register("business_name")}
                disabled={isLoading}
              />
              {errors.business_name && (
                <p className="text-sm text-destructive">{errors.business_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell customers about your services and experience..."
                rows={5}
                {...register("description")}
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_years">Years of Experience</Label>
              <Input
                id="experience_years"
                type="number"
                min="0"
                {...register("experience_years", { valueAsNumber: true })}
                disabled={isLoading}
              />
              {errors.experience_years && (
                <p className="text-sm text-destructive">{errors.experience_years.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Service Address</Label>
              <Input
                id="address"
                placeholder="123 Main St"
                {...register("address")}
                disabled={isLoading}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  {...register("city")}
                  disabled={isLoading}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  {...register("state")}
                  disabled={isLoading}
                />
                {errors.state && (
                  <p className="text-sm text-destructive">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  placeholder="10001"
                  {...register("postal_code")}
                  disabled={isLoading}
                />
                {errors.postal_code && (
                  <p className="text-sm text-destructive">{errors.postal_code.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_radius_km">Service Radius (km)</Label>
                <Input
                  id="service_radius_km"
                  type="number"
                  min="1"
                  max="100"
                  {...register("service_radius_km", { valueAsNumber: true })}
                  disabled={isLoading}
                />
                {errors.service_radius_km && (
                  <p className="text-sm text-destructive">{errors.service_radius_km.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
