import Image from "next/image";
import { officialLogo } from "@/content/brand";
import { cn } from "@/components/ui";

/**
 * The official "SM" emblem (src/content/brand.ts) beside the company name.
 * The emblem keeps its original artwork and white background on a white tile,
 * so it reads the same on the light header and the dark footer.
 */
export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {officialLogo ? (
        <span
          className={cn(
            "flex size-11 shrink-0 overflow-hidden rounded-sm bg-white sm:size-12",
            onDark ? "ring-1 ring-white/10" : "ring-1 ring-line",
          )}
        >
          <Image
            src={onDark && officialLogo.srcOnDark ? officialLogo.srcOnDark : officialLogo.src}
            width={officialLogo.width}
            height={officialLogo.height}
            alt=""
            priority
            sizes="48px"
            className="size-full object-contain"
          />
        </span>
      ) : (
        <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-inverse font-serif font-bold text-gold-400 sm:size-12">
          SM
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.3rem] font-bold tracking-[0.12em] sm:text-[1.35rem]",
            onDark ? "text-white" : "text-navy-900",
          )}
        >
          SILGO META
        </span>
        <span
          className={cn(
            "mt-1 text-[0.7rem] font-semibold tracking-[0.4em]",
            onDark ? "text-silver-400" : "text-gold-700",
          )}
        >
          LIMITED
        </span>
      </span>
    </span>
  );
}
