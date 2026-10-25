import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { PracticeMedia } from "@/components/media";
import { CtaBand, PageHero, ProjectCard } from "@/components/sections";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { getProject } from "@/content/projects";
import { getService, services } from "@/content/services";
import { engagementSteps } from "@/content/site";

// Every valid slug is prerendered by generateStaticParams. Unknown slugs may
// block while rendering so they can return a real 404 status via notFound().
export const instant = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.summary, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.relatedProjects.map(getProject).filter((p) => p !== undefined);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={`Practice area ${service.number}`}
        title={service.title}
        intro={service.intro}
        breadcrumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.shortTitle },
        ]}
        media={<PracticeMedia slug={service.slug} preload onDark className="aspect-[16/10]" />}
      >
        <div className="mt-10">
          <ButtonLink href="/contact" variant="gold" arrow>
            Discuss a Project
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="white" labelledBy="challenges-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="challenges-heading" eyebrow="Challenges we address" title="Where we can help" />
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {service.challenges.map((c) => (
              <li key={c} className="border-l-2 border-gold-500 pl-5 text-lg leading-relaxed text-navy-900">
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="scope-heading">
        <Container>
          <SectionHeading
            id="scope-heading"
            eyebrow="Advisory scope"
            title="What the practice covers"
            intro="Each engagement is scoped to the client's needs. Services may be combined or delivered individually."
          />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((o) => (
              <div key={o.name} className="reveal bg-surface p-7">
                <dt className="text-lg font-semibold text-navy-900">{o.name}</dt>
                <dd className="mt-3 text-base leading-relaxed text-slate">{o.description}</dd>
              </div>
            ))}
          </dl>
          {service.note && (
            <p className="mt-8 flex max-w-4xl gap-3 text-sm leading-relaxed text-muted">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
              {service.note}
            </p>
          )}
        </Container>
      </Section>

      <Section tone="white" labelledBy="clients-heading">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="clients-heading" eyebrow="Who we work with" title="Typical clients" />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {service.clients.map((c) => (
                <li key={c} className="py-4 text-lg text-navy-900">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading id="process-heading" eyebrow="Engaging Silgo Meta" title="How engagements work" />
            <ol className="mt-8 space-y-6">
              {engagementSteps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-500 font-semibold text-gold-700">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900">{step.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-slate">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section labelledBy="related-heading">
          <Container>
            <SectionHeading id="related-heading" eyebrow="Related engagements" title="Case studies" />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="white" padding="py-14" labelledBy="other-heading">
        <Container>
          <h2 id="other-heading" className="text-sm font-semibold tracking-[0.14em] text-muted uppercase">
            Other practice areas
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex h-full items-baseline gap-4 rounded-sm border border-line p-5 transition-colors hover:border-navy-900"
                >
                  <span className="font-serif text-lg text-gold-700">{s.number}</span>
                  <span className="text-base font-semibold text-navy-900">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
