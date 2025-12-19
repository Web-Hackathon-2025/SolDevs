import { type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Gradient Mesh */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[80px] animate-float" style={{ animationDelay: "4s" }} />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
      >
        <div className="rounded-full bg-background/50 p-2 group-hover:bg-background/80 transition-all backdrop-blur-sm border border-transparent group-hover:border-border">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md px-4 animate-slide-up">
        {children}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 text-center text-sm text-muted-foreground z-10">
        <p>&copy; {new Date().getFullYear()} Karigar. All rights reserved.</p>
      </div>
    </div>
  );
}
