"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { searchProviders } from "@/app/actions/providers";
import { SERVICE_CATEGORIES } from "@/types";
import Link from "next/link";

export default function SearchPage() {
  const [providers, setProviders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    city: "",
  });

  async function performSearch() {
    setIsLoading(true);
    const result = await searchProviders(filters);
    if (result.data) {
      setProviders(result.data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    performSearch();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/10">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Find Service Providers</h1>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services or providers..."
                  value={filters.query}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <Select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="City..."
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <Button onClick={performSearch} className="mt-4">
            Search
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : providers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No service providers found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={provider.user?.avatar_url} />
                      <AvatarFallback>
                        {getInitials(provider.business_name || provider.user?.full_name || "U")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">
                        {provider.business_name || provider.user?.full_name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">
                            {provider.average_rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({provider.total_reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {provider.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{provider.city}, {provider.state}</span>
                  </div>

                  {provider.services && provider.services.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {provider.services.slice(0, 3).map((service: any) => (
                        <Badge key={service.id} variant="secondary">
                          {SERVICE_CATEGORIES.find((c) => c.value === service.category)?.label}
                        </Badge>
                      ))}
                      {provider.services.length > 3 && (
                        <Badge variant="outline">+{provider.services.length - 3} more</Badge>
                      )}
                    </div>
                  )}

                  <Link href={`/providers/${provider.id}`}>
                    <Button className="w-full">View Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
