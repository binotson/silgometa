/**
 * Documented engagements from the company profile.
 *
 * CLIENT CONFIRMATION REQUIRED: before launch, confirm that each client name
 * and figure below is authorized for public use. Set `published: false` to
 * hide an entry from the site without deleting its content.
 *
 * Do not add testimonials, logos, photographs, dates or outcome statistics
 * that are not documented and approved.
 *
 * Engagements follow a structured presentation:
 *   - Engagement title: the sector and core advisory scope (`title`).
 *   - Client objective: the capital requirement or strategic goal (`objective`).
 *   - Our role: the advisory, technical or structuring support provided (`scope`).
 *   - Engagement status: a verified stage such as Assessment, Preparation,
 *     Ongoing or Completed (`status`).
 *   - Results or intended outcomes: verified achievements, or clearly defined
 *     targets for ongoing mandates (`impact`, labelled by `impactLabel`).
 *   - Financial context: whether an amount is proposed funding, programme size,
 *     an approved facility or disbursed funds (`financialContext`).
 * Leave a field unset rather than guess; it is then omitted from the page.
 */

export type Project = {
  slug: string;
  published: boolean;
  /** Shown on the home page as the featured engagement profile. */
  featured?: boolean;
  /** Omit to present the engagement by sector without naming the client. */
  client?: string;
  sector?: string;
  title: string;
  practice: string;
  serviceSlug: string;
  locations?: string;
  summary: string;
  objective?: string;
  scope: string;
  status?: string;
  impact: string;
  impactLabel?: "Results" | "Intended outcome" | "Target outcome";
  /** Overrides the "Case study" label, e.g. "Representative engagement profile". */
  profileLabel?: string;
  figure?: { label: string; value: string };
  financialContext?: string;
  scopeItems: string[];
  note?: string;
};

const allProjects: Project[] = [
  {
    slug: "commercial-paper-readiness",
    published: true,
    featured: true,
    // Representative engagement profile (approved corporate profile, section 9).
    // The client is not named. Present only as an ongoing engagement while
    // the mandate, activities and status can be substantiated.
    profileLabel: "Representative engagement profile",
    sector: "Industrial & Manufacturing",
    title: "Industrial Manufacturing — Commercial Paper Readiness and Capital Access Facilitation",
    practice: "Capital Markets Readiness & Transaction Advisory",
    serviceSlug: "capital-markets",
    summary:
      "Preliminary Commercial Paper eligibility and readiness assessment, and capital access facilitation, for a corporate enterprise seeking multi-billion-naira financing.",
    objective:
      "Support a corporate enterprise seeking access to multi-billion-naira financing for working capital, operational expansion, and broader financial restructuring.",
    scope:
      "Conduct preliminary Commercial Paper eligibility and readiness assessments, review corporate and financial documentation requirements, identify transaction preparation gaps, and facilitate engagement with prospective licensed fund arrangers.",
    status: "Diagnostic assessment and transaction preparation",
    impact:
      "Prepare the enterprise for evaluation by suitable institutional funding partners and support the progression of its proposed financing transaction.",
    impactLabel: "Target outcome",
    financialContext:
      "Proposed Commercial Paper financing programme, subject to final programme sizing, transaction due diligence, regulatory requirements, investor demand, and approval by relevant institutions.",
    scopeItems: [
      "Preliminary Commercial Paper eligibility and readiness assessment",
      "Corporate and financial documentation review",
      "Transaction preparation gap analysis",
      "Facilitation of engagement with prospective licensed fund arrangers",
    ],
    note: "This profile describes an engagement at the diagnostic and preparation stage. It does not represent an approved, committed or disbursed facility. Any financing remains subject to due diligence, regulatory requirements and approval by the relevant licensed institutions.",
  },
  {
    slug: "northern-commercial-real-estate",
    published: true,
    client: "Northern Commercial Real Estate Initiative",
    title: "Land-asset packaging and investor syndication",
    practice: "Corporate Finance & Strategic Advisory",
    serviceSlug: "corporate-finance",
    locations: "Kano and Abuja",
    summary:
      "Land-asset packaging, commercial master-planning and investor syndication in Kano and Abuja.",
    scope:
      "Land-asset packaging, commercial master-planning and investor syndication in Kano and Abuja.",
    impact:
      "Unlocking land-asset value for industrial parks, residential estates and commercial logistics hubs.",
    scopeItems: [
      "Land-asset packaging",
      "Commercial master-planning",
      "Investor syndication",
    ],
  },
  {
    slug: "fintech-enterprise-architecture",
    published: true,
    client: "Fintech & Enterprise Digital Architecture",
    title: "Digital financial systems with Brilliant eSystems",
    practice: "Technology & Infrastructure Advisory",
    serviceSlug: "infrastructure-technology",
    summary:
      "Co-development of digital financial systems, secure payment rails and enterprise software with Brilliant eSystems.",
    scope:
      "Co-development of digital financial systems, secure payment rails and enterprise software with Brilliant eSystems.",
    impact:
      "Accelerated digital infrastructure delivery across private- and public-sector client platforms.",
    scopeItems: [
      "Digital financial systems",
      "Secure payment rails",
      "Enterprise software",
    ],
  },
  {
    slug: "cfao-kano-office",
    published: true,
    client: "CFAO International, Kano State Office",
    title: "Valuation, structuring and divestment of office premises",
    practice: "Strategy & Market Development",
    serviceSlug: "strategic-marketing",
    locations: "Kano",
    summary:
      "Lead marketing and sales consultant for the valuation, structuring and divestment of headquarters office premises and structures in Kano.",
    scope:
      "Silgo Meta served as lead marketing and sales consultant for the valuation, structuring and divestment/disbursement of the client's headquarters office premises and structures in Kano.",
    impact: "A reported transaction disbursement valued at ₦1,350,000,000.",
    figure: { label: "Reported transaction value", value: "₦1.35bn" },
    scopeItems: ["Valuation", "Transaction structuring", "Marketing and sales"],
    note: "Silgo Meta acted as consultant on the transaction. The premises were the client's assets; Silgo Meta was neither the owner nor the purchaser.",
  },
];

export const projects = allProjects.filter((p) => p.published);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** The client name where approved for publication, otherwise the engagement title. */
export const projectName = (p: Project) => p.client ?? p.title;
