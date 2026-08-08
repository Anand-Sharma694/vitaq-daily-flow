import { Link } from "@tanstack/react-router";
import { VitaqLogo } from "./Logo";
import { DISCLAIMER } from "@/lib/vitaq";

const GROUPS = [
  {
    title: "Product",
    links: [
      { to: "/how-it-works", label: "How It Works" },
      { to: "/features", label: "Features" },
      { to: "/assessment", label: "Wellness Assessment" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/business", label: "VITAQ for Business" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
    ],
  },
] as const;

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="min-w-0">
            <VitaqLogo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Know Your Body. Improve Your Day. Your personal preventive wellness coach for the way
              you actually live.
            </p>
          </div>
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {g.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} VITAQ. Track less. Understand more. Act better.
          </p>
        </div>
      </div>
    </footer>
  );
}
