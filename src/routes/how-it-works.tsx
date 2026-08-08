import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, Gauge, ListChecks, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell, PageHeader } from "@/components/vitaq/MarketingShell";
import { SCORE_WEIGHTS, SCORE_DISCLAIMER, SCORE_TOOLTIP } from "@/lib/vitaq";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How VITAQ Works — Assessment to Daily Action" },
      {
        name: "description",
        content:
          "Take a 2-minute assessment, get a transparent 0-100 wellness score across five pillars, then follow three small daily actions.",
      },
      { property: "og:title", content: "How VITAQ Works" },
      {
        property: "og:description",
        content: "From a 2-minute assessment to a daily plan you can actually keep.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    icon: ClipboardList,
    title: "1. Assess",
    body: "Six short screens covering your body basics, work pattern, movement, sleep, lifestyle and goals. Everything is self-reported — no device, no lab test.",
  },
  {
    icon: Gauge,
    title: "2. Score",
    body: "Your answers are weighted across five pillars into a single 0–100 indicator, with a per-pillar breakdown so nothing is a black box.",
  },
  {
    icon: ListChecks,
    title: "3. Act",
    body: "The score becomes a short daily plan: a walk, two movement breaks, a screen-free wind-down. Things that fit between meetings.",
  },
  {
    icon: Repeat,
    title: "4. Improve",
    body: "Log habits, build streaks and watch the trend. Consistency is scored, so showing up matters more than one perfect day.",
  },
];

function HowItWorks() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="How it works"
        title="From a two-minute answer to a better Wednesday"
        subtitle="VITAQ is built around one loop: understand where you are, do three small things, see the number move."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {STEPS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold">How the score is calculated</h2>
          <p className="mt-3 text-muted-foreground">{SCORE_TOOLTIP}</p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            {SCORE_WEIGHTS.map((w, i) => (
              <div
                key={w.label}
                className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <span className="min-w-0 truncate text-sm font-medium">{w.label}</span>
                <span className="font-display text-sm font-bold text-primary">{w.weight}%</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{SCORE_DISCLAIMER}</p>
          <Button variant="hero" size="lg" className="mt-8" asChild>
            <Link to="/assessment">Start my assessment</Link>
          </Button>
        </div>
      </section>
    </MarketingShell>
  );
}
