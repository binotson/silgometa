/**
 * Central company facts for SILGO META LIMITED.
 *
 * Source of truth: the company profile supplied by the client. Do not add
 * facts here (dates, licences, statistics, people) that are not documented
 * in approved source material.
 */

import { engagementProcess } from "./corporate";
import { services } from "./services";

/** Canonical origin. The live site is served at the bare domain (no www). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://silgometa.com.ng"
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
  tagline: "Connecting Enterprise to Capital. Structuring Opportunities. Advancing Growth.",
  /** Hero-sized form of the tagline, split for display. */
  taglineLines: ["Connecting Enterprise to Capital.", "Structuring Opportunities.", "Advancing Growth."],
  positioning: [
    "Strategic Capital Access",
    "Corporate Financial Advisory",
    "Capital Markets Facilitation",
    "Technology & Infrastructure",
  ],
  description:
    "Silgo Meta Limited is an independent corporate advisory and strategic financial facilitation company connecting businesses across Nigeria with suitable funding opportunities.",
  /** Corporate Affairs Commission (CAC) registration number. */
  rcNumber: "679305",
  rcLabel: "RC No. 679305",
  registration:
    "Registered in Nigeria with the Corporate Affairs Commission (CAC) under RC No. 679305.",
  /**
   * CAC registration is a company registration only. It is not an SEC, CBN or
   * other financial-services licence or authorization.
   */
  registrationDistinction:
    "CAC company registration is not a licence or authorization from the Securities and Exchange Commission (SEC), the Central Bank of Nigeria (CBN) or any other financial-services regulator.",
  locations: "Abuja | Kano | Nigeria",
  website: siteUrl,
  // PENDING VERIFICATION (Phase 1 audit, V1): the previously published
  // establishment date (17 February 2023) and "incorporated under CAMA 2020"
  // statement appear inconsistent with RC No. 679305. They are not displayed
  // until confirmed against the CAC Certificate of Incorporation.
} as const;

export const contact = {
  phone: "+234-906-8888-488",
  phoneHref: "tel:+2349068888488",
  email: "infor@silgometa.com.ng",
  careersEmail: "secretariat@silgometa.com.ng",
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

export type NavLink = { href: string; label: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const aboutNav: NavLink[] = [
  { href: "/about", label: "About Us", description: "Our name, philosophy and mandate" },
  { href: "/corporate-overview", label: "Corporate Overview", description: "What we do and how we create value" },
  { href: "/leadership", label: "Leadership", description: "The team directing our mandates" },
  { href: "/governance", label: "Governance & Compliance", description: "Engagement standards and regulatory position" },
];

export const servicesNav: NavLink[] = [
  ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.title })),
  { href: "/services/commercial-paper-advisory", label: "Commercial Paper Advisory" },
];

export const mainNav: NavItem[] = [
  { href: "/about", label: "About", children: aboutNav },
  { href: "/services", label: "Services", children: [{ href: "/services", label: "All services" }, ...servicesNav] },
  { href: "/sectors", label: "Sectors" },
  { href: "/process", label: "Our Process" },
  { href: "/projects", label: "Projects" },
  { href: "/insights", label: "Insights" },
];

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
    text: "Pursuing high professional standards in capital access, advisory and technology integration.",
  },
  {
    letter: "G",
    name: "Growth",
    text: "Supporting sustainable revenue models and long-term enterprise value.",
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

/** The six-phase client engagement process (see src/content/corporate.ts). */
export const engagementSteps = engagementProcess.phases.map((p) => ({ title: p.title, short: p.short, text: p.text }));
