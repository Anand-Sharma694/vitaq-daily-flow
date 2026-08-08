/**
 * VITAQ Wellness Score — Demo Indicator.
 * A transparent, lifestyle-based indicator. Not a clinical measurement.
 */

export const DISCLAIMER =
  "VITAQ provides general wellness information and lifestyle recommendations. It is not a medical device and does not diagnose, treat, cure, or prevent medical conditions.";

export const SCORE_DISCLAIMER =
  "VITAQ Wellness Score is an informational wellness indicator and is not a medical diagnosis.";

export const SCORE_TOOLTIP =
  "A proprietary lifestyle indicator created for wellness tracking. It is not a clinical measurement.";

export type AssessmentAnswers = {
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  occupation: string;
  workingHours: number;
  sittingHours: number;
  workMode: string;
  dailySteps: number;
  exerciseDaysPerWeek: number;
  exerciseMinutes: number;
  sleepHours: number;
  sleepConsistency: number; // 1-5
  waterGlasses: number;
  mealRegularity: number; // 1-5
  screenHours: number;
  goals: string[];
};

export type ScoreBreakdown = {
  overall: number;
  movement: number;
  sleep: number;
  lifestyle: number;
  recovery: number;
  consistency: number;
};

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const round = (n: number) => Math.round(clamp(n));

/** Normalize a value against a target, capped at 100. */
const ratio = (value: number, target: number) => clamp((value / target) * 100);

export function calculateScore(a: AssessmentAnswers): ScoreBreakdown {
  // Movement: steps (60%) + sitting penalty (40%)
  const steps = ratio(a.dailySteps, 10000);
  const sitting = clamp(100 - Math.max(0, a.sittingHours - 4) * 11);
  const movement = round(steps * 0.6 + sitting * 0.4);

  // Sleep: duration proximity to 7.5h + schedule consistency
  const duration = clamp(100 - Math.abs(a.sleepHours - 7.5) * 22);
  const consistencyOfSleep = ratio(a.sleepConsistency, 5);
  const sleep = round(duration * 0.65 + consistencyOfSleep * 0.35);

  // Lifestyle: hydration + meals + screen time
  const hydration = ratio(a.waterGlasses, 8);
  const meals = ratio(a.mealRegularity, 5);
  const screens = clamp(100 - Math.max(0, a.screenHours - 6) * 9);
  const lifestyle = round(hydration * 0.35 + meals * 0.35 + screens * 0.3);

  // Recovery: workload pressure + sleep debt + wind-down space
  const workload = clamp(100 - Math.max(0, a.workingHours - 8) * 12);
  const sleepDebt = clamp(100 - Math.max(0, 7 - a.sleepHours) * 20);
  const recovery = round(workload * 0.45 + sleepDebt * 0.45 + screens * 0.1);

  // Consistency: exercise rhythm + sleep rhythm + meal rhythm
  const exercise = ratio(a.exerciseDaysPerWeek * (a.exerciseMinutes >= 20 ? 1 : 0.6), 5);
  const consistency = round(exercise * 0.45 + consistencyOfSleep * 0.35 + meals * 0.2);

  const overall = round(
    movement * 0.25 + sleep * 0.2 + lifestyle * 0.2 + recovery * 0.15 + consistency * 0.2,
  );

  return { overall, movement, sleep, lifestyle, recovery, consistency };
}

export const SCORE_WEIGHTS = [
  { label: "Activity / Movement", weight: 25 },
  { label: "Sleep", weight: 20 },
  { label: "Lifestyle", weight: 20 },
  { label: "Recovery", weight: 15 },
  { label: "Consistency", weight: 20 },
];

export function scoreBand(score: number) {
  if (score >= 80) return { label: "Excellent rhythm", tone: "success" as const };
  if (score >= 70) return { label: "You're doing well", tone: "success" as const };
  if (score >= 55) return { label: "Room to build", tone: "warning" as const };
  return { label: "Let's start small", tone: "warning" as const };
}

export type Insight = { text: string; kind: "good" | "improve" };

export function buildInsights(s: ScoreBreakdown, a?: AssessmentAnswers | null): Insight[] {
  const entries: Array<[string, number]> = [
    ["Daily movement", s.movement],
    ["Sleep consistency", s.sleep],
    ["Lifestyle habits", s.lifestyle],
    ["Recovery space", s.recovery],
    ["Routine consistency", s.consistency],
  ];
  const good = entries
    .filter(([, v]) => v >= 70)
    .slice(0, 3)
    .map(([k]) => ({ text: `Good ${k.toLowerCase()}`, kind: "good" as const }));
  const improve = entries
    .filter(([, v]) => v < 70)
    .slice(0, 3)
    .map(([k]) => ({ text: `${k} needs attention`, kind: "improve" as const }));

  if (a && a.sittingHours >= 8) {
    improve.unshift({ text: "High sitting time", kind: "improve" });
  }
  return [...good, ...improve.slice(0, 3)];
}

export type PlanItem = { index: string; category: string; action: string };

export function buildDailyPlan(s: ScoreBreakdown): PlanItem[] {
  const plan: PlanItem[] = [];
  const push = (category: string, action: string) =>
    plan.push({ index: String(plan.length + 1).padStart(2, "0"), category, action });

  if (s.movement < 80)
    push("Move", "Take a 5–10 minute movement break every 60–90 minutes.");
  if (s.sleep < 85) push("Sleep", "Aim for a consistent bedtime tonight.");
  if (s.movement < 90) push("Activity", "Complete a 20-minute walk.");
  if (s.recovery < 85) push("Recovery", "Take 10 minutes away from screens before bed.");
  if (s.lifestyle < 85) push("Lifestyle", "Drink a glass of water with every meal today.");
  if (plan.length < 3) push("Consistency", "Repeat yesterday's best habit — consistency compounds.");
  return plan.slice(0, 4);
}

export const HABIT_CATALOG = [
  { name: "20-minute walk", icon: "footprints" },
  { name: "Exercise session", icon: "dumbbell" },
  { name: "Consistent bedtime", icon: "moon" },
  { name: "Drink enough water", icon: "droplets" },
  { name: "2 movement breaks", icon: "timer" },
  { name: "Screen-free wind-down", icon: "monitor-off" },
  { name: "10 min relaxation", icon: "wind" },
  { name: "Healthy meal routine", icon: "salad" },
];

export const DEFAULT_HABITS = [
  "20-minute walk",
  "2 movement breaks",
  "Drink enough water",
  "Screen-free wind-down",
  "Exercise session",
];

/** Realistic demo profile used before an assessment is completed. */
export const DEMO_ANSWERS: AssessmentAnswers = {
  age: 28,
  gender: "male",
  heightCm: 175,
  weightKg: 74,
  occupation: "Software Engineer",
  workingHours: 9,
  sittingHours: 8.2,
  workMode: "hybrid",
  dailySteps: 6842,
  exerciseDaysPerWeek: 3,
  exerciseMinutes: 35,
  sleepHours: 6.8,
  sleepConsistency: 4,
  waterGlasses: 5,
  mealRegularity: 3,
  screenHours: 9,
  goals: ["Reduce sedentary time", "Sleep better", "Improve daily energy"],
};

export const DEMO_SCORE: ScoreBreakdown = {
  overall: 78,
  movement: 72,
  sleep: 81,
  lifestyle: 76,
  recovery: 68,
  consistency: 84,
};

export const GOAL_OPTIONS = [
  "Improve fitness",
  "Sleep better",
  "Reduce sedentary time",
  "Improve daily energy",
  "Build healthier routines",
  "Improve consistency",
  "General wellness",
];

export function formatSleep(hours: number) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
