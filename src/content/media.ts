/**
 * Photography and video slots.
 *
 * Empty slots show the animated illustration for that practice area
 * (src/components/practice-visual.tsx). To fill a slot, place the file in
 * public/media/ and set `image` (and optionally `video`) below.
 *
 * Rules:
 * - Stock media is atmospheric only. Never present it as a Silgo Meta project,
 *   client, office or team member.
 * - Record where each stock file came from (see Sources below) and set
 *   `credit` if a licence requires visible attribution.
 * - Videos: muted MP4 (H.264), 720p–1080p, ideally under 10 MB, with an
 *   `image` poster. They play only on screens 768px and wider, for visitors
 *   who allow motion and have not enabled data saving.
 *
 * Sources (all free for commercial use, no attribution required):
 * - home-hero.mp4: "Movement in a city at night in an aerial shot", Mixkit
 *   Stock Video Free License, https://mixkit.co/free-stock-video/movement-in-a-city-at-night-in-an-aerial-shot-42343/
 * - capital-markets.jpg: Benjamin Child, Unsplash License,
 *   https://unsplash.com/photos/GWe0dlVD9e0
 * - strategic-marketing.jpg: Weichao Deng, Unsplash License,
 *   https://unsplash.com/photos/iDlVmSKg_Is
 * - infrastructure-technology.mp4: Dima Krivoy, Pexels License,
 *   https://www.pexels.com/video/blue-colored-cables-1085656/
 * - business-consulting.jpg: Vitaly Gariev, Unsplash License,
 *   https://unsplash.com/photos/eb5nX6G1sk0
 * Poster images are frames taken from the videos.
 */

export type MediaSlot = {
  image?: { src: string; width: number; height: number; alt: string };
  video?: { src: string };
  credit?: string;
};

/** Home page hero background. */
export const homeHeroMedia: MediaSlot | null = {
  image: { src: "/media/home-hero-poster.jpg", width: 1280, height: 720, alt: "" },
  video: { src: "/media/home-hero.mp4" },
};

/** One slot per practice area, keyed by service slug. */
export const practiceMedia: Record<string, MediaSlot | undefined> = {
  "capital-markets": {
    image: {
      src: "/media/capital-markets.jpg",
      width: 2000,
      height: 1333,
      alt: "Executive boardroom with a long conference table",
    },
  },
  "strategic-marketing": {
    image: {
      src: "/media/strategic-marketing.jpg",
      width: 2000,
      height: 1498,
      alt: "Aerial view of shipping containers at a port terminal",
    },
  },
  "infrastructure-technology": {
    image: {
      src: "/media/infrastructure-technology-poster.jpg",
      width: 1280,
      height: 720,
      alt: "Network cabling and status lights in a server room",
    },
    video: { src: "/media/infrastructure-technology.mp4" },
  },
  "business-consulting": {
    image: {
      src: "/media/business-consulting.jpg",
      width: 2000,
      height: 1125,
      alt: "Presenter walking colleagues through data on a large screen",
    },
  },
};
