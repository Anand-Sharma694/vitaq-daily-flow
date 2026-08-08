import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BedDouble,
  Brain,
  CheckCircle2,
  HeartPulse,
  LineChart,
  ShieldCheck,
  Sparkle,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/vitaq/MarketingShell";
import { ScoreRing, ScoreBar } from "@/components/vitaq/ScoreRing";
import { DEMO_SCORE, SCORE_DISCLAIMER } from "@/lib/vitaq";
import heroImage from "@/assets/vitaq-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VITAQ — Know Your Body. Improve Your Day." },
      {
        name: "description",
        content:
          "VITAQ turns your daily habits into a clear wellness score and small actions that fit a busy workday. Preventive wellness for urban professionals.",
      },
      { property: "og:title", content: "VITAQ — Know Your Body. Improve Your Day." },
      {
        property: "og:description",
        content:
          "A 2-minute wellness assessment, a personal wellness score, and daily actions that actually fit your schedule.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const PILLARS = [
  {
    icon: Activity,
    title: "Movement",
    body: "Steps, sitting time and activity breaks measured against how your day really runs.",
  },
  {
    icon: BedDouble,
    title: "Sleep",
    body: "Duration and rhythm — because a consistent bedtime beats an occasional long night.",
  },
  {
    icon: HeartPulse,
    title: "Lifestyle",
    body: "Hydration, meal regularity and screen load, tracked without obsessive logging.",
  },
  {
    icon: Timer,
    title: "Recovery",
    body: "Workload pressure and wind-down space, so burnout shows up before it hits.",
  },
  {
    icon: LineChart,
    title: "Consistency",
    body: "The compounding metric. Small repeated actions move your score the most.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Take the 2-minute assessment",
    body: "Answer plain questions about your work, movement, sleep and routine. No wearables required.",
  },
  {
    n: "02",
    title: "Get your VITAQ Wellness Score",
    body: "A 0–100 indicator with a transparent breakdown across five pillars — and what's pulling it down.",
  },
  {
    n: "03",
    title: "Act on 3 small things daily",
    body: "Your coach turns the score into today's plan. Tick them off, build streaks, watch the score move.",
  },
];

function Home() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="surface-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="min-w-0 animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              <Sparkle className="h-3.5 w-3.5" /> Preventive wellness, not another tracker
            </span>
            <h1 className="mt-6 text-balance-tight text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Know Your Body.
              <br />
              Improve Your Day.
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-base text-muted-foreground sm:text-lg">
              You sit for nine hours, sleep six and a half, and feel it by Wednesday. VITAQ turns
              those everyday signals into one clear score — and three small actions that actually
              fit your calendar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="hero" size="lg" asChild>
                <Link to="/assessment">
                  Check My Wellness <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/how-it-works">See how it works</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> No wearable needed
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> 2 minutes to your score
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" /> Private by default
              </span>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="overflow-hidden rounded-3xl border border-border/70 shadow-lift">
              <img
                src={heroImage}
                alt="Young urban professional stretching beside a desk in soft morning light"
                className="h-full w-full object-cover"
                width={1024}
                height={1024}
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden w-64 rounded-2xl border border-border bg-card p-4 shadow-lift sm:block">
              <div className="flex items-center gap-3">
                <ScoreRing value={DEMO_SCORE.overall} size={72} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">Your VITAQ Score</p>
                  <p className="truncate font-display text-sm font-bold">You're doing well</p>
                  <p className="mt-0.5 text-xs text-primary">+4 this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Modern work quietly wears the body down
            </h2>
            <p className="mt-4 text-muted-foreground">
              Long sitting hours, irregular sleep, skipped meals and non-stop screens. Nothing feels
              wrong enough to act on — until it does. Health apps hand you charts. VITAQ hands you
              the next small step.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: "8.2 hrs", label: "Average sitting time on a work day" },
              { stat: "6.8 hrs", label: "Average sleep for desk professionals" },
              { stat: "3 in 4", label: "Report low energy by mid-week" },
              { stat: "< 1%", label: "Act on generic health advice" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-background p-5">
                <p className="font-display text-2xl font-extrabold text-primary">{s.stat}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Illustrative figures shown for context, not clinical research findings.
          </p>
        </div>
      </section>

      {/* Score preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <h2 className="text-3xl font-extrabold sm:text-4xl">One number you can actually use</h2>
            <p className="mt-4 text-muted-foreground">
              The VITAQ Wellness Score combines five pillars into a single 0–100 indicator. Every
              point is traceable — open the breakdown and you'll see exactly which habit moved it.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Transparent weighting across all five pillars",
                "Updates as you log habits, not once a year",
                "Explains the why, then gives you the what-next",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">{SCORE_DISCLAIMER}</p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 sm:flex sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">Sample score</p>
                <p className="mt-1 font-display text-xl font-bold">You're doing well</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Movement is the biggest opportunity this week.
                </p>
              </div>
              <ScoreRing value={DEMO_SCORE.overall} size={132} />
            </div>
            <div className="mt-8 space-y-4">
              <ScoreBar label="Movement" value={DEMO_SCORE.movement} />
              <ScoreBar label="Sleep" value={DEMO_SCORE.sleep} />
              <ScoreBar label="Lifestyle" value={DEMO_SCORE.lifestyle} />
              <ScoreBar label="Recovery" value={DEMO_SCORE.recovery} />
              <ScoreBar label="Consistency" value={DEMO_SCORE.consistency} />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="max-w-xl text-3xl font-extrabold sm:text-4xl">
            Five pillars. Measured the way you live.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
            <div className="flex flex-col justify-between rounded-2xl border border-primary/25 bg-primary-soft p-6">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-primary">
                  <Brain className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">Your AI Wellness Coach</h3>
                <p className="mt-2 text-sm text-accent-foreground/80">
                  Ask anything about your score, your sleep or your week. It answers with your
                  numbers, in plain language.
                </p>
              </div>
              <Button variant="ink" className="mt-5 self-start" asChild>
                <Link to="/features">Explore features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Three steps, then it runs with you</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-4xl font-extrabold text-primary/25">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl surface-ink px-6 py-14 text-center shadow-lift sm:px-12">
          <h2 className="text-balance-tight text-3xl font-extrabold text-primary-foreground sm:text-4xl">
            Your score is two minutes away
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/70">
            No devices to buy, no 40-question form. Answer honestly and see where your week actually
            stands.
          </p>
          <Button variant="hero" size="lg" className="mt-8" asChild>
            <Link to="/assessment">
              Check My Wellness <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </MarketingShell>
  );
}
