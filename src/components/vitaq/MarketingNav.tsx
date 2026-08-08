import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VitaqLogo } from "./Logo";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/business", label: "For Business" },
] as const;

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <VitaqLogo />

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {session ? (
            <Button variant="hero" onClick={() => navigate({ to: "/dashboard" })}>
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate({ to: "/auth" })}>
                Log in
              </Button>
              <Button variant="hero" onClick={() => navigate({ to: "/assessment" })}>
                Check My Wellness
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
        style={{ transition: "max-height 250ms ease" }}
      >
        <div className="space-y-1 px-4 py-4">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            {session ? (
              <Button variant="hero" size="lg" onClick={() => navigate({ to: "/dashboard" })}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" size="lg" onClick={() => navigate({ to: "/auth" })}>
                  Log in
                </Button>
                <Button variant="hero" size="lg" onClick={() => navigate({ to: "/assessment" })}>
                  Check My Wellness
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
