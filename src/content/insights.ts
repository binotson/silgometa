/**
 * Insights. The four topics come from the company profile; the full articles
 * were not supplied, so each entry is an editorial OUTLINE marked
 * `status: "outline"`. Replace `sections` with the approved article text and
 * set `status: "published"` with a real `publishedOn` date when ready.
 *
 * Do not add publication dates, authors, findings or citations that have
 * not been approved.
 */

export type InsightSection = { heading: string; points: string[] };

export type Insight = {
  slug: string;
  title: string;
  theme: string;
  serviceSlug: string;
  status: "outline" | "published";
  publishedOn?: string;
  author?: string;
  summary: string;
  sections: InsightSection[];
};

export const insights: Insight[] = [
  {
    slug: "short-term-working-capital-debt-markets-northern-nigeria",
    title: "Unlocking Short-Term Working Capital via Debt Markets in Northern Nigeria",
    theme: "Capital Markets",
    serviceSlug: "capital-markets",
    status: "outline",
    summary:
      "How Commercial Paper and related short-term debt instruments can complement bank funding for established businesses in Northern Nigeria.",
    sections: [
      {
        heading: "The working-capital question",
        points: [
          "Why short-term funding needs differ from long-term capital requirements.",
          "The role bank facilities currently play, and where they fall short.",
        ],
      },
      {
        heading: "Commercial Paper as an option",
        points: [
          "What a Commercial Paper programme is and how it is structured.",
          "The preparation an issuer needs: documentation, credit rating and regulatory coordination.",
        ],
      },
      {
        heading: "Readiness considerations for issuers",
        points: [
          "Governance, financial reporting and disclosure expectations.",
          "Questions management teams should ask before starting the process.",
        ],
      },
    ],
  },
  {
    slug: "public-policy-and-capital-mobilization",
    title: "The Intersection of Public Policy & Capital Mobilization",
    theme: "Strategy & Policy",
    serviceSlug: "strategic-marketing",
    status: "outline",
    summary:
      "Why aligning projects with the public policy environment matters when mobilizing private capital.",
    sections: [
      {
        heading: "Policy as context for investment",
        points: [
          "How policy direction shapes investor appetite and project design.",
          "The importance of understanding regulatory requirements early.",
        ],
      },
      {
        heading: "Aligning projects and policy",
        points: [
          "Engaging public stakeholders transparently.",
          "Designing projects that serve both commercial and public objectives.",
        ],
      },
    ],
  },
  {
    slug: "fintech-integration-enterprise-modernization",
    title: "Fintech Integration & Enterprise Modernization",
    theme: "Technology",
    serviceSlug: "infrastructure-technology",
    status: "outline",
    summary:
      "Practical considerations for institutions integrating digital financial systems and modernizing enterprise platforms.",
    sections: [
      {
        heading: "Starting from the operating model",
        points: [
          "Identifying the processes that most need modernization.",
          "Balancing new systems with existing infrastructure.",
        ],
      },
      {
        heading: "Integrating payments and financial systems",
        points: [
          "Security and reliability considerations for payment rails.",
          "Working with specialist technology partners.",
        ],
      },
      {
        heading: "Infrastructure foundations",
        points: [
          "Cloud, connectivity and data centre considerations.",
          "Planning for scale and continuity.",
        ],
      },
    ],
  },
  {
    slug: "industrial-specialization-real-estate-clusters",
    title: "Industrial Specialization & Real Estate Cluster Development",
    theme: "Real Estate & Industry",
    serviceSlug: "capital-markets",
    status: "outline",
    summary:
      "How land assets can be packaged and planned to support industrial parks, logistics hubs and commercial clusters.",
    sections: [
      {
        heading: "Why clusters matter",
        points: [
          "The link between industrial specialization and supporting real estate.",
          "Industrial parks, residential estates and logistics hubs as complementary uses.",
        ],
      },
      {
        heading: "From land to investable project",
        points: [
          "Land-asset packaging and commercial master-planning.",
          "Structuring investor participation and syndication.",
        ],
      },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
