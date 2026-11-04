import { AlertTriangle } from "lucide-react";
import { PracticeMedia } from "@/components/media";
import { CtaBand, Disclaimer, PageHero } from "@/components/sections";
import { ButtonLink, Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { commercialPaper, sectorSolutions } from "@/content/corporate";

export const metadata = pageMetadata({
  title: "Commercial Paper Advisory",
  description:
    "Commercial Paper and debt capital market readiness: preliminary eligibility assessment, funding requirement evaluation, credit-rating coordination and introductions to licensed fund arrangers and issuing houses.",
  path: "/services/commercial-paper-advisory",
});

export default function CommercialPaperPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial Paper & debt capital markets"
        title={commercialPaper.subtitle}
        intro={commercialPaper.intro.join(" ")}
        breadcrumbs={[
          { href: "/services", label: "Services" },
          { href: "/services/commercial-paper-advisory", label: "Commercial Paper Advisory" },
        ]}
        media={<PracticeMedia slug="capital-markets" preload onDark className="aspect-[16/10]" />}
      >
        <div className="mt-10">
          <ButtonLink href="/contact" variant="gold" arrow>
            Discuss CP Readiness
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="white" labelledBy="scope-heading">
        <Container>
          <SectionHeading
            id="scope-heading"
            eyebrow="Our scope"
            title={commercialPaper.scopeTitle}
            intro="Six areas of support, from preliminary eligibility through to transaction coordination."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {commercialPaper.scope.map((s, i) => (
              <li key={s.name} className="reveal bg-surface p-7">
                <span className="flex size-10 items-center justify-center rounded-full border border-gold-500 font-semibold text-gold-700">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{s.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="other-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="other-heading" eyebrow="Beyond Commercial Paper" title={commercialPaper.otherTitle} />
            <p className="mt-5 text-lg leading-relaxed text-slate">{commercialPaper.other}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Other instruments">
              {commercialPaper.otherInstruments.map((i) => (
                <li key={i} className="rounded-full bg-surface px-3 py-1 text-sm text-navy-800 ring-1 ring-line">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <aside aria-labelledby="important-heading" className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-sm border-l-4 border-gold-500 bg-surface p-7">
              <h2 id="important-heading" className="flex items-center gap-3 text-lg font-semibold text-navy-900">
                <AlertTriangle aria-hidden className="size-5 text-gold-700" />
                Important
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate">{commercialPaper.important}</p>
            </div>
          </aside>
        </Container>
      </Section>

      <Section tone="white" padding="py-14 sm:py-16">
        <Container>
          <Disclaimer>
            {sectorSolutions.eligibilityNote} The formal issuance, arrangement, distribution, and other regulated
            activities associated with capital market securities are undertaken by appropriately licensed institutions.
          </Disclaimer>
          <div className="mt-8 flex flex-wrap gap-6">
            <TextLink href="/services/capital-markets">Capital Markets Readiness &amp; Transaction Advisory</TextLink>
            <TextLink href="/sectors">Sector readiness assessment</TextLink>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
