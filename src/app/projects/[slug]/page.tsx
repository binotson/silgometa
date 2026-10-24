import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { CtaBand, PageHero, ProjectCard } from "@/components/sections";
import { Container, Section, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { getProject, projects } from "@/content/projects";

// Every valid slug is prerendered by generateStaticParams. Unknown slugs may
// block while rendering so they can return a real 404 status via notFound().
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.client} — ${project.title}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const facts = [
    { label: "Practice area", value: project.practice },
    ...(project.locations ? [{ label: "Location", value: project.locations }] : []),
    ...(project.figure ? [project.figure] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Case study"
        title={project.client}
        intro={project.title}
        breadcrumbs={[
          { href: "/projects", label: "Projects" },
          { href: `/projects/${project.slug}`, label: project.client },
        ]}
      />

      <section aria-label="Engagement summary" className="border-b border-line bg-white">
        <Container>
          <dl className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {facts.map((f) => (
              <div key={f.label} className="py-7 sm:px-8 sm:first:pl-0">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-2 font-serif text-xl font-semibold text-navy-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section tone="white" padding="py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-14 lg:grid-cols-12">
          <article className="space-y-12 lg:col-span-7">
            <div>
              <h2 className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">Advisory scope</h2>
              <p className="mt-4 font-serif text-2xl leading-snug text-navy-900 sm:text-[1.75rem]">{project.scope}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">Reported strategic impact</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">{project.impact}</p>
            </div>
            {project.note && (
              <p className="flex gap-3 rounded-sm bg-mist p-5 text-sm leading-relaxed text-muted">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
                {project.note}
              </p>
            )}
          </article>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-sm border border-line bg-paper p-7">
              <h2 className="text-lg font-semibold text-navy-900">Areas of work</h2>
              <ul className="mt-4 space-y-3">
                {project.scopeItems.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-slate">
                    <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <TextLink href={`/services/${project.serviceSlug}`} className="mt-6 text-base">
                Related practice area
              </TextLink>
            </div>
          </aside>
        </Container>
      </Section>

      {more.length > 0 && (
        <Section labelledBy="more-heading">
          <Container>
            <h2 id="more-heading" className="font-serif text-3xl font-semibold text-navy-900">
              More case studies
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {more.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
