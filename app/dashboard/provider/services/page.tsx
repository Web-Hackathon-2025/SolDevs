"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, type ServiceInput } from "@/lib/validations/profile";
import { createService, getProviderServices, deleteService } from "@/app/actions/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/types";

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
  });

  async function loadServices() {
    const result = await getProviderServices();
    if (result.data) {
      setServices(result.data);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function onSubmit(data: ServiceInput) {
    setIsLoading(true);
    setError(null);

    const result = await createService(data);

    if (result.error) {
      setError(result.error);
    } else {
      reset();
      setShowForm(false);
      loadServices();
    }

    setIsLoading(false);
  }

  async function handleDelete(serviceId: string) {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const result = await deleteService(serviceId);
    if (result.success) {
      loadServices();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
          <p className="text-muted-foreground mt-1">
            Manage the services you offer to customers
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
            <CardDescription>
              Provide details about the service you want to offer
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
                <Label htmlFor="category">Category</Label>
                <Select id="category" {...register("category")} disabled={isLoading}>
                  <option value="">Select a category</option>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_name">Service Name</Label>
                <Input
                  id="service_name"
                  placeholder="e.g., Emergency Plumbing Repair"
                  {...register("service_name")}
                  disabled={isLoading}
                />
                {errors.service_name && (
                  <p className="text-sm text-destructive">{errors.service_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this service includes..."
                  rows={3}
                  {...register("description")}
                  disabled={isLoading}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="base_price">Base Price ($)</Label>
                  <Input
                    id="base_price"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("base_price", { valueAsNumber: true })}
                    disabled={isLoading}
                  />
                  {errors.base_price && (
                    <p className="text-sm text-destructive">{errors.base_price.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price_unit">Price Unit</Label>
                  <Input
                    id="price_unit"
                    placeholder="per hour / fixed / per sq ft"
                    {...register("price_unit")}
                    disabled={isLoading}
                  />
                  {errors.price_unit && (
                    <p className="text-sm text-destructive">{errors.price_unit.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration_minutes">Estimated Duration (minutes)</Label>
                <Input
                  id="duration_minutes"
                  type="number"
                  min="15"
                  {...register("duration_minutes", { valueAsNumber: true })}
                  disabled={isLoading}
                />
                {errors.duration_minutes && (
                  <p className="text-sm text-destructive">{errors.duration_minutes.message}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Adding..." : "Add Service"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {services.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No services added yet</p>
              <Button onClick={() => setShowForm(true)} variant="outline" className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Service
              </Button>
            </CardContent>
          </Card>
        ) : (
          services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {service.service_name}
                      <Badge variant={service.is_active ? "success" : "secondary"}>
                        {service.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {SERVICE_CATEGORIES.find((c) => c.value === service.category)?.label}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-medium">Price:</span> ${service.base_price} {service.price_unit}
                  </div>
                  {service.duration_minutes && (
                    <div>
                      <span className="font-medium">Duration:</span> {service.duration_minutes} min
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
