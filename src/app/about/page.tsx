import { BadgeCheck, Building2, MapPin } from "lucide-react";
import { BrandIdentityPanel } from "@/components/brand-identity";
import { CtaBand, PageHero, ValuesSection } from "@/components/sections";
import { ButtonLink, Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { brandIdentity } from "@/content/corporate";
import { corePillars } from "@/content/services";
import { company, mapSearchUrl, offices } from "@/content/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "The brand identity of SILGO META LIMITED (RC No. 679305): Sil-Go (silver and gold, enduring value and real capital) and Meta (technology and the digital frontier). Offices in Abuja and Kano.",
  path: "/about",
});

/* Mission and vision wording is drafted from the company profile's positioning and values — client to confirm. */
const missionVision = [
  {
    label: "Mission",
    text: "To connect viable businesses with appropriate sources of capital, and to strengthen their readiness, financial propositions and institutional foundations for sustainable growth.",
  },
  {
    label: "Vision",
    text: "To be a trusted strategic partner for enterprises, institutions and investors, recognized for integrity, institutional clarity and lasting results.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Bridging enduring value and the digital frontier"
        intro={brandIdentity.nameIntro}
        breadcrumbs={[{ href: "/about", label: "About" }]}
      />

      <Section tone="white" labelledBy="name-heading">
        <Container>
          <SectionHeading
            id="name-heading"
            eyebrow={brandIdentity.title}
            title={brandIdentity.nameTitle}
            intro="Two ideas, one name: the physical economy of real capital and the digital economy of technology."
          />
          <div className="mt-12">
            <BrandIdentityPanel />
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{brandIdentity.clarification}</p>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="mandate-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="mandate-heading" eyebrow="Purpose" title={brandIdentity.mandateTitle} />
          </div>
          <div className="space-y-6 lg:col-span-8">
            {brandIdentity.mandate.map((p, i) => (
              <p
                key={p}
                className={
                  i === 0
                    ? "font-serif text-2xl leading-snug text-navy-900 sm:text-[1.75rem]"
                    : "text-lg leading-relaxed text-slate"
                }
              >
                {p}
              </p>
            ))}
            <p className="text-lg leading-relaxed text-slate">
              In practice, this mandate is delivered through five service pillars that connect enterprises with
              capital and strengthen the foundations institutional financing requires.
            </p>
            <TextLink href="/corporate-overview">Read our corporate overview</TextLink>
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="mission-heading">
        <Container>
          <SectionHeading id="mission-heading" eyebrow="Strategic direction" title="Mission and vision" />
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

      <ValuesSection
        tone="mist"
        intro="Our name also spells the five principles that guide how we advise, structure and deliver for our clients."
      />

      <Section tone="white" labelledBy="registration-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="registration-heading" eyebrow="Corporate registration" title="A registered Nigerian company" />
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-sm border border-line bg-paper p-8 sm:p-10">
              <BadgeCheck aria-hidden className="size-7 text-gold-700" />
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-muted">Company name</dt>
                  <dd className="mt-1 font-serif text-xl font-semibold text-navy-900">{company.legalName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Registration number</dt>
                  <dd className="mt-1 font-serif text-xl font-semibold text-navy-900">{company.rcLabel}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm text-muted">Registry</dt>
                  <dd className="mt-1 text-base text-slate">Corporate Affairs Commission (CAC), Nigeria</dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                {company.registrationDistinction}
              </p>
              <TextLink href="/governance" className="mt-6 text-base">
                Governance &amp; compliance
              </TextLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="footprint-heading">
        <Container>
          <SectionHeading
            id="footprint-heading"
            eyebrow="Strategic locations"
            title="Present in Nigeria's capital and its northern commercial centre"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {offices.map((o) => (
              <div key={o.id} className="rounded-sm border border-line bg-surface p-8">
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

      <Section tone="white" labelledBy="practices-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="practices-heading"
              eyebrow="What we do"
              title="Five service pillars"
              intro="From capital access and capital markets readiness to technology advisory and institutional capacity building."
            />
            <ButtonLink href="/corporate-overview" variant="secondary" className="mt-8">
              Corporate overview
            </ButtonLink>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {corePillars.map((s) => (
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
