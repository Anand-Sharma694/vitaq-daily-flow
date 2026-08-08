import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHeader, Prose } from "@/components/vitaq/MarketingShell";
import { SCORE_DISCLAIMER } from "@/lib/vitaq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "VITAQ FAQ — Score, Privacy and Accuracy" },
      { name: "description", content: "Common questions about the VITAQ wellness score, data privacy, wearables and what the app is not." },
      { property: "og:title", content: "VITAQ FAQ" },
      { property: "og:description", content: "How the score works, what we store, and what VITAQ is not." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

const QA = [
  ["Do I need a smartwatch?", "No. Every input is self-reported and takes about two minutes."],
  ["Is the score a medical result?", SCORE_DISCLAIMER],
  ["How often should I re-assess?", "Monthly is plenty. Daily habit logging is what moves the score in between."],
  ["Who can see my data?", "Only you. Business dashboards show aggregated, anonymised trends and never individual answers."],
];

function Faq() {
  return (
    <MarketingShell>
      <PageHeader eyebrow="FAQ" title="Questions worth answering upfront" />
      <Prose>
        {QA.map(([q, a]) => (
          <div key={q}>
            <h2>{q}</h2>
            <p>{a}</p>
          </div>
        ))}
      </Prose>
    </MarketingShell>
  );
}
