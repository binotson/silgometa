import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PracticeMedia } from "@/components/media";
import { CtaBand, Disclaimer, PageHero, ProjectCard } from "@/components/sections";
import { ButtonLink, Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { contactHref } from "@/lib/contact";
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
  const described = service.offerings.every((o) => o.description);
  const cpRelated = service.slug === "capital-access" || service.slug === "capital-markets";

  return (
    <>
      <PageHero
        eyebrow={service.complementary ? "Complementary practice" : `Service pillar ${service.number}`}
        title={service.title}
        intro={service.intro}
        breadcrumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.shortTitle },
        ]}
        media={<PracticeMedia slug={service.slug} preload onDark className="aspect-[16/10]" />}
      >
        <div className="mt-10">
          <ButtonLink href={contactHref(service.enquiry)} variant="gold" arrow>
            Discuss a Project
          </ButtonLink>
        </div>
      </PageHero>

      {service.challenges && service.challenges.length > 0 && (
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
      )}

      <Section tone="mist" labelledBy="scope-heading">
        <Container>
          <SectionHeading
            id="scope-heading"
            eyebrow="Advisory scope"
            title="What the practice covers"
            intro="Each engagement is scoped to the client's needs. Services may be combined or delivered individually."
          />
          {described ? (
            <dl className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {service.offerings.map((o) => (
                <div key={o.name} className="reveal bg-surface p-7">
                  <dt className="text-lg font-semibold text-navy-900">{o.name}</dt>
                  <dd className="mt-3 text-base leading-relaxed text-slate">{o.description}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
              {service.offerings.map((o, i) => (
                <li key={o.name} className="reveal flex gap-4 bg-surface p-6">
                  <span className="font-serif text-lg font-semibold text-gold-700">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg leading-snug font-medium text-navy-900">{o.name}</span>
                </li>
              ))}
            </ol>
          )}
          {cpRelated && (
            <div className="mt-8 flex flex-col gap-4 rounded-sm border border-gold-500/50 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base text-navy-900">
                <span className="font-semibold">Considering Commercial Paper?</span> See our programme advisory support
                and readiness scope.
              </p>
              <TextLink href="/services/commercial-paper-advisory" className="shrink-0">
                Commercial Paper Advisory
              </TextLink>
            </div>
          )}
          {service.note && <Disclaimer className="mt-8">{service.note}</Disclaimer>}
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
            <TextLink href="/process" className="mt-8 text-base">
              Our six-phase process
            </TextLink>
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
            Other services
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
