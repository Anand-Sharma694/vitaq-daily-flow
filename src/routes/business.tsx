import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell, PageHeader } from "@/components/vitaq/MarketingShell";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "VITAQ for Business — Aggregated Team Wellness" },
      {
        name: "description",
        content:
          "Give teams a preventive wellness tool and see anonymised, aggregated trends across departments. No individual health data.",
      },
      { property: "og:title", content: "VITAQ for Business" },
      { property: "og:description", content: "Anonymised, aggregated wellness insight for teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Business,
});

const POINTS = [
  { icon: Users, title: "Adoption people keep", body: "Two-minute onboarding and three daily actions — not a portal nobody logs into." },
  { icon: BarChart3, title: "Aggregated insight only", body: "Department-level trends and participation. Never an individual's score or answers." },
  { icon: Building2, title: "Built for Indian workplaces", body: "Designed around long desk hours, commutes and hybrid schedules." },
];

function Business() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="For business"
        title="Preventive wellness your team will actually use"
        subtitle="VITAQ gives employees a private personal coach, and gives you anonymised trends — never individual health data."
      />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {POINTS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
                <p.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl surface-ink px-6 py-12 text-center shadow-lift sm:px-12">
          <h2 className="text-3xl font-extrabold text-primary-foreground">
            See the organisation view
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/70">
            A sample aggregated dashboard: participation, average wellness score and the pillars
            most under pressure across departments.
          </p>
          <Button variant="hero" size="lg" className="mt-7" asChild>
            <Link to="/pricing">View plans</Link>
          </Button>
        </div>
      </section>
    </MarketingShell>
  );
}
