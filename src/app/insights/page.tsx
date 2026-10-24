import { CtaBand, InsightCard, PageHero } from "@/components/sections";
import { Container, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { insights } from "@/content/insights";

export const metadata = pageMetadata({
  title: "Insights & Thought Leadership",
  description:
    "Silgo Meta perspectives on debt markets, public policy and capital mobilization, fintech integration and real estate cluster development.",
  path: "/insights",
});

export default function InsightsPage() {
  const hasOutlines = insights.some((i) => i.status === "outline");
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Thought leadership"
        intro="Perspectives on capital markets, policy, technology and industrial development, drawn from our advisory practice."
        breadcrumbs={[{ href: "/insights", label: "Insights" }]}
      />
      <Section tone="white">
        <Container>
          {hasOutlines && (
            <p className="mb-12 max-w-3xl border-l-2 border-gold-500 pl-5 text-base leading-relaxed text-slate">
              Our first series of articles is in preparation. The outlines below summarize the themes each article will
              address.
            </p>
          )}
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {insights.map((i) => (
              <InsightCard key={i.slug} insight={i} headingLevel="h2" />
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title="Discuss these themes with our team" />
    </>
  );
}
