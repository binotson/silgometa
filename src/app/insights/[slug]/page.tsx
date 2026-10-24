import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, InsightCard, PageHero } from "@/components/sections";
import { Container, Section, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { getInsight, insights } from "@/content/insights";
import { getService } from "@/content/services";

// Every valid slug is prerendered by generateStaticParams. Unknown slugs may
// block while rendering so they can return a real 404 status via notFound().
export const instant = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.title,
    description: insight.summary,
    path: `/insights/${insight.slug}`,
    type: "article",
  });
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const service = getService(insight.serviceSlug);
  const related = insights.filter((i) => i.slug !== insight.slug).slice(0, 3);
  const isOutline = insight.status === "outline";

  return (
    <>
      <PageHero
        eyebrow={insight.theme}
        title={insight.title}
        intro={insight.summary}
        breadcrumbs={[
          { href: "/insights", label: "Insights" },
          { href: `/insights/${insight.slug}`, label: insight.theme },
        ]}
      >
        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-base text-white/70">
          <div className="flex gap-2">
            <dt>Status:</dt>
            <dd className="text-white">{isOutline ? "Article outline — full article forthcoming" : "Published"}</dd>
          </div>
          {insight.publishedOn && (
            <div className="flex gap-2">
              <dt>Published:</dt>
              <dd className="text-white">{insight.publishedOn}</dd>
            </div>
          )}
          {insight.author && (
            <div className="flex gap-2">
              <dt>Author:</dt>
              <dd className="text-white">{insight.author}</dd>
            </div>
          )}
        </dl>
      </PageHero>

      <Section tone="white" padding="py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-14 lg:grid-cols-12">
          <article className="prose-silgo max-w-[68ch] lg:col-span-8">
            {isOutline && (
              <p className="rounded-sm bg-mist p-5 text-base">
                This page outlines a forthcoming Silgo Meta article. The full text is being prepared and will be
                published here.
              </p>
            )}
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            ))}
          </article>
          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="sticky top-28 space-y-8">
              {service && (
                <div className="border-t-2 border-navy-900 pt-5">
                  <h2 className="text-sm font-semibold tracking-[0.14em] text-muted uppercase">Related practice</h2>
                  <p className="mt-3 text-lg font-semibold text-navy-900">{service.title}</p>
                  <TextLink href={`/services/${service.slug}`} className="mt-4 text-base">
                    View practice area
                  </TextLink>
                </div>
              )}
              <div className="border-t-2 border-navy-900 pt-5">
                <h2 className="text-sm font-semibold tracking-[0.14em] text-muted uppercase">Discuss this topic</h2>
                <p className="mt-3 text-base text-slate">Speak with our team about how these themes apply to you.</p>
                <TextLink href="/contact" className="mt-4 text-base">
                  Contact us
                </TextLink>
              </div>
            </div>
          </aside>
        </Container>
      </Section>

      <Section labelledBy="related-insights">
        <Container>
          <h2 id="related-insights" className="font-serif text-3xl font-semibold text-navy-900">
            Related insights
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {related.map((i) => (
              <InsightCard key={i.slug} insight={i} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
