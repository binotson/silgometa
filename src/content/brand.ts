/**
 * Official logo configuration.
 *
 * The official SILGO META LIMITED logo is an "SM" emblem (no company name in
 * the artwork). The original file is kept unaltered at
 * public/images/silgo-meta-logo.jpg. For display at small sizes the site uses
 * public/images/silgo-meta-emblem.png, the same artwork with the surrounding
 * white margin and a faint export line at the edges trimmed (no recolouring
 * or redrawing). It sits on a white tile, matching its own background, next to
 * the company name set in type (src/components/logo.tsx).
 *
 * If a transparent PNG/SVG or a reversed version for dark backgrounds is
 * supplied later, update `src` (and add `srcOnDark`) with the real pixel size.
 *
 * Do not recolour, redraw or crop the official logo without authorization.
 * The favicon files in src/app (icon.png, apple-icon.png) are derived the
 * same way.
 */
export type BrandLogo = {
  src: string;
  srcOnDark?: string;
  width: number;
  height: number;
};

export const officialLogo: BrandLogo | null = {
  src: "/images/silgo-meta-emblem.png",
  width: 640,
  height: 640,
};
