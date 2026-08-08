import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function VitaqLogo({
  className,
  showWordmark = true,
  to = "/",
}: {
  className?: string;
  showWordmark?: boolean;
  to?: string;
}) {
  return (
    <Link to={to} className={cn("group flex items-center gap-2.5", className)} aria-label="VITAQ home">
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl surface-accent shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M3 13.5h4l2-5 3 9 2.5-6.5 1.6 2.5H21"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          />
        </svg>
      </span>
      {showWordmark ? (
        <span className="font-display text-lg font-extrabold tracking-tight">VITAQ</span>
      ) : null}
    </Link>
  );
}
