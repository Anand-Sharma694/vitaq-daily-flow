import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MarketingShell, PageHeader } from "@/components/vitaq/MarketingShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in to VITAQ" },
      { name: "description", content: "Log in or create your VITAQ account to save your wellness score, habits and progress." }
      { property: "og:title", content: "Sign in to VITAQ" },
      { property: "og:description", content: "Save your wellness score, habits and progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setBusy(false);
      setMessage(error ? error.message : "Check your email to confirm your account.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setMessage(error.message);
    else navigate({ to: "/dashboard" });
  }

  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Account"
        title={mode === "login" ? "Welcome back" : "Create your VITAQ account"}
        subtitle="Your score, habits and coach conversations stay with your account."
      />
      <section className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-border bg-card p-7 shadow-soft"
        >
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </Button>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="w-full text-sm text-muted-foreground hover:text-foreground"
          >
            {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Prefer to look around first?{" "}
          <Link to="/assessment" className="text-primary hover:underline">
            Take the assessment
          </Link>
        </p>
      </section>
    </MarketingShell>
  );
}
