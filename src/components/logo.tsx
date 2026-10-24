import Image from "next/image";
import { officialLogo } from "@/content/brand";
import { cn } from "@/components/ui";

/**
 * Renders the official logo when configured in src/content/brand.ts.
 * Otherwise renders a TEMPORARY placeholder wordmark — not the company's
 * official logo.
 */
export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  if (officialLogo) {
    const src = onDark && officialLogo.srcOnDark ? officialLogo.srcOnDark : officialLogo.src;
    return (
      <Image
        src={src}
        width={officialLogo.width}
        height={officialLogo.height}
        alt="SILGO META LIMITED"
        priority
        className={cn("h-10 w-auto sm:h-11", className)}
      />
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      data-placeholder-logo="true"
      aria-label="SILGO META LIMITED"
      role="img"
    >
      <svg aria-hidden viewBox="0 0 40 40" className="size-9 shrink-0 sm:size-10">
        <rect width="40" height="40" rx="3" className={onDark ? "fill-white/5" : "fill-navy-900"} />
        <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="2.5" fill="none" stroke="#B99A5B" strokeWidth="1.5" />
        <text
          x="20"
          y="26.5"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="17"
          fontWeight="700"
          fill="#B99A5B"
        >
          SM
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.35rem] font-bold tracking-[0.12em]",
            onDark ? "text-white" : "text-navy-900",
          )}
        >
          SILGO META
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-semibold tracking-[0.42em]",
            onDark ? "text-gold-400" : "text-gold-700",
          )}
        >
          LIMITED
        </span>
      </span>
    </span>
  );
}
