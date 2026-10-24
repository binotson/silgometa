/**
 * Documented engagements from the company profile.
 *
 * CLIENT CONFIRMATION REQUIRED: before launch, confirm that each client name
 * and figure below is authorized for public use. Set `published: false` to
 * hide an entry from the site without deleting its content.
 *
 * Do not add testimonials, logos, photographs, dates or outcome statistics
 * that are not documented and approved.
 */

export type Project = {
  slug: string;
  published: boolean;
  client: string;
  title: string;
  practice: string;
  serviceSlug: string;
  locations?: string;
  summary: string;
  scope: string;
  impact: string;
  figure?: { label: string; value: string };
  scopeItems: string[];
  note?: string;
};

const allProjects: Project[] = [
  {
    slug: "asteks-commercial-paper",
    published: true,
    client: "Asteks Group Industries KFZE",
    title: "Commercial Paper programme structuring",
    practice: "Corporate Deal Structuring & Capital Markets",
    serviceSlug: "capital-markets",
    summary:
      "Financial and regulatory structuring for a ₦5 billion–₦20 billion Commercial Paper programme.",
    scope:
      "Financial and regulatory structuring for a ₦5 billion–₦20 billion Commercial Paper programme.",
    impact:
      "Positioning for short-term working-capital optimization, regulatory readiness and credit-rating alignment.",
    figure: { label: "Programme range", value: "₦5bn–₦20bn" },
    scopeItems: [
      "Commercial Paper programme structuring",
      "Regulatory structuring",
      "Credit-rating alignment",
    ],
    note: "The programme range describes the advisory scope of the mandate. It is not a statement of funds raised.",
  },
  {
    slug: "northern-commercial-real-estate",
    published: true,
    client: "Northern Commercial Real Estate Initiative",
    title: "Land-asset packaging and investor syndication",
    practice: "Corporate Deal Structuring & Capital Markets",
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
    practice: "Infrastructure & Technology Solutions",
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
    practice: "Strategic & Marketing Consultancy",
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
