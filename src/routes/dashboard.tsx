import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/vitaq/MarketingShell";
import { ScoreRing, ScoreBar } from "@/components/vitaq/ScoreRing";
import {
  DEFAULT_HABITS,
  DEMO_ANSWERS,
  DEMO_SCORE,
  SCORE_DISCLAIMER,
  buildDailyPlan,
  buildInsights,
  scoreBand,
} from "@/lib/vitaq";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — VITAQ" },
      { name: "description", content: "Your VITAQ wellness score, today's actions and habit streaks in one view." },
      { property: "og:title", content: "VITAQ Dashboard" },
      { property: "og:description", content: "Your score, today's actions and habit streaks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [checked, setChecked] = useState<string[]>([]);
  const score = DEMO_SCORE;
  const band = scoreBand(score.overall);

  const toggle = (habit: string) =>
    setChecked((c) => (c.includes(habit) ? c.filter((h) => h !== habit) : [...c, habit]));

  return (
    <MarketingShell>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-extrabold sm:text-3xl">
              Good to see you
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{band.label} — here's today.</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/assessment">Re-assess</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
          <div className="rounded-3xl border border-border bg-card p-7 text-center shadow-soft">
            <ScoreRing value={score.overall} size={192} className="mx-auto" />
            <p className="mt-4 text-sm font-medium">VITAQ Wellness Score</p>
            <p className="mt-1 text-xs text-muted-foreground">Updated today</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="font-display text-lg font-bold">Pillar breakdown</h2>
            <div className="mt-5 space-y-4">
              <ScoreBar label="Movement" value={score.movement} />
              <ScoreBar label="Sleep" value={score.sleep} />
              <ScoreBar label="Lifestyle" value={score.lifestyle} />
              <ScoreBar label="Recovery" value={score.recovery} />
              <ScoreBar label="Consistency" value={score.consistency} />
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{SCORE_DISCLAIMER}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="font-display text-lg font-bold">Today's actions</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {buildDailyPlan(score).map((p) => (
                <li key={p.index} className="flex items-start gap-3">
                  <span className="font-display text-xs font-bold text-primary">{p.index}</span>
                  <span>
                    <span className="font-medium">{p.category}. </span>
                    {p.action}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
              <h2 className="min-w-0 font-display text-lg font-bold">Habits</h2>
              <span className="text-sm text-muted-foreground">
                {checked.length}/{DEFAULT_HABITS.length}
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {DEFAULT_HABITS.map((h) => {
                const active = checked.includes(h);
                return (
                  <li key={h}>
                    <button
                      type="button"
                      onClick={() => toggle(h)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        active ? "border-primary bg-primary-soft" : "border-border hover:bg-muted"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                          active ? "surface-accent border-transparent" : "border-input"
                        }`}
                      >
                        {active ? (
                          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-primary-foreground" aria-hidden="true">
                            <path d="M5 10.5l3.2 3.2L15 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1">{h}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-card p-7 shadow-soft">
          <h2 className="font-display text-lg font-bold">What stands out this week</h2>
          <ul className="mt-4 grid gap-2.5 text-sm sm:grid-cols-2">
            {buildInsights(score, DEMO_ANSWERS).map((i) => (
              <li key={i.text} className="flex items-start gap-2.5">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    i.kind === "good" ? "bg-primary" : "bg-destructive/70"
                  }`}
                />
                <span>{i.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MarketingShell>
  );
}
