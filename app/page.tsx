import Link from "next/link";
import { ArrowRight, Search, Shield, Star, Users, CheckCircle2, Sparkles, TrendingUp, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "Every service provider undergoes background checks and verification to ensure your safety and quality."
    },
    {
      icon: Star,
      title: "5-Star Experience",
      description: "Read genuine reviews from real customers and make informed decisions about your service provider."
    },
    {
      icon: Clock,
      title: "Book Instantly",
      description: "Schedule services at your convenience with real-time availability and instant confirmation."
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      description: "Competitive pricing with transparent quotes. No hidden fees, ever."
    }
  ];

  const categories = [
    { name: "Plumbing", icon: "🔧", color: "bg-blue-50 text-blue-600" },
    { name: "Electrical", icon: "⚡", color: "bg-yellow-50 text-yellow-600" },
    { name: "Cleaning", icon: "🧹", color: "bg-green-50 text-green-600" },
    { name: "Tutoring", icon: "📚", color: "bg-purple-50 text-purple-600" },
    { name: "Carpentry", icon: "🔨", color: "bg-orange-50 text-orange-600" },
    { name: "Painting", icon: "🎨", color: "bg-pink-50 text-pink-600" },
  ];

  const stats = [
    { value: "10,000+", label: "Services Completed" },
    { value: "5,000+", label: "Verified Providers" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-xl font-bold">K</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Karigar</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
              Find Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/become-provider" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
              Become a Provider
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-medium">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Premium Design */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 gradient-mesh opacity-50"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <Badge variant="secondary" className="mb-6 shadow-sm">
              <Sparkles className="mr-1 h-3 w-3" />
              Trusted by 10,000+ customers
            </Badge>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 animate-slide-up">
              Find{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Trusted Local
              </span>
              <br />
              Service Providers
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Connect with verified professionals for plumbing, electrical, cleaning, tutoring, and more.
              Book services easily and get work done efficiently, all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/search">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all">
                  <Search className="mr-2 h-5 w-5" />
                  Find a Service
                </Button>
              </Link>
              <Link href="/become-provider">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-semibold border-2">
                  Become a Provider
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Verified providers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Instant booking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/20 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Popular Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our wide range of professional services available in your area
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/search?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="rounded-2xl border-2 border-transparent bg-card p-6 text-center transition-all hover:border-primary hover:shadow-premium card-hover">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${category.color} text-2xl`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Premium Cards */}
      <section className="py-20 md:py-28 bg-muted/10">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why Choose Karigar?
            </h2>
            <p className="text-lg text-muted-foreground">
              We make finding and hiring local service providers simple, safe, and efficient
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-premium hover:shadow-premium-lg transition-all card-hover"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150"></div>
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Gradient */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 gradient-primary opacity-90"></div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-white/90 mb-10">
              Join thousands of satisfied customers and service providers on Karigar
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 px-8 text-base font-semibold shadow-xl">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-semibold bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Browse Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Professional */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-8">
            <div>
              <h4 className="text-sm font-semibold mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Find Services</Link></li>
                <li><Link href="/become-provider" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Become a Provider</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Connect</h4>
              <p className="text-sm text-muted-foreground">
                Join our community and stay updated with the latest news and offers.
              </p>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <span className="text-sm font-bold">K</span>
              </div>
              <span className="font-semibold">Karigar</span>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Karigar. All rights reserved. Built with excellence.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
