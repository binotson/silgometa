import { BadgeCheck, ShieldCheck } from "lucide-react";
import { CtaBand, DataTable, PageHero } from "@/components/sections";
import { Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { engagementGovernance, regulatoryPositioning } from "@/content/corporate";
import { company } from "@/content/site";

export const metadata = pageMetadata({
  title: "Governance & Compliance",
  description:
    "Engagement governance, professional standards and regulatory positioning of SILGO META LIMITED (RC No. 679305), an independent corporate advisory and strategic financial facilitation company.",
  path: "/governance",
});

const notDone = [
  "Accept public deposits",
  "Hold client investment funds",
  "Issue securities on behalf of clients",
  "Guarantee financing approvals",
  "Independently undertake activities reserved by law for licensed institutions",
];

export default function GovernancePage() {
  const [positioning, focus, notRepresent, , ...rest] = regulatoryPositioning.paragraphs;
  return (
    <>
      <PageHero
        eyebrow="Governance & compliance"
        title={engagementGovernance.title}
        intro={engagementGovernance.intro}
        breadcrumbs={[
          { href: "/about", label: "About" },
          { href: "/governance", label: "Governance & compliance" },
        ]}
      />

      <Section tone="white" labelledBy="framework-heading">
        <Container>
          <SectionHeading
            id="framework-heading"
            eyebrow="Engagement framework"
            title="What every mandate should identify"
            intro={engagementGovernance.tableIntro}
          />
          <DataTable
            className="mt-12"
            caption="Engagement components and descriptions"
            columns={[
              { key: "component", label: "Engagement component" },
              { key: "description", label: "Description" },
            ]}
            rows={[...engagementGovernance.rows]}
          />
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-slate">{engagementGovernance.fees}</p>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="regulatory-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="regulatory-heading" eyebrow="Regulatory positioning" title={regulatoryPositioning.title} />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-slate lg:col-span-7">
            <p>{positioning}</p>
            <p>{focus}</p>
            <p>{notRepresent}</p>
            <div className="rounded-sm border border-line bg-surface p-6">
              <p className="flex items-center gap-3 text-base font-semibold text-navy-900">
                <ShieldCheck aria-hidden className="size-5 text-gold-700" />
                Silgo Meta Limited does not:
              </p>
              <ul className="mt-4 space-y-2 text-base text-slate">
                {notDone.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-gold-500" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="registration-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="registration-heading" eyebrow="Corporate registration" title="Company registration" />
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-sm border border-line bg-paper p-8">
              <BadgeCheck aria-hidden className="size-7 text-gold-700" />
              <p className="mt-5 font-serif text-2xl font-semibold text-navy-900">
                {company.legalName} · {company.rcLabel}
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate">{company.registration}</p>
              <p className="mt-5 border-t border-line pt-5 text-base leading-relaxed text-slate">
                {company.registrationDistinction} Where a transaction requires regulated services, those services are
                performed by appropriately licensed and authorized institutions.
              </p>
              <TextLink href="/leadership" className="mt-6 text-base">
                Leadership
              </TextLink>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
