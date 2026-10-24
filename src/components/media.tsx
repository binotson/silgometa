import Image from "next/image";
import { PracticeVisual } from "@/components/practice-visual";
import { BackgroundVideo } from "@/components/background-video";
import { cn } from "@/components/ui";
import { practiceMedia, type MediaSlot } from "@/content/media";

/** Photo or video for a slot, layered under a navy tint so it stays on-brand. */
function SlotMedia({ slot, sizes, preload }: { slot: MediaSlot; sizes: string; preload?: boolean }) {
  return (
    <>
      {slot.image && (
        <Image
          src={slot.image.src}
          alt={slot.video ? "" : slot.image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      )}
      {slot.video && <BackgroundVideo src={slot.video.src} />}
      <div aria-hidden className="absolute inset-0 bg-navy-900/15" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-950/55 via-navy-950/10 to-transparent" />
      {slot.credit && (
        <p className="absolute right-2 bottom-1.5 text-xs text-white/70">{slot.credit}</p>
      )}
    </>
  );
}

/**
 * Visual panel for a practice area: supplied photography/video when a slot is
 * filled, otherwise the practice area's animated illustration.
 */
export function PracticeMedia({
  slug,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload,
  onDark = false,
  bare = false,
}: {
  slug: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
  onDark?: boolean;
  /** Drop the rounded frame, e.g. when the panel sits flush inside a card. */
  bare?: boolean;
}) {
  const slot = practiceMedia[slug];
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-navy-950",
        !bare && "rounded-sm ring-1",
        !bare && (onDark ? "ring-white/10" : "ring-navy-900/10"),
        className,
      )}
    >
      {slot && (slot.image || slot.video) ? (
        <SlotMedia slot={slot} sizes={sizes} preload={preload} />
      ) : (
        <PracticeVisual slug={slug} className="absolute inset-0" />
      )}
    </div>
  );
}

export { SlotMedia };
