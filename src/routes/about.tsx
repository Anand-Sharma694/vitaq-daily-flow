import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHeader, Prose } from "@/components/vitaq/MarketingShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VITAQ — Preventive Wellness for Busy Professionals" },
      { name: "description", content: "Why VITAQ exists: turning everyday lifestyle signals into small actions urban professionals can keep." },
      { property: "og:title", content: "About VITAQ" },
      { property: "og:description", content: "Track less. Understand more. Act better." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <MarketingShell>
      <PageHeader eyebrow="About" title="Track less. Understand more. Act better." />
      <Prose>
        <p>
          VITAQ started from a simple observation: the people most at risk from modern work habits
          are the least likely to do anything about them. Not from apathy — from friction. Health
          apps ask for devices, discipline and time nobody has at 11pm on a Tuesday.
        </p>
        <h2>What we build</h2>
        <p>
          A wellness indicator you can understand in ten seconds, and a daily plan short enough to
          finish. Everything else is secondary.
        </p>
        <h2>What we don't build</h2>
        <p>
          <strong>Medical claims.</strong> VITAQ is a wellness product. It does not diagnose,
          treat or replace a healthcare professional, and it never will.
        </p>
      </Prose>
    </MarketingShell>
  );
}
