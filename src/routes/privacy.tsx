import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHeader, Prose } from "@/components/vitaq/MarketingShell";
import { DISCLAIMER } from "@/lib/vitaq";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — VITAQ" },
      { name: "description", content: "How VITAQ collects, stores and protects your self-reported wellness data." },
      { property: "og:title", content: "VITAQ Privacy" },
      { property: "og:description", content: "Your wellness data belongs to you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <MarketingShell>
      <PageHeader eyebrow="Privacy" title="Your wellness data belongs to you" />
      <Prose>
        <h2>What we collect</h2>
        <p>Self-reported assessment answers, habit logs and coach conversations tied to your account.</p>
        <h2>How it is used</h2>
        <p>Only to produce your score, recommendations and progress views. We do not sell personal data.</p>
        <h2>Organisation reporting</h2>
        <p>Business dashboards display aggregated, anonymised trends only — never individual answers or scores.</p>
        <h2>Disclaimer</h2>
        <p>{DISCLAIMER}</p>
      </Prose>
    </MarketingShell>
  );
}
