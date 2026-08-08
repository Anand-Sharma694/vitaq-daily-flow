import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHeader, Prose } from "@/components/vitaq/MarketingShell";
import { DISCLAIMER } from "@/lib/vitaq";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — VITAQ" },
      { name: "description", content: "The terms that govern your use of VITAQ's wellness tracking and coaching features." },
      { property: "og:title", content: "VITAQ Terms of Use" },
      { property: "og:description", content: "Terms governing use of the VITAQ wellness platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <MarketingShell>
      <PageHeader eyebrow="Terms" title="Terms of Use" />
      <Prose>
        <h2>Wellness, not medical care</h2>
        <p>{DISCLAIMER}</p>
        <h2>Your account</h2>
        <p>You are responsible for the accuracy of the information you enter and for keeping your account credentials secure.</p>
        <h2>Acceptable use</h2>
        <p>Do not use VITAQ to provide medical advice to others or to misrepresent its outputs as clinical results.</p>
        <h2>Changes</h2>
        <p>Features and these terms may change as the product evolves. Continued use means acceptance of the current terms.</p>
      </Prose>
    </MarketingShell>
  );
}
