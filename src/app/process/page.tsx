import { CtaBand, Disclaimer, PageHero } from "@/components/sections";
import { Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { engagementProcess } from "@/content/corporate";

export const metadata = pageMetadata({
  title: "Our Process",
  description:
    "Silgo Meta's six-phase client engagement process: from initial consultation and readiness assessment to strategic introductions, transaction coordination and continuing advisory.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our structured client engagement process"
        title={engagementProcess.title}
        intro="Six phases that take a business from a defined funding requirement to engagement with suitable financing partners."
        breadcrumbs={[{ href: "/process", label: "Our process" }]}
      />

      <Section tone="white" labelledBy="phases-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="phases-heading" eyebrow="Six phases" title="How an engagement progresses" />
            <TextLink href="/governance" className="mt-8">
              Engagement governance
            </TextLink>
          </div>
          <ol className="relative space-y-10 border-l border-gold-500/60 pl-8 sm:pl-10 lg:col-span-8">
            {engagementProcess.phases.map((p, i) => (
              <li key={p.title} className="reveal relative">
                <span
                  aria-hidden
                  className="absolute top-0 -left-[3.05rem] flex size-9 items-center justify-center rounded-full border border-gold-500 bg-surface font-semibold text-gold-700 sm:-left-[3.55rem]"
                >
                  {i + 1}
                </span>
                <p className="text-sm font-semibold tracking-[0.12em] text-gold-700 uppercase">Phase {i + 1}</p>
                <h3 className="mt-2 font-serif text-2xl leading-snug font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate">{p.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="mist" padding="py-12 sm:py-14">
        <Container>
          <Disclaimer>{engagementProcess.note}</Disclaimer>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
