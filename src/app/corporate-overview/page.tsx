import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand, DataTable, Disclaimer, PageHero } from "@/components/sections";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { corporateCommitment, corporateOverview, fundingNetwork, valueProposition } from "@/content/corporate";
import { corePillars } from "@/content/services";
import { company } from "@/content/site";

export const metadata = pageMetadata({
  title: "Corporate Overview",
  description:
    "Silgo Meta Limited connects businesses with suitable funding opportunities — fund arrangers, licensed capital market operators, banks, private equity and development finance institutions — and prepares them for financing.",
  path: "/corporate-overview",
});

export default function CorporateOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate overview"
        title={corporateOverview.title}
        intro={corporateOverview.paragraphs[0]}
        breadcrumbs={[
          { href: "/about", label: "About" },
          { href: "/corporate-overview", label: "Corporate overview" },
        ]}
      >
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/contact" variant="gold" arrow>
            Discuss a Funding Requirement
          </ButtonLink>
          <ButtonLink href="/process" variant="ghost-light">
            Our Process
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="white" labelledBy="business-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="business-heading" eyebrow="Our core business" title="Strategic financial linkages" />
            <div className="mt-8 rounded-sm border border-line bg-paper p-6">
              <p className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">We support businesses seeking</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {corporateOverview.fundingNeeds.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-base text-navy-900">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-gold-700" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-slate lg:col-span-7">
            {corporateOverview.paragraphs.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <blockquote className="border-l-2 border-gold-500 pl-6 font-serif text-2xl leading-snug text-navy-900">
              {corporateOverview.purpose}
            </blockquote>
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="value-heading">
        <Container>
          <SectionHeading
            id="value-heading"
            eyebrow="Our value proposition"
            title={valueProposition.title}
            intro={valueProposition.intro}
          />
          <p className="mt-10 text-base font-semibold text-navy-900">{valueProposition.approachIntro}</p>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {valueProposition.items.map((item, i) => (
              <li key={item.name} className="reveal bg-surface p-7">
                <span className="font-serif text-lg font-semibold text-gold-700">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg font-semibold text-navy-900">{item.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate">{valueProposition.closing}</p>
        </Container>
      </Section>

      <Section tone="white" labelledBy="network-heading">
        <Container>
          <SectionHeading id="network-heading" eyebrow="Funding channels" title={fundingNetwork.title} intro={fundingNetwork.intro} />
          <DataTable
            className="mt-12"
            caption="Funding channels and potential financing solutions"
            columns={[
              { key: "channel", label: "Funding channel" },
              { key: "solutions", label: "Potential financing solutions" },
            ]}
            rows={[...fundingNetwork.rows]}
          />
          <Disclaimer className="mt-8">{fundingNetwork.note}</Disclaimer>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="pillars-heading">
        <Container>
          <SectionHeading
            id="pillars-heading"
            eyebrow="Core service pillars"
            title="How we create value"
            intro="Capital access is our primary activity, supported by readiness, finance, technology and capacity-building advisory."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {corePillars.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-sm border border-line bg-surface p-6 transition-colors hover:border-navy-900"
                >
                  <span className="font-serif text-lg text-gold-700">{s.number}</span>
                  <span className="mt-2 text-lg font-semibold text-navy-900">{s.title}</span>
                  <span className="mt-2 flex-1 text-base leading-relaxed text-slate">{s.summary}</span>
                  <ArrowRight aria-hidden className="mt-4 size-4 text-gold-700 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="navy" labelledBy="commitment-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="commitment-heading" eyebrow="Our corporate commitment" title={corporateCommitment.title} onDark />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-white/75 lg:col-span-7">
            {corporateCommitment.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="border-t border-white/15 pt-6 font-serif text-2xl leading-snug text-white">
              {company.name} — {company.tagline}
            </p>
            <p className="text-sm font-semibold tracking-[0.14em] text-gold-400 uppercase">{company.locations}</p>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
