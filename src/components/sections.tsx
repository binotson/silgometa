import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading, cn } from "@/components/ui";
import { contact, values, type Leader } from "@/content/site";
import type { Project } from "@/content/projects";
import type { Insight } from "@/content/insights";

/** Decorative line pattern for dark bands. Purely ornamental. */
export function LinePattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      viewBox="0 0 600 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx="600" cy="0" r={90 + i * 62} stroke="#AD7E3A" strokeOpacity={0.26 - i * 0.02} />
      ))}
      <path d="M0 520 L600 120" stroke="#ADAAB5" strokeOpacity="0.14" />
      <path d="M0 600 L600 200" stroke="#ffffff" strokeOpacity="0.05" />
    </svg>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: { href: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <LinePattern className="top-0 right-0 h-full w-full max-w-3xl opacity-80" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((b) => (
                <li key={b.href} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  <Link href={b.href} className="hover:text-white">
                    {b.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Eyebrow onDark>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}

export function CtaBand({
  title = "Discuss a project with Silgo Meta",
  text = "Tell us about your objectives. We will respond to arrange an initial, confidential conversation.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-navy-900">
      <LinePattern className="top-0 right-0 h-full w-full max-w-2xl" />
      <Container className="relative grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-7">
          <Eyebrow onDark>Get in touch</Eyebrow>
          <h2 id="cta-heading" className="mt-4 font-serif text-3xl leading-tight font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{text}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/contact" variant="gold" arrow>
              Discuss a Project
            </ButtonLink>
          </div>
        </div>
        <div className="space-y-4 lg:col-span-4 lg:col-start-9">
          <a
            href={contact.phoneHref}
            className="flex items-center gap-4 rounded-sm border border-white/15 p-5 text-white transition-colors hover:border-gold-400"
          >
            <Phone aria-hidden className="size-5 text-gold-400" />
            <span>
              <span className="block text-sm text-white/60">Telephone</span>
              <span className="block text-lg font-semibold">{contact.phone}</span>
            </span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-4 rounded-sm border border-white/15 p-5 text-white transition-colors hover:border-gold-400"
          >
            <Mail aria-hidden className="size-5 text-gold-400" />
            <span className="min-w-0">
              <span className="block text-sm text-white/60">Email</span>
              <span className="block text-lg font-semibold break-words">{contact.email}</span>
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}

export function ValuesSection({ tone = "white" }: { tone?: "white" | "mist" | "paper" }) {
  return (
    <Section tone={tone} labelledBy="values-heading">
      <Container>
        <SectionHeading
          id="values-heading"
          eyebrow="Our values"
          title="The S.I.L.G.O. framework"
          intro="Five principles that guide how we advise, structure and deliver for our clients."
        />
        <ol className="mt-14 grid border-t border-navy-900/15 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => (
            <li
              key={v.letter}
              className={cn(
                "reveal border-b border-navy-900/15 py-8 sm:px-6 lg:border-b-0 lg:py-10",
                i % 2 === 1 && "sm:border-l",
                i > 0 && "lg:border-l",
                "lg:first:pl-0",
              )}
            >
              <span aria-hidden className="block font-serif text-6xl leading-none font-semibold text-gold-500">
                {v.letter}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-navy-900">{v.name}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate">{v.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="reveal group relative flex h-full flex-col rounded-sm border border-line bg-white p-7 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(16,36,58,0.35)] sm:p-8">
      <p className="text-sm font-semibold tracking-[0.12em] text-gold-700 uppercase">{project.practice}</p>
      <Heading className="mt-4 font-serif text-2xl leading-snug font-semibold text-navy-900">
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {project.client}
        </Link>
      </Heading>
      <p className="mt-2 text-base font-medium text-navy-800">{project.title}</p>
      <p className="mt-4 flex-1 text-base leading-relaxed text-slate">{project.summary}</p>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
        {project.figure ? (
          <div>
            <p className="text-sm text-muted">{project.figure.label}</p>
            <p className="font-serif text-2xl font-semibold text-navy-900">{project.figure.value}</p>
          </div>
        ) : (
          <p className="text-sm text-muted">{project.locations ?? "Case study"}</p>
        )}
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-gold-700 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </article>
  );
}

export function InsightCard({ insight, headingLevel = "h3" }: { insight: Insight; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="reveal group relative flex h-full flex-col border-t-2 border-navy-900 pt-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="font-semibold tracking-[0.12em] text-gold-700 uppercase">{insight.theme}</span>
        {insight.status === "outline" && (
          <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-muted">Outline · forthcoming</span>
        )}
      </div>
      <Heading className="mt-4 font-serif text-xl leading-snug font-semibold text-navy-900 sm:text-2xl">
        <Link
          href={`/insights/${insight.slug}`}
          className="decoration-gold-500 decoration-2 underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
        >
          {insight.title}
        </Link>
      </Heading>
      <p className="mt-3 flex-1 text-base leading-relaxed text-slate">{insight.summary}</p>
    </article>
  );
}

export function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <article className="reveal flex flex-col gap-6 border-t border-navy-900/15 pt-8 sm:flex-row">
      <div
        aria-hidden
        className="flex size-28 shrink-0 items-center justify-center rounded-sm border border-gold-500/50 bg-navy-900 font-serif text-2xl font-semibold tracking-[0.08em] text-gold-400"
      >
        {leader.initials}
      </div>
      <div>
        <h3 className="font-serif text-2xl font-semibold text-navy-900">{leader.name}</h3>
        <p className="mt-1 text-base font-medium text-gold-700">{leader.title}</p>
        <p className="mt-4 text-base leading-relaxed text-slate">{leader.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Areas of responsibility">
          {leader.focus.map((f) => (
            <li key={f} className="rounded-full bg-mist px-3 py-1 text-sm text-navy-800">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
