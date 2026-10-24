/**
 * Official logo configuration.
 *
 * The official SILGO META LIMITED logo has not yet been added to the project,
 * so the site renders a TEMPORARY typographic wordmark (see
 * src/components/logo.tsx). To use the official logo:
 *
 *   1. Save the original file as public/images/silgo-meta-logo.jpg
 *      (PNG or SVG with a transparent background is preferable if available).
 *   2. Set `src`, and the file's real pixel `width` and `height` below so the
 *      proportions are preserved.
 *   3. If a light (reversed) version exists for dark backgrounds, set `srcOnDark`.
 *
 * Do not recolour, redraw or crop the official logo without authorization.
 */
export type BrandLogo = {
  src: string;
  srcOnDark?: string;
  width: number;
  height: number;
};

export const officialLogo: BrandLogo | null = null;

// Example once the file is in place:
// export const officialLogo: BrandLogo | null = {
//   src: "/images/silgo-meta-logo.jpg",
//   width: 1200,
//   height: 400,
// };
