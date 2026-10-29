/**
 * Central company facts for SILGO META LIMITED.
 *
 * Source of truth: the company profile supplied by the client. Do not add
 * facts here (dates, licences, statistics, people) that are not documented
 * in approved source material.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.silgometa.com.ng"
).replace(/\/$/, "");

/**
 * Indexing is only allowed on the production deployment, so localhost and
 * preview URLs are never indexed. Set ALLOW_INDEXING=true on the production
 * host (Vercel production deployments are detected automatically).
 */
export const allowIndexing =
  process.env.ALLOW_INDEXING === "true" ||
  process.env.VERCEL_ENV === "production";

export const company = {
  legalName: "SILGO META LIMITED",
  name: "Silgo Meta Limited",
  shortName: "Silgo Meta",
  tagline: "Structuring Capital. Advancing Enterprise.",
  description:
    "Silgo Meta Limited helps businesses, institutions, and investors prepare for funding, structure transactions, and translate growth strategies into practical execution.",
  established: "2023-02-17",
  establishedLabel: "17 February 2023",
  incorporation:
    "Incorporated as a private company limited by shares under the Companies and Allied Matters Act (CAMA) 2020.",
  website: "https://www.silgometa.com.ng",
} as const;

export const contact = {
  phone: "+234-906-8888-488",
  phoneHref: "tel:+2349068888488",
  email: "infor@silgometa.com.ng",
  directory: [
    { label: "General enquiries", email: "infor@silgometa.com.ng" },
    { label: "Secretariat", email: "secretariat@silgometa.com.ng" },
    { label: "Sales", email: "sales@silgometa.com.ng" },
    { label: "Support", email: "support@silgometa.com.ng" },
    { label: "Direct", email: "muhammad@silgometa.com.ng" },
    { label: "Direct", email: "fadil@silgometa.com.ng" },
  ],
} as const;

export type Office = {
  id: string;
  name: string;
  role: string;
  lines: string[];
  region: string;
  /** Text-search link only; no coordinates are assumed. */
  mapQuery: string;
};

export const offices: Office[] = [
  {
    id: "abuja",
    name: "Abuja",
    role: "Executive Office",
    lines: ["Katsina House", "Central Business District", "Federal Capital Territory, Abuja"],
    region: "Nigeria",
    mapQuery: "Katsina House, Central Business District, Abuja, Nigeria",
  },
  {
    id: "kano",
    name: "Kano",
    role: "Operations Hub",
    lines: ["Plot 508, opposite BUK Old Campus Main Gate", "BUK Road", "Kano State"],
    region: "Nigeria",
    mapQuery: "Plot 508, BUK Road, opposite BUK Old Campus Main Gate, Kano, Nigeria",
  },
];

export const mapSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const mainNav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/leadership", label: "Leadership" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
] as const;

export const values = [
  {
    letter: "S",
    name: "Strategy",
    text: "Data-driven, precise, and executed with institutional clarity.",
  },
  {
    letter: "I",
    name: "Integrity",
    text: "Adherence to regulatory compliance, governance, and transparent deal structuring.",
  },
  {
    letter: "L",
    name: "Leadership",
    text: "Setting regional and international benchmarks in capital raising and technology integration.",
  },
  {
    letter: "G",
    name: "Growth",
    text: "Unlocking sustainable revenue models and expanding market capitalization.",
  },
  {
    letter: "O",
    name: "Optimization",
    text: "Driving institutional efficiency through technology and human capital development.",
  },
] as const;

export type Leader = {
  name: string;
  initials: string;
  title: string;
  /**
   * Summary of the role. Replace with the approved biography from the
   * company profile; do not add qualifications that are not documented.
   */
  summary: string;
  focus: string[];
};

export const leaders: Leader[] = [
  {
    name: "M. D. Ahmad",
    initials: "MDA",
    title: "Chief Executive Officer (CEO) & Strategic Partner",
    summary:
      "As Chief Executive Officer and Strategic Partner, leads Silgo Meta's overall direction and its strategic partnerships across the firm's practice areas.",
    focus: ["Executive leadership", "Strategic partnerships"],
  },
  {
    name: "Fadil Murtala Usman",
    initials: "FMU",
    title: "Chief Operating Officer (COO) & Strategic Advisory Lead",
    summary:
      "As Chief Operating Officer and Strategic Advisory Lead, oversees the firm's operations and leads its strategic advisory work.",
    focus: ["Operations", "Strategic advisory"],
  },
];

/** Engagement process shown on service pages. Client to review wording. */
export const engagementSteps = [
  {
    title: "Initial consultation",
    text: "A confidential discussion to understand your objectives, constraints and timelines.",
  },
  {
    title: "Scoping & diagnostics",
    text: "We define the advisory scope, review relevant documents and agree deliverables.",
  },
  {
    title: "Structuring & advisory",
    text: "We develop the recommended structure, strategy or solution and coordinate the relevant stakeholders.",
  },
  {
    title: "Execution support",
    text: "We support implementation alongside your team, advisers and counterparties.",
  },
] as const;
