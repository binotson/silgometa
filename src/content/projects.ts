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
  impactLabel?: "Results" | "Intended outcome";
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
    sector: "Industrial & Manufacturing",
    title: "Commercial Paper Readiness & Capital Market Advisory",
    practice: "Capital Markets & Deal Structuring",
    serviceSlug: "capital-markets",
    summary:
      "Commercial Paper eligibility assessment and readiness preparation for a multi-billion naira capital market transaction.",
    objective:
      "Evaluate institutional readiness for a multi-billion naira capital market transaction to support operational expansion and working capital needs.",
    scope:
      "Conducted comprehensive Commercial Paper (CP) eligibility assessments, mapped corporate governance and financial documentation requirements, and identified key operational readiness prerequisites prior to market entry.",
    status: "Diagnostic Assessment & Preparation Phase",
    impact:
      "Provide actionable clarity on transaction viability and prepare the enterprise for seamless engagement with issuing houses and financial arrangers.",
    impactLabel: "Intended outcome",
    figure: { label: "Target transaction size", value: "₦3bn–₦5bn" },
    financialContext:
      "₦3 billion – ₦5 billion target transaction size (indicative funding objective; does not represent an approved facility or funds raised).",
    scopeItems: [
      "Commercial Paper eligibility assessment",
      "Governance and financial documentation mapping",
      "Operational readiness prerequisites",
    ],
  },
  {
    slug: "northern-commercial-real-estate",
    published: true,
    client: "Northern Commercial Real Estate Initiative",
    title: "Land-asset packaging and investor syndication",
    practice: "Capital Markets & Deal Structuring",
    serviceSlug: "capital-markets",
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
    practice: "Technology & Infrastructure",
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
