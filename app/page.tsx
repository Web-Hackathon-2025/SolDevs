import Link from "next/link";
import { ArrowRight, Search, Shield, Star, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-xl font-bold">K</span>
            </div>
            <span className="text-xl font-bold">Karigar</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/search"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Find Services
            </Link>
            <Link
              href="/become-provider"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Become a Provider
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-24 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Find Trusted Local{" "}
              <span className="text-primary">Service Providers</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Connect with verified professionals for plumbing, electrical, cleaning,
              tutoring, and more. Book services easily and get work done efficiently.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/search"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Find a Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/become-provider"
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Karigar?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We make finding and hiring local service providers simple, safe, and
              efficient.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative flex flex-col items-center rounded-lg border bg-card p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Verified Providers</h3>
              <p className="mt-3 text-muted-foreground">
                All service providers are verified and reviewed by our community to
                ensure quality and reliability.
              </p>
            </div>
            <div className="relative flex flex-col items-center rounded-lg border bg-card p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Easy Discovery</h3>
              <p className="mt-3 text-muted-foreground">
                Search by category, location, and ratings to find the perfect service
                provider for your needs.
              </p>
            </div>
            <div className="relative flex flex-col items-center rounded-lg border bg-card p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Transparent Reviews</h3>
              <p className="mt-3 text-muted-foreground">
                Read honest reviews from real customers to make informed decisions about
                your service provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Users className="mx-auto h-12 w-12" />
            <h2 className="mt-4 text-3xl font-bold">Ready to get started?</h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Join thousands of satisfied customers and service providers on Karigar.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-foreground hover:bg-background/90 transition-colors"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h4 className="text-sm font-semibold">Platform</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/search"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Find Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/become-provider"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Become a Provider
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Follow Us</h4>
              <p className="mt-4 text-sm text-muted-foreground">
                Connect with us on social media
              </p>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Karigar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
