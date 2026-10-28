/**
 * Practice areas and services, drawn from the company profile.
 * Descriptions explain the advisory scope only; they must not be read as
 * guarantees of financing, approvals or outcomes.
 */

export type Offering = { name: string; description: string };

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  /** Link label used on the home page service cards. */
  cta: string;
  intro: string;
  challenges: string[];
  offerings: Offering[];
  clients: string[];
  relatedProjects: string[];
  note?: string;
};

export const services: Service[] = [
  {
    slug: "capital-markets",
    number: "01",
    title: "Capital Markets & Deal Structuring",
    shortTitle: "Capital Markets",
    summary:
      "Prepare your enterprise for funding and structure transactions tailored to your strategic goals. Our advisory scope includes Commercial Paper (CP) readiness, capital-raising preparation, debt refinancing, joint venture structuring, and corporate investment preparation.",
    cta: "Explore Capital Advisory",
    intro:
      "We help companies prepare for and navigate the debt capital markets — from Commercial Paper readiness to coordinating credit ratings, documentation and syndicate partners. We advise on corporate capital structures and debt issuance programmes ranging from ₦3 billion to ₦20 billion+.",
    challenges: [
      "Short-term working-capital needs that bank facilities alone do not meet efficiently.",
      "Preparing a business to meet the documentation and disclosure expectations of capital-market investors.",
      "Refinancing existing debt on more suitable terms, or monetizing receivables tied up on the balance sheet.",
      "Structuring joint ventures and land assets so that their value can be assessed and unlocked.",
    ],
    offerings: [
      {
        name: "Commercial Paper programme structuring and advisory",
        description:
          "Designing the programme structure, sizing and timetable, and advising management through each stage of the process.",
      },
      {
        name: "SEC compliance coordination",
        description:
          "Coordinating the preparation of materials and the engagement of advisers so that filings align with Securities and Exchange Commission requirements.",
      },
      {
        name: "Credit-rating coordination",
        description:
          "Preparing the issuer for engagement with credit-rating agencies and coordinating the information they require.",
      },
      {
        name: "Information Memorandum preparation",
        description:
          "Developing a clear, well-evidenced Information Memorandum that presents the business and the transaction to investors.",
      },
      {
        name: "Debt refinancing and capital raising",
        description:
          "Assessing financing options and supporting the process of raising or refinancing debt.",
      },
      {
        name: "Receivables monetization",
        description:
          "Evaluating and structuring arrangements that convert receivables into working capital.",
      },
      {
        name: "Syndicate coordination",
        description:
          "Coordinating the issuing houses, arrangers, trustees and other parties involved in a transaction.",
      },
      {
        name: "Joint venture structuring",
        description:
          "Structuring partnerships so that contributions, governance and economics are clearly defined.",
      },
      {
        name: "Commercial land asset optimization",
        description:
          "Packaging and positioning land assets for commercial development or investor participation.",
      },
    ],
    clients: [
      "Industrial and manufacturing companies",
      "Corporates seeking short-term funding",
      "Real estate and land-asset holders",
      "Investors and joint venture partners",
    ],
    relatedProjects: ["commercial-paper-readiness", "northern-commercial-real-estate", "cfao-kano-office"],
    note: "Silgo Meta provides advisory and coordination services. Nothing on this page is an offer of securities or a guarantee that financing will be obtained. Regulatory filings and approvals remain subject to the requirements of the relevant authorities.",
  },
  {
    slug: "strategic-marketing",
    number: "02",
    title: "Strategy & Market Development",
    shortTitle: "Strategy & Markets",
    summary:
      "Build a clear, resilient path to expansion. We provide strategic direction, market-entry frameworks, commercial partnership structuring, and stakeholder engagement to help organizations evaluate market opportunities and make data-driven decisions.",
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
        description:
          "Assessing markets, defining the entry approach and positioning the business against its competitors.",
      },
      {
        name: "Industrial and commercial enterprise strategy",
        description:
          "Developing growth and operating strategies for industrial and commercial businesses.",
      },
      {
        name: "Public policy alignment",
        description:
          "Mapping relevant policy and regulation and aligning business plans with it.",
      },
      {
        name: "Government relations",
        description:
          "Advising on constructive, transparent engagement with government institutions.",
      },
      {
        name: "Brand architecture",
        description:
          "Organizing brands, sub-brands and offerings into a coherent structure.",
      },
      {
        name: "Stakeholder engagement",
        description:
          "Identifying stakeholders and planning how and when to engage them.",
      },
      {
        name: "Corporate communications",
        description:
          "Developing corporate narratives, messaging and communication plans.",
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
  {
    slug: "infrastructure-technology",
    number: "03",
    title: "Technology & Infrastructure",
    shortTitle: "Technology & Infrastructure",
    summary:
      "Align your digital architecture with strategic business priorities. We advise on enterprise software deployment, fintech integrations, cloud infrastructure, and core digital systems to optimize operations and support scalable growth.",
    cta: "Explore Technology Services",
    intro:
      "We help institutions plan and integrate the technology and infrastructure that modern operations depend on — working with specialist delivery partners where appropriate.",
    challenges: [
      "Legacy systems that limit efficiency, reporting and the ability to offer digital services.",
      "Moving workloads to the cloud securely and without disrupting operations.",
      "Building or integrating payment and digital financial systems.",
      "Connecting offices and sites reliably, including locations with limited terrestrial connectivity.",
    ],
    offerings: [
      {
        name: "Enterprise software architecture",
        description:
          "Designing software architectures that are maintainable, secure and suited to the organization's needs.",
      },
      {
        name: "Cloud infrastructure integration",
        description:
          "Planning and integrating cloud infrastructure with existing systems.",
      },
      {
        name: "Digital currency frameworks and fintech software",
        description:
          "Advising on and co-developing digital financial systems and payment software.",
      },
      {
        name: "ICT infrastructure and data centre systems",
        description:
          "Planning ICT infrastructure and data centre systems for institutional operations.",
      },
      {
        name: "LAN, WAN and VSAT networking",
        description:
          "Designing local, wide-area and satellite network connectivity.",
      },
      {
        name: "Digital media and mobility solutions",
        description:
          "Delivering digital media platforms and mobile solutions for organizations.",
      },
      {
        name: "Transport fleet conversion technologies",
        description:
          "Advising on technologies for converting transport fleets.",
      },
    ],
    clients: [
      "Financial institutions and fintechs",
      "Public-sector platforms",
      "Private enterprises modernizing operations",
      "Transport and logistics operators",
    ],
    relatedProjects: ["fintech-enterprise-architecture"],
  },
  {
    slug: "business-consulting",
    number: "04",
    title: "Business Consulting & Capacity Building",
    shortTitle: "Consulting & Capacity",
    summary:
      "Strengthen the organizational framework driving your ambitions. Our services cover corporate restructuring, governance frameworks, feasibility studies, and executive leadership development to boost performance and scale operations.",
    cta: "Explore Business Consulting",
    intro:
      "We help organizations strengthen how they are structured, governed and staffed — and provide the research and validation that sound decisions depend on.",
    challenges: [
      "Organizational structures that no longer fit the institution's strategy or scale.",
      "Leadership teams that need new capabilities to deliver a change agenda.",
      "Investment decisions that require independent feasibility and market evidence.",
      "Governance and compliance frameworks that need to be formalized or reviewed.",
    ],
    offerings: [
      {
        name: "Institutional restructuring",
        description:
          "Reviewing and redesigning organizational structures, roles and processes.",
      },
      {
        name: "Executive capacity building",
        description:
          "Developing leadership capabilities through structured programmes.",
      },
      {
        name: "Human resources optimization",
        description:
          "Improving workforce planning, structures and HR processes.",
      },
      {
        name: "Feasibility studies",
        description:
          "Assessing the commercial, technical and financial viability of proposed projects.",
      },
      {
        name: "Socio-economic research",
        description:
          "Researching the economic and social context of markets, sectors and projects.",
      },
      {
        name: "Market validation reports",
        description:
          "Testing market demand and assumptions before investment decisions are made.",
      },
      {
        name: "Corporate governance frameworks",
        description:
          "Designing board, committee and policy frameworks for sound governance.",
      },
      {
        name: "Regulatory compliance audits",
        description:
          "Reviewing compliance with applicable regulatory requirements and recommending improvements.",
      },
    ],
    clients: [
      "Public institutions and agencies",
      "Family-owned and growing businesses",
      "Investors and development partners",
      "Boards and executive teams",
    ],
    relatedProjects: [],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
