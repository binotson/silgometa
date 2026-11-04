import { CtaBand, DataTable, Disclaimer, PageHero } from "@/components/sections";
import { ButtonLink, Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { sectorSolutions } from "@/content/corporate";

export const metadata = pageMetadata({
  title: "Sector Solutions",
  description:
    "Sector-specific funding facilitation for FMCG, manufacturing, real estate, mining, energy, financial institutions, technology, hospitality, healthcare, education and logistics businesses in Nigeria.",
  path: "/sectors",
});

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sector solutions"
        title={sectorSolutions.title}
        intro={sectorSolutions.intro.join(" ")}
        breadcrumbs={[{ href: "/sectors", label: "Sectors" }]}
      />

      <Section tone="white" labelledBy="sectors-heading">
        <Container>
          <SectionHeading
            id="sectors-heading"
            eyebrow="Ten sectors"
            title="Funding requirements and our facilitation focus"
          />
          <DataTable
            className="mt-12"
            caption="Sector funding requirements and Silgo Meta facilitation focus"
            columns={[
              { key: "sector", label: "Sector" },
              { key: "needs", label: "Principal funding requirements" },
              { key: "focus", label: "Our facilitation focus" },
            ]}
            rows={[...sectorSolutions.rows]}
          />
        </Container>
      </Section>

      <Section tone="mist" labelledBy="readiness-heading">
        <Container>
          <SectionHeading
            id="readiness-heading"
            eyebrow="Sector-specific readiness assessment"
            title="Five dimensions of readiness"
            intro={sectorSolutions.readinessIntro}
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
            {sectorSolutions.readiness.map((r, i) => (
              <li key={r.name} className="reveal bg-surface p-7">
                <span className="font-serif text-lg font-semibold text-gold-700">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg font-semibold text-navy-900">{r.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate">{r.text}</p>
              </li>
            ))}
          </ol>
          <Disclaimer className="mt-8">{sectorSolutions.eligibilityNote}</Disclaimer>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" arrow>
              Request a Readiness Conversation
            </ButtonLink>
            <TextLink href="/services/commercial-paper-advisory">Commercial Paper advisory</TextLink>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
