import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Bot, CalendarCheck, LineChart, ShieldCheck, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell, PageHeader } from "@/components/vitaq/MarketingShell";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "VITAQ Features — Score, Coach, Habits, Progress" },
      {
        name: "description",
        content:
          "Wellness score, AI wellness coach, daily habit tracking, progress analytics and privacy-first data handling in one calm app.",
      },
      { property: "og:title", content: "VITAQ Features" },
      {
        property: "og:description",
        content: "Everything VITAQ gives you: score, coach, habits, progress and privacy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Features,
});

const FEATURES = [
  {
    icon: Activity,
    title: "VITAQ Wellness Score",
    body: "A single 0–100 indicator built from movement, sleep, lifestyle, recovery and consistency — with a full breakdown, never a black box.",
  },
  {
    icon: Bot,
    title: "AI Wellness Coach",
    body: "Ask why your score dropped or what to do about a bad sleep week. The coach answers using your own numbers, in plain language.",
  },
  {
    icon: CalendarCheck,
    title: "Daily habit tracking",
    body: "Three to four actions a day, tuned to your weakest pillar. Tick them off in seconds and build a streak worth protecting.",
  },
  {
    icon: LineChart,
    title: "Progress analytics",
    body: "Weekly and monthly trends, pillar movement, and the habits most correlated with your best days.",
  },
  {
    icon: Target,
    title: "Personalised recommendations",
    body: "Recommendations change as your inputs change — no static PDF plan that goes stale in a week.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Your wellness data belongs to you. It is never sold, and employer dashboards only ever show aggregated, anonymised trends.",
  },
];

function Features() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Features"
        title="Everything you need. Nothing you'll ignore."
        subtitle="VITAQ deliberately does less than a full health suite — so the parts you use actually get used."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
                <f.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold">{f.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/assessment">Check My Wellness</Link>
          </Button>
        </div>
      </section>
    </MarketingShell>
  );
}
