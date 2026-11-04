/**
 * Service pillars, drawn from the approved corporate profile (pillars A–E),
 * plus the complementary Strategy & Market Development practice.
 *
 * Descriptions explain the advisory scope only; they must not be read as
 * guarantees of financing, approvals or outcomes. Where the approved profile
 * lists a service without a description, `description` is left unset rather
 * than invented.
 */

export type Offering = { name: string; description?: string };

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  /** Short line shown with the title, e.g. "Our primary business activity". */
  kicker?: string;
  summary: string;
  /** Link label used on the home page service cards. */
  cta: string;
  intro: string;
  challenges?: string[];
  offerings: Offering[];
  clients: string[];
  relatedProjects: string[];
  /** Complementary practice, listed after the five core pillars. */
  complementary?: boolean;
  /** Contact-form category pre-selected by this service's call to action. */
  enquiry: "capital-markets" | "strategy-marketing" | "infrastructure-technology" | "business-consulting";
  note?: string;
};

const advisoryNote =
  "Silgo Meta provides advisory, facilitation and coordination services. Nothing on this page is an offer of securities or a guarantee that financing will be obtained. Financing decisions, regulatory filings and approvals remain the responsibility of the relevant licensed institutions and authorities.";

export const services: Service[] = [
  {
    slug: "capital-access",
    enquiry: "capital-markets",
    number: "01",
    title: "Strategic Capital Access & Funding Facilitation",
    shortTitle: "Capital Access",
    kicker: "Our primary business activity",
    summary:
      "We connect businesses seeking financing with suitable capital providers and facilitate their engagement with relevant financial institutions.",
    cta: "Explore Capital Access",
    intro:
      "Our primary business activity. We connect businesses seeking financing with suitable capital providers and facilitate their engagement with relevant financial institutions.",
    challenges: [
      "Limited access to appropriate financial institutions and capital providers.",
      "Inadequate transaction preparation before approaching funders.",
      "Weak financial documentation that undermines a credible funding proposition.",
      "Unfamiliarity with capital market and institutional financing requirements.",
    ],
    offerings: [
      { name: "Funding source identification and strategic matchmaking" },
      { name: "Introductions to licensed fund arrangers, issuing houses, investment banks, and institutional investors" },
      { name: "Corporate debt and equity financing facilitation" },
      { name: "Commercial Paper and corporate bond market access preparation" },
      { name: "Project finance and infrastructure funding linkages" },
      { name: "Debt restructuring and refinancing facilitation" },
      { name: "Private placement and strategic investment introductions" },
      { name: "Joint venture and financial partnership facilitation" },
    ],
    clients: [
      "Businesses seeking working capital",
      "Enterprises pursuing expansion or asset acquisition",
      "Companies refinancing or restructuring debt",
      "Project sponsors seeking project financing",
      "Enterprises seeking long-term investment capital",
    ],
    relatedProjects: ["commercial-paper-readiness"],
    note: advisoryNote,
  },
  {
    slug: "capital-markets",
    enquiry: "capital-markets",
    number: "02",
    title: "Capital Markets Readiness & Transaction Advisory",
    shortTitle: "Capital Markets Readiness",
    summary:
      "We prepare eligible corporate enterprises to engage licensed capital market operators and financing institutions.",
    cta: "Explore Capital Markets Readiness",
    intro:
      "We prepare eligible corporate enterprises to engage licensed capital market operators and financing institutions, from preliminary Commercial Paper readiness assessments to coordinating documentation and due diligence.",
    challenges: [
      "Short-term working-capital needs that bank facilities alone do not meet efficiently.",
      "Preparing a business to meet the documentation and disclosure expectations of capital-market investors.",
      "Understanding whether, and when, an enterprise is ready to engage licensed transaction parties.",
      "Gaps in audited accounts, governance documentation or credit-rating readiness.",
    ],
    offerings: [
      { name: "Preliminary Commercial Paper eligibility and readiness assessments" },
      { name: "Financial statement and cash-flow analysis" },
      { name: "Corporate governance and documentation reviews" },
      { name: "Credit-rating readiness support and coordination with authorized rating agencies" },
      { name: "Business plan, financial model, and investor presentation preparation" },
      { name: "Preliminary transaction structuring and financing strategy" },
      { name: "Information Memorandum preparation support" },
      { name: "Coordination of transaction documentation and due diligence" },
    ],
    clients: [
      "Industrial and manufacturing companies",
      "Corporates seeking short-term funding",
      "Established enterprises preparing for institutional debt financing",
      "Businesses evaluating capital market instruments",
    ],
    relatedProjects: ["commercial-paper-readiness", "northern-commercial-real-estate"],
    note: "The formal issuance, arrangement, distribution, and other regulated activities associated with capital market securities are undertaken by appropriately licensed institutions. Silgo Meta provides readiness, advisory and coordination support only; nothing on this page is an offer of securities or a guarantee that financing will be obtained.",
  },
  {
    slug: "corporate-finance",
    enquiry: "capital-markets",
    number: "03",
    title: "Corporate Finance & Strategic Advisory",
    shortTitle: "Corporate Finance",
    summary:
      "We support businesses in aligning their financing requirements with sustainable commercial objectives.",
    cta: "Explore Corporate Finance",
    intro: "We support businesses in aligning their financing requirements with sustainable commercial objectives.",
    offerings: [
      { name: "Corporate financing strategy" },
      { name: "Business expansion and investment planning" },
      { name: "Debt optimization and refinancing advisory" },
      { name: "Corporate restructuring and investor-entry preparation" },
      { name: "Financial feasibility studies" },
      { name: "Capital expenditure and project financing assessments" },
      { name: "Strategic partnerships and joint venture advisory" },
      { name: "Business valuation coordination and investment-readiness support" },
    ],
    clients: [
      "Businesses planning expansion or new investment",
      "Companies optimizing or refinancing existing debt",
      "Enterprises preparing for restructuring or investor entry",
      "Project sponsors assessing feasibility and capital expenditure",
    ],
    relatedProjects: ["northern-commercial-real-estate"],
    note: advisoryNote,
  },
  {
    slug: "infrastructure-technology",
    enquiry: "infrastructure-technology",
    number: "04",
    title: "Technology & Infrastructure Advisory",
    shortTitle: "Technology & Infrastructure",
    summary:
      "Complementary advisory services for enterprises seeking operational modernization and technology-driven expansion.",
    cta: "Explore Technology Advisory",
    intro:
      "We provide complementary advisory services to enterprises seeking operational modernization and technology-driven expansion.",
    challenges: [
      "Legacy systems that limit efficiency, reporting and the ability to offer digital services.",
      "Technology investments that need a clear feasibility and business case.",
      "Integrating financial technology and digital systems securely.",
      "Planning digital infrastructure that can scale with the business.",
    ],
    offerings: [
      { name: "Enterprise technology infrastructure advisory" },
      { name: "Digital transformation and systems optimization" },
      { name: "Financial technology integration advisory" },
      { name: "Business process automation" },
      { name: "Technology investment feasibility assessment" },
      { name: "Digital infrastructure project development support" },
    ],
    clients: [
      "Financial institutions and fintechs",
      "Public-sector platforms",
      "Private enterprises modernizing operations",
      "Transport and logistics operators",
    ],
    relatedProjects: ["fintech-enterprise-architecture"],
    note: "Specialist implementation and regulated technology services are undertaken through appropriately qualified providers where required.",
  },
  {
    slug: "business-consulting",
    enquiry: "business-consulting",
    number: "05",
    title: "Business Development & Institutional Capacity Building",
    shortTitle: "Business Development",
    summary:
      "We help enterprises strengthen the organizational foundations required for sustainable growth and institutional financing.",
    cta: "Explore Business Development",
    intro:
      "We help enterprises strengthen the organizational foundations required for sustainable growth and institutional financing.",
    challenges: [
      "Organizational structures that no longer fit the institution's strategy or scale.",
      "Governance and compliance frameworks that need to be formalized before engaging funders.",
      "Financial documentation that does not yet meet institutional expectations.",
      "Leadership teams that need new capabilities to deliver a growth agenda.",
    ],
    offerings: [
      { name: "Corporate governance development" },
      { name: "Operational diagnostics" },
      { name: "Market-entry strategy" },
      { name: "Commercial partnership development" },
      { name: "Financial documentation improvement" },
      { name: "Executive advisory support" },
    ],
    clients: [
      "Family-owned and growing businesses",
      "Enterprises preparing for institutional financing",
      "Public institutions and agencies",
      "Boards and executive teams",
    ],
    relatedProjects: [],
  },
  {
    slug: "strategic-marketing",
    enquiry: "strategy-marketing",
    number: "06",
    title: "Strategy & Market Development",
    shortTitle: "Strategy & Markets",
    kicker: "Complementary practice",
    complementary: true,
    summary:
      "Strategic direction, market-entry frameworks, commercial partnership structuring, and stakeholder engagement to help organizations evaluate market opportunities.",
    cta: "Explore Strategy Services",
    intro:
      "We help organizations position themselves in new and existing markets, align their plans with the policy environment and communicate clearly with the stakeholders who matter to their success.",
    challenges: [
      "Entering a new market or region without a clear view of competitors, regulation or partners.",
      "Aligning commercial plans with public policy and the expectations of government stakeholders.",
      "Brands and messages that have grown inconsistently across businesses and audiences.",
      "Managing relationships with communities, regulators, investors and partners during change.",
    ],
    offerings: [
      {
        name: "Market entry and positioning",
        description: "Assessing markets, defining the entry approach and positioning the business against its competitors.",
      },
      {
        name: "Industrial and commercial enterprise strategy",
        description: "Developing growth and operating strategies for industrial and commercial businesses.",
      },
      {
        name: "Public policy alignment",
        description: "Mapping relevant policy and regulation and aligning business plans with it.",
      },
      {
        name: "Government relations",
        description: "Advising on constructive, transparent engagement with government institutions.",
      },
      {
        name: "Brand architecture",
        description: "Organizing brands, sub-brands and offerings into a coherent structure.",
      },
      {
        name: "Stakeholder engagement",
        description: "Identifying stakeholders and planning how and when to engage them.",
      },
      {
        name: "Corporate communications",
        description: "Developing corporate narratives, messaging and communication plans.",
      },
    ],
    clients: [
      "Multinational companies entering Nigeria",
      "Industrial and commercial enterprises",
      "Public institutions and agencies",
      "Organizations undergoing change",
    ],
    relatedProjects: ["cfao-kano-office"],
  },
];

export const corePillars = services.filter((s) => !s.complementary);

export const getService = (slug: string) => services.find((s) => s.slug === slug);
