import { CtaBand, PageHero, ProjectCard } from "@/components/sections";
import { Container, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/content/projects";

export const metadata = pageMetadata({
  title: "Projects & Case Studies",
  description:
    "Selected Silgo Meta engagements in Commercial Paper readiness, real estate investor syndication, fintech architecture and transaction advisory.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects & case studies"
        title="Selected engagements"
        intro="Documented mandates across capital markets, commercial real estate, digital infrastructure and transaction advisory."
        breadcrumbs={[{ href: "/projects", label: "Projects" }]}
      />
      <Section tone="white">
        <Container>
          {projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} headingLevel="h2" />
              ))}
            </div>
          ) : (
            <p className="text-lg text-slate">Case studies will be published here shortly.</p>
          )}
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
            Case studies describe the scope of Silgo Meta&rsquo;s advisory role and the strategic impact reported for
            each mandate. Figures refer to programme or transaction values, not to fees or to assets owned by Silgo Meta.
          </p>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
