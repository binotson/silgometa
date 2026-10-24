import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, InsightCard, LeaderCard, LinePattern, ProjectCard, ValuesSection } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading, TextLink } from "@/components/ui";
import { insights } from "@/content/insights";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { company, engagementSteps, leaders } from "@/content/site";

const facts = [
  { label: "Established", value: company.establishedLabel },
  { label: "Incorporated under", value: "CAMA 2020" },
  { label: "Offices", value: "Abuja & Kano" },
  { label: "Practice areas", value: "Four integrated disciplines" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <LinePattern className="top-0 right-0 h-full w-full max-w-4xl" />
        <Container className="relative grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-20 xl:py-24">
          <div className="lg:col-span-7">
            <Eyebrow onDark>Strategic advisory · Nigeria</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.08] font-semibold text-balance sm:text-6xl lg:text-[3.5rem] xl:text-[3.75rem]">
              Driving Strategic Solutions Across Capital Markets, Technology &amp; Governance.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              {company.legalName} is a Nigerian strategic advisory firm helping companies, institutions and
              investors structure transactions, integrate technology and strengthen governance.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="gold" arrow>
                Discuss a Project
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost-light">
                Explore Our Expertise
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Practice areas" className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-sm font-semibold tracking-[0.14em] text-white/60 uppercase">Practice areas</p>
            <ul className="mt-4 border-t border-white/15">
              {services.map((s) => (
                <li key={s.slug} className="border-b border-white/15">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-5 py-5 transition-colors hover:text-gold-300"
                  >
                    <span className="font-serif text-lg text-gold-400">{s.number}</span>
                    <span className="flex-1 text-lg font-medium">{s.title}</span>
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

      <section aria-label="Company facts" className="border-b border-line bg-white">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`py-8 sm:py-10 ${i % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : ""} ${
                  i === 2 ? "border-t border-line lg:border-t-0 lg:border-l lg:pl-8" : ""
                } ${i === 3 ? "border-t border-line lg:border-t-0" : ""}`}
              >
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-2 font-serif text-xl font-semibold text-navy-900 sm:text-2xl">{f.value}</dd>
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
              eyebrow="Our expertise"
              title="Four practice areas, one integrated advisory partner"
              intro="Our work connects finance, strategy, technology and institutional capability, so clients can address complex mandates with a single, coordinated team."
            />
            <TextLink href="/services" className="shrink-0">
              All services
            </TextLink>
          </div>

          <div className="mt-14 divide-y divide-line border-y border-line">
            {services.map((s) => (
              <article key={s.slug} className="reveal grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                <p aria-hidden className="font-serif text-4xl font-semibold text-gold-500 lg:col-span-1">
                  {s.number}
                </p>
                <div className="lg:col-span-5">
                  <h3 className="font-serif text-2xl leading-snug font-semibold text-navy-900 sm:text-[1.75rem]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">{s.summary}</p>
                  <TextLink href={`/services/${s.slug}`} className="mt-6">
                    <span>
                      Explore <span className="sr-only">{s.title}</span>
                    </span>
                  </TextLink>
                </div>
                <ul className="grid content-start gap-x-8 gap-y-3 text-base text-navy-800 sm:grid-cols-2 lg:col-span-6">
                  {s.offerings.slice(0, 6).map((o) => (
                    <li key={o.name} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-gold-500" />
                      {o.name}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="approach-heading">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="approach-heading"
              eyebrow="Our approach"
              title="Institutional clarity, from first conversation to execution"
              intro="Every mandate begins with understanding the client's objectives and constraints. We then structure a solution and coordinate the advisers, counterparties and stakeholders needed to deliver it."
            />
            <TextLink href="/about" className="mt-8">
              About Silgo Meta
            </TextLink>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {engagementSteps.map((step, i) => (
              <li key={step.title} className="reveal bg-white p-7 sm:p-8">
                <span className="text-sm font-semibold text-gold-700">Step {i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate">{step.text}</p>
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
              eyebrow="Selected engagements"
              title="Documented case studies"
              intro="A selection of mandates across capital markets, real estate, technology and transaction advisory."
            />
            <TextLink href="/projects" className="shrink-0">
              All projects
            </TextLink>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
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
              Leadership &amp; governance
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
