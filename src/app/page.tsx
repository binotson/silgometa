import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PracticeMedia, SlotMedia } from "@/components/media";
import { CtaBand, InsightCard, LeaderCard, LinePattern, ProjectCard, ValuesSection } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading, TextLink, cn } from "@/components/ui";
import { corporateOverview, fundingNetwork, sectorSolutions } from "@/content/corporate";
import { insights } from "@/content/insights";
import { homeHeroMedia } from "@/content/media";
import { projects } from "@/content/projects";
import { corePillars } from "@/content/services";
import { company, engagementSteps, leaders } from "@/content/site";

const featured = projects.find((p) => p.featured);
const otherProjects = projects.filter((p) => p !== featured);

const facts = [
  { label: "Registered company", value: company.rcLabel },
  { label: "Strategic locations", value: "Abuja & Kano" },
  { label: "Core business", value: "Capital access & facilitation" },
  { label: "Service pillars", value: "Five integrated pillars" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-inverse text-white">
        {homeHeroMedia ? (
          <div aria-hidden className="absolute inset-0">
            <SlotMedia slot={homeHeroMedia} sizes="100vw" preload />
            <div className="absolute inset-0 bg-linear-to-r from-navy-950/90 via-navy-950/75 to-navy-950/55" />
          </div>
        ) : (
          <LinePattern className="top-0 right-0 h-full w-full max-w-4xl" />
        )}
        <Container className="relative grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-20 xl:py-24">
          <div className="lg:col-span-7">
            <Eyebrow onDark>{corporateOverview.title}</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.4rem] leading-[1.08] font-semibold text-balance sm:text-6xl lg:text-[3.4rem] xl:text-[3.6rem]">
              {company.taglineLines.map((line, i) => (
                <span key={line} className={cn("block", i > 0 && "text-white/85")}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">{company.description}</p>
            <p className="mt-5 text-sm leading-relaxed font-medium tracking-[0.04em] text-gold-300">
              {company.positioning.join(" · ")}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="gold" arrow>
                Discuss a Funding Requirement
              </ButtonLink>
              <ButtonLink href="/corporate-overview" variant="ghost-light">
                Corporate Overview
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Service pillars" className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-sm font-semibold tracking-[0.14em] text-white/60 uppercase">Service pillars</p>
            <ul className="mt-4 border-t border-white/15">
              {corePillars.map((s) => (
                <li key={s.slug} className="border-b border-white/15">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-5 py-4 transition-colors hover:text-gold-300"
                  >
                    <span className="font-serif text-lg text-gold-400">{s.number}</span>
                    <span className="flex-1 text-base font-medium sm:text-lg">{s.title}</span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 shrink-0 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-gold-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <section aria-label="Company facts" className="border-b border-line bg-surface">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`py-8 sm:py-10 ${i % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : "pr-4"} ${
                  i === 2 ? "border-t border-line lg:border-t-0 lg:border-l lg:pl-8" : ""
                } ${i === 3 ? "border-t border-line lg:border-t-0" : ""}`}
              >
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-2 font-serif text-lg font-semibold text-navy-900 sm:text-2xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section labelledBy="expertise-heading">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="expertise-heading"
              eyebrow="Core service pillars"
              title="Five pillars, one strategic bridge to capital"
              intro={corporateOverview.purpose}
            />
            <TextLink href="/services" className="shrink-0">
              All services
            </TextLink>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {corePillars.map((s, i) => (
              <article
                key={s.slug}
                className={cn(
                  "reveal group relative flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(16,36,58,0.35)]",
                  i === 0 && "md:col-span-2 lg:grid lg:grid-cols-2",
                )}
              >
                <PracticeMedia
                  slug={s.slug}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  bare
                  className={cn("aspect-[16/8]", i === 0 && "lg:aspect-auto lg:h-full lg:min-h-80")}
                />
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <p className="font-serif text-lg font-semibold text-gold-700">
                    {s.number}
                    {s.kicker && <span className="ml-3 font-sans text-sm font-semibold tracking-[0.12em] uppercase">{s.kicker}</span>}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-snug font-semibold text-navy-900">
                    <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate">{s.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Selected ${s.shortTitle} services`}>
                    {s.offerings.slice(0, 3).map((o) => (
                      <li key={o.name} className="rounded-full bg-mist px-3 py-1 text-sm text-navy-800">
                        {o.name}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-base font-semibold text-navy-900">
                    {s.cta}
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-gold-700 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="channels-heading">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="channels-heading"
              eyebrow="Funding access network"
              title="Access to a broad range of financing channels"
              intro="We help businesses approach the capital providers best suited to their requirement."
            />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {fundingNetwork.rows.map((r) => (
                <li key={r.channel} className="py-3 text-base font-medium text-navy-900">
                  {r.channel}
                </li>
              ))}
            </ul>
            <TextLink href="/corporate-overview" className="mt-8">
              Funding channels and solutions
            </TextLink>
          </div>
          <div>
            <SectionHeading
              id="sectors-heading"
              eyebrow="Sector solutions"
              title="Serving major sectors of the Nigerian economy"
              intro="Each industry has different funding cycles, operating risks and investment requirements."
            />
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Sectors served">
              {sectorSolutions.rows.map((r) => (
                <li key={r.sector} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm text-navy-800">
                  {r.sector}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-6">
              <TextLink href="/sectors">Sector solutions</TextLink>
              <TextLink href="/services/commercial-paper-advisory">Commercial Paper advisory</TextLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="approach-heading">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="approach-heading"
              eyebrow="Our process"
              title="From funding requirement to financing opportunity"
              intro="A structured, six-phase engagement, from initial consultation to continuing advisory."
            />
            <TextLink href="/process" className="mt-8">
              Our process in detail
            </TextLink>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {engagementSteps.map((step, i) => (
              <li key={step.title} className="reveal bg-surface p-6 sm:p-7">
                <span className="text-sm font-semibold text-gold-700">Phase {i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-navy-900">{step.short}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white" labelledBy="projects-heading">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="projects-heading"
              eyebrow={featured ? (featured.profileLabel ?? "Featured engagement profile") : "Selected engagements"}
              title={featured ? featured.title : "Documented case studies"}
              intro={featured?.sector ? `Sector: ${featured.sector}` : undefined}
            />
            <TextLink href="/projects" className="shrink-0">
              All projects
            </TextLink>
          </div>
          {featured && (
            <article className="reveal mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-12">
              <dl className="grid gap-8 bg-surface p-7 sm:p-10 lg:col-span-8">
                {[
                  { label: "Engagement objective", value: featured.objective },
                  { label: "Our advisory role", value: featured.scope },
                  { label: featured.impactLabel ?? "Results", value: featured.impact },
                ].map(
                  (f) =>
                    f.value && (
                      <div key={f.label}>
                        <dt className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">{f.label}</dt>
                        <dd className="mt-3 text-lg leading-relaxed text-slate">{f.value}</dd>
                      </div>
                    ),
                )}
              </dl>
              <div className="flex flex-col gap-8 bg-paper p-7 sm:p-10 lg:col-span-4">
                {featured.status && (
                  <div>
                    <p className="text-sm text-muted">Engagement status</p>
                    <p className="mt-2 font-serif text-xl font-semibold text-navy-900">{featured.status}</p>
                  </div>
                )}
                {featured.figure && (
                  <div>
                    <p className="text-sm text-muted">{featured.figure.label}</p>
                    <p className="mt-2 font-serif text-3xl font-semibold text-navy-900">{featured.figure.value}</p>
                  </div>
                )}
                {featured.financialContext && (
                  <div>
                    <p className="text-sm text-muted">Financial context</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{featured.financialContext}</p>
                  </div>
                )}
                <TextLink href={`/projects/${featured.slug}`} className="mt-auto self-start">
                  View Engagement Profile
                </TextLink>
              </div>
            </article>
          )}
          {otherProjects.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {otherProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <ValuesSection tone="paper" />

      <Section tone="white" labelledBy="leadership-heading">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="leadership-heading"
              eyebrow="Leadership"
              title="The leadership behind our mandates"
              intro="Silgo Meta's leadership directs the firm's strategy, operations and advisory work."
            />
            <TextLink href="/leadership" className="mt-8">
              Leadership
            </TextLink>
          </div>
          <div className="space-y-10 lg:col-span-7 lg:col-start-6">
            {leaders.map((l) => (
              <LeaderCard key={l.name} leader={l} />
            ))}
          </div>
        </Container>
      </Section>

      <Section labelledBy="insights-heading">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="insights-heading"
              eyebrow="Insights"
              title="Perspectives on markets, policy and technology"
              intro="Themes we are developing from our advisory work."
            />
            <TextLink href="/insights" className="shrink-0">
              All insights
            </TextLink>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {insights.map((i) => (
              <InsightCard key={i.slug} insight={i} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
