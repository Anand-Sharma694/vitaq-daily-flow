import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MarketingShell, PageHeader } from "@/components/vitaq/MarketingShell";
import { ScoreRing, ScoreBar } from "@/components/vitaq/ScoreRing";
import {
  DEMO_ANSWERS,
  GOAL_OPTIONS,
  SCORE_DISCLAIMER,
  buildDailyPlan,
  buildInsights,
  calculateScore,
  scoreBand,
  type AssessmentAnswers,
} from "@/lib/vitaq";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Wellness Assessment — VITAQ" },
      { name: "description", content: "Answer a few plain questions about your work, movement, sleep and routine to get your VITAQ Wellness Score." },
      { property: "og:title", content: "VITAQ Wellness Assessment" },
      { property: "og:description", content: "Two minutes to your wellness score." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Assessment,
});

type Field = { key: keyof AssessmentAnswers; label: string; min: number; max: number; step: number; suffix: string };

const STEPS: Array<{ title: string; caption: string; fields: Field[] }> = [
  {
    title: "Your work day",
    caption: "How your typical weekday is shaped.",
    fields: [
      { key: "workingHours", label: "Working hours per day", min: 4, max: 14, step: 0.5, suffix: "hrs" },
      { key: "sittingHours", label: "Hours seated per day", min: 2, max: 14, step: 0.5, suffix: "hrs" },
    ],
  },
  {
    title: "Movement",
    caption: "Roughly, not precisely — estimates are fine.",
    fields: [
      { key: "dailySteps", label: "Average daily steps", min: 1000, max: 20000, step: 500, suffix: "steps" },
      { key: "exerciseDaysPerWeek", label: "Exercise days per week", min: 0, max: 7, step: 1, suffix: "days" },
      { key: "exerciseMinutes", label: "Minutes per session", min: 0, max: 120, step: 5, suffix: "min" },
    ],
  },
  {
    title: "Sleep",
    caption: "Your usual pattern, not your best night.",
    fields: [
      { key: "sleepHours", label: "Hours of sleep", min: 3, max: 11, step: 0.5, suffix: "hrs" },
      { key: "sleepConsistency", label: "Bedtime consistency", min: 1, max: 5, step: 1, suffix: "/ 5" },
    ],
  },
  {
    title: "Lifestyle",
    caption: "Hydration, meals and screens.",
    fields: [
      { key: "waterGlasses", label: "Glasses of water per day", min: 0, max: 15, step: 1, suffix: "glasses" },
      { key: "mealRegularity", label: "Meal regularity", min: 1, max: 5, step: 1, suffix: "/ 5" },
      { key: "screenHours", label: "Screen hours per day", min: 2, max: 16, step: 0.5, suffix: "hrs" },
    ],
  },
];

function Assessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(DEMO_ANSWERS);
  const [done, setDone] = useState(false);

  const score = useMemo(() => calculateScore(answers), [answers]);
  const total = STEPS.length + 1;
  const progress = Math.round(((done ? total : step) / total) * 100);

  const set = (key: keyof AssessmentAnswers, value: number) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const toggleGoal = (goal: string) =>
    setAnswers((a) => ({
      ...a,
      goals: a.goals.includes(goal) ? a.goals.filter((g) => g !== goal) : [...a.goals, goal],
    }));

  if (done) {
    const band = scoreBand(score.overall);
    return (
      <MarketingShell>
        <PageHeader eyebrow="Your result" title="Your VITAQ Wellness Score" subtitle={band.label} />
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <div className="grid gap-8 rounded-3xl border border-border bg-card p-7 shadow-soft lg:grid-cols-[auto_minmax(0,1fr)]">
            <ScoreRing value={score.overall} size={188} className="mx-auto" />
            <div className="min-w-0 space-y-4">
              <ScoreBar label="Movement" value={score.movement} />
              <ScoreBar label="Sleep" value={score.sleep} />
              <ScoreBar label="Lifestyle" value={score.lifestyle} />
              <ScoreBar label="Recovery" value={score.recovery} />
              <ScoreBar label="Consistency" value={score.consistency} />
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold">What stands out</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {buildInsights(score, answers).map((i) => (
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
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold">Today's plan</h2>
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
          </div>

          <p className="mt-6 text-xs text-muted-foreground">{SCORE_DISCLAIMER}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/auth">Save my score</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => { setDone(false); setStep(0); }}>
              Retake assessment
            </Button>
          </div>
        </section>
      </MarketingShell>
    );
  }

  const isGoalsStep = step === STEPS.length;
  const current = STEPS[step];

  return (
    <MarketingShell>
      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full surface-accent"
            style={{ width: `${progress}%`, transition: "width 400ms ease" }}
          />
        </div>
        <p className="mt-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Step {step + 1} of {total}
        </p>

        <div className="mt-6 rounded-3xl border border-border bg-card p-7 shadow-soft">
          <h1 className="font-display text-2xl font-extrabold">
            {isGoalsStep ? "What matters most to you?" : current!.title}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isGoalsStep ? "Pick as many as apply." : current!.caption}
          </p>

          {isGoalsStep ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {GOAL_OPTIONS.map((g) => {
                const active = answers.goals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      active
                        ? "border-primary bg-primary-soft text-accent-foreground"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-7 space-y-7">
              {current!.fields.map((f) => (
                <div key={String(f.key)}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
                    <label htmlFor={String(f.key)} className="min-w-0 text-sm font-medium">
                      {f.label}
                    </label>
                    <span className="font-display text-sm font-bold tabular-nums text-primary">
                      {answers[f.key] as number} {f.suffix}
                    </span>
                  </div>
                  <input
                    id={String(f.key)}
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={answers[f.key] as number}
                    onChange={(e) => set(f.key, Number(e.target.value))}
                    className="mt-3 w-full accent-[var(--primary)]"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-9 flex gap-3">
            {step > 0 ? (
              <Button variant="outline" size="lg" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            ) : null}
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              onClick={() => (isGoalsStep ? setDone(true) : setStep((s) => s + 1))}
            >
              {isGoalsStep ? "See my score" : "Continue"}
            </Button>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
