import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell, PageHeader } from "@/components/vitaq/MarketingShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "VITAQ Pricing — Free Score, Premium Coaching" },
      {
        name: "description",
        content:
          "Start free with your wellness score and daily actions. Upgrade for the AI coach, deep analytics and long-term trends.",
      },
      { property: "og:title", content: "VITAQ Pricing" },
      { property: "og:description", content: "Free wellness score. Premium coaching when you want more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    tagline: "Understand where you stand.",
    features: [
      "Wellness assessment",
      "VITAQ Wellness Score with breakdown",
      "Daily action plan",
      "Basic habit tracking",
    ],
    cta: "Start free",
    to: "/assessment" as const,
    variant: "outline" as const,
  },
  {
    name: "Premium",
    price: "₹499",
    period: "per month",
    tagline: "Coaching that adapts weekly.",
    features: [
      "Everything in Free",
      "AI Wellness Coach conversations",
      "Progress analytics and trends",
      "Personalised weekly recommendations",
      "Unlimited habit history",
    ],
    cta: "Check My Wellness",
    to: "/assessment" as const,
    variant: "hero" as const,
    featured: true,
  },
  {
    name: "Business",
    price: "Custom",
    period: "per organisation",
    tagline: "Wellness for whole teams.",
    features: [
      "Aggregated, anonymised team insights",
      "Department-level wellness trends",
      "Engagement and participation reporting",
      "Dedicated onboarding",
    ],
    cta: "Talk to us",
    to: "/business" as const,
    variant: "ink" as const,
  },
];

function Pricing() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Pricing"
        title="Start free. Upgrade only if it earns it."
        subtitle="Your score and daily plan cost nothing. Premium adds the coach and the long view."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-3xl border bg-card p-7 ${
                p.featured ? "border-primary/40 shadow-lift" : "border-border shadow-soft"
              }`}
            >
              {p.featured ? (
                <span className="mb-4 inline-flex w-fit rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                  Most popular
                </span>
              ) : null}
              <h2 className="font-display text-lg font-bold">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-5 font-display text-4xl font-extrabold">{p.price}</p>
              <p className="text-sm text-muted-foreground">{p.period}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={p.variant} size="lg" className="mt-7" asChild>
                <Link to={p.to}>{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Prices shown are indicative for this preview and are not charged.
        </p>
      </section>
    </MarketingShell>
  );
}
