import { GraduationCap, Briefcase } from "lucide-react";
import { PageHero } from "@/components/sections";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { contact } from "@/content/site";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Careers at Silgo Meta Limited: graduate analyst programmes and experienced advisory associates across finance, policy, law, real estate and software architecture.",
  path: "/careers",
});

const programmes = [
  {
    icon: GraduationCap,
    title: "Graduate Analyst Programs",
    text: "For graduates beginning their careers in advisory, research and transaction support.",
  },
  {
    icon: Briefcase,
    title: "Experienced Advisory Associates",
    text: "For professionals with relevant experience who can contribute to client mandates from day one.",
  },
];

const talentAreas = [
  "Finance",
  "Information management",
  "Political economy",
  "Corporate law",
  "Real estate advisory",
  "Software architecture",
];

const culture = [
  { title: "Performance-driven", text: "Clear expectations and ownership of results for clients." },
  { title: "Collaborative", text: "Work across practice areas, with colleagues and partners." },
  { title: "Ethical", text: "Integrity and compliance at the centre of how we work." },
  { title: "Development-focused", text: "Learning and growth built into every role." },
];

const careersMailto = `mailto:${contact.email}?subject=${encodeURIComponent("Careers enquiry")}`;

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career in strategic advisory"
        intro="Silgo Meta is interested in talented people who want to work at the intersection of finance, strategy, technology and governance."
        breadcrumbs={[{ href: "/careers", label: "Careers" }]}
      />

      <Section tone="white" labelledBy="programmes-heading">
        <Container>
          <SectionHeading
            id="programmes-heading"
            eyebrow="Talent development"
            title="Pathways we are developing"
            intro="Opportunities are subject to confirmation and are announced when available. No specific vacancies are currently advertised on this page."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {programmes.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-sm border border-line bg-paper p-8">
                <Icon aria-hidden className="size-7 text-gold-700" />
                <h3 className="mt-5 font-serif text-2xl font-semibold text-navy-900">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate">{text}</p>
                <p className="mt-5 text-sm font-medium text-muted">Status: subject to confirmation</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="areas-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="areas-heading"
              eyebrow="Talent areas"
              title="Disciplines we look for"
              intro="Our work draws on a wide range of professional backgrounds."
            />
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {talentAreas.map((a) => (
              <li key={a} className="bg-surface p-6 text-lg font-medium text-navy-900">
                {a}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" labelledBy="culture-heading">
        <Container>
          <SectionHeading id="culture-heading" eyebrow="Our culture" title="How we work" />
          <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {culture.map((c) => (
              <div key={c.title} className="border-t-2 border-gold-500 pt-5">
                <dt className="text-xl font-semibold text-navy-900">{c.title}</dt>
                <dd className="mt-2 text-base leading-relaxed text-slate">{c.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="navy" labelledBy="careers-enquiry">
        <Container className="max-w-3xl text-center">
          <h2 id="careers-enquiry" className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Register your interest
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Send a short note about your background and the area you are interested in. Please do not send sensitive
            personal documents until we request them.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink href="/contact" variant="gold" arrow>
              Careers enquiry form
            </ButtonLink>
            <a
              href={careersMailto}
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:border-white"
            >
              Email {contact.email}
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
