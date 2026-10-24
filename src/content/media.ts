/**
 * Photography and video slots.
 *
 * Each slot is empty until licensed or genuine company media is supplied;
 * empty slots show the animated illustration for that practice area
 * (src/components/practice-visual.tsx). To fill a slot, place the file in
 * public/media/ and set `image` (and optionally `video`) below.
 *
 * Rules:
 * - Stock media is atmospheric only. Never present it as a Silgo Meta project,
 *   client, office or team member.
 * - Record where each stock file came from in `credit` (shown when a licence
 *   requires attribution) and keep the licence link in the project records.
 * - Videos: muted MP4 (H.264), 1080p or smaller, ideally under 8 MB, with an
 *   `image` poster. They autoplay only for visitors who allow motion.
 */

export type MediaSlot = {
  image?: { src: string; width: number; height: number; alt: string };
  video?: { src: string };
  credit?: string;
};

/** Home page hero background (recommended: a calm 15–30 second loop). */
export const homeHeroMedia: MediaSlot | null = null;

/** One slot per practice area, keyed by service slug. */
export const practiceMedia: Record<string, MediaSlot | undefined> = {
  "capital-markets": undefined,
  "strategic-marketing": undefined,
  "infrastructure-technology": undefined,
  "business-consulting": undefined,
};
