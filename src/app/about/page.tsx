import { Building2, MapPin } from "lucide-react";
import { CtaBand, PageHero, ValuesSection } from "@/components/sections";
import { Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { services } from "@/content/services";
import { company, mapSearchUrl, offices } from "@/content/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Silgo Meta Limited is a Nigerian strategic advisory firm established on 17 February 2023, with an executive office in Abuja and an operations hub in Kano.",
  path: "/about",
});

/* Mission and vision wording is drafted from the company profile's positioning and values — client to confirm. */
const missionVision = [
  {
    label: "Mission",
    text: "To deliver strategic, well-structured solutions across capital markets, technology and governance that help our clients raise capital, modernize operations and grow sustainably.",
  },
  {
    label: "Vision",
    text: "To be a trusted strategic partner for institutions, companies and investors, recognized for integrity, institutional clarity and lasting results.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A strategic partner for institutions, companies and investors"
        intro={company.description}
        breadcrumbs={[{ href: "/about", label: "About" }]}
      />

      <Section tone="white" labelledBy="overview-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="overview-heading" eyebrow="Company overview" title="Who we are" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-slate lg:col-span-7">
            <p>
              {company.legalName} brings together advisory capabilities that clients often have to source separately:
              transaction and capital-markets structuring, strategic and marketing consultancy, infrastructure and
              technology integration, and institutional consulting and capacity building.
            </p>
            <p>
              We work with multinational companies, financial institutions, government bodies, investors, industrial
              enterprises and technology organizations. Our role is to understand each client&rsquo;s objectives, design
              a sound structure or strategy, and coordinate the people and processes needed to deliver it.
            </p>
            <p>
              Our philosophy is simple: rigorous analysis, transparent structuring and disciplined execution, grounded in
              regulatory compliance and good governance.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="history-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="history-heading"
              eyebrow="Our history"
              title="Established in 2023"
              intro="Silgo Meta Limited is a young firm, built to serve clients across Nigeria from its bases in Abuja and Kano."
            />
          </div>
          <ol className="relative space-y-10 border-l border-gold-500/60 pl-8 lg:col-span-7">
            <li className="relative">
              <span aria-hidden className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full bg-gold-500 ring-4 ring-mist" />
              <p className="text-sm font-semibold tracking-[0.12em] text-gold-700 uppercase">{company.establishedLabel}</p>
              <h3 className="mt-2 text-xl font-semibold text-navy-900">Establishment</h3>
              <p className="mt-2 text-base leading-relaxed text-slate">
                Silgo Meta Limited was established on {company.establishedLabel}.
              </p>
            </li>
            <li className="relative">
              <span aria-hidden className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full bg-gold-500 ring-4 ring-mist" />
              <p className="text-sm font-semibold tracking-[0.12em] text-gold-700 uppercase">Legal status</p>
              <h3 className="mt-2 text-xl font-semibold text-navy-900">Incorporation</h3>
              <p className="mt-2 text-base leading-relaxed text-slate">{company.incorporation}</p>
            </li>
            <li className="relative">
              <span aria-hidden className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full bg-gold-500 ring-4 ring-mist" />
              <p className="text-sm font-semibold tracking-[0.12em] text-gold-700 uppercase">Footprint</p>
              <h3 className="mt-2 text-xl font-semibold text-navy-900">Abuja and Kano</h3>
              <p className="mt-2 text-base leading-relaxed text-slate">
                An executive office in Abuja&rsquo;s Central Business District and an operations hub in Kano.
              </p>
            </li>
          </ol>
        </Container>
      </Section>

      <Section tone="white" labelledBy="mission-heading">
        <Container>
          <SectionHeading id="mission-heading" eyebrow="Purpose" title="Mission and vision" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
            {missionVision.map((m) => (
              <div key={m.label} className="bg-paper p-8 sm:p-10">
                <h3 className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">{m.label}</h3>
                <p className="mt-4 font-serif text-2xl leading-snug text-navy-900">{m.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ValuesSection tone="mist" />

      <Section tone="white" labelledBy="footprint-heading">
        <Container>
          <SectionHeading
            id="footprint-heading"
            eyebrow="Corporate footprint"
            title="Present in Nigeria's capital and its northern commercial centre"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {offices.map((o) => (
              <div key={o.id} className="rounded-sm border border-line bg-paper p-8">
                <Building2 aria-hidden className="size-6 text-gold-700" />
                <h3 className="mt-5 font-serif text-2xl font-semibold text-navy-900">
                  {o.name} <span className="text-lg font-normal text-muted">· {o.role}</span>
                </h3>
                <address className="mt-4 text-base leading-relaxed text-slate not-italic">
                  {o.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{o.region}</span>
                </address>
                <a
                  href={mapSearchUrl(o.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4"
                >
                  <MapPin aria-hidden className="size-4" />
                  Search this address on Google Maps
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section labelledBy="practices-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="practices-heading"
              eyebrow="Strategic approach"
              title="Integrated across four disciplines"
              intro="Complex mandates rarely sit in one discipline. Our practice areas work together so that financial, strategic, technological and institutional questions are addressed as one."
            />
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {services.map((s) => (
              <li key={s.slug} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="font-serif text-xl text-gold-700">{s.number}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-navy-900">{s.title}</h3>
                  <TextLink href={`/services/${s.slug}`} className="mt-2 text-base">
                    <span>
                      Learn more <span className="sr-only">about {s.title}</span>
                    </span>
                  </TextLink>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
