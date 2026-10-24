import { CtaBand, LeaderCard, PageHero } from "@/components/sections";
import { Container, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { leaders, values } from "@/content/site";

export const metadata = pageMetadata({
  title: "Leadership & Governance",
  description:
    "Meet the leadership of Silgo Meta Limited: M. D. Ahmad, Chief Executive Officer & Strategic Partner, and Fadil Murtala Usman, Chief Operating Officer & Strategic Advisory Lead.",
  path: "/leadership",
});

const integrity = values.find((v) => v.letter === "I");

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership & governance"
        title="Leadership"
        intro="Silgo Meta's leadership sets the firm's strategic direction and oversees the delivery of every mandate."
        breadcrumbs={[{ href: "/leadership", label: "Leadership" }]}
      />

      <Section tone="white" labelledBy="executive-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="executive-heading" eyebrow="Executive leadership" title="Our leadership team" />
          </div>
          <div className="space-y-12 lg:col-span-8">
            {leaders.map((l) => (
              <LeaderCard key={l.name} leader={l} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="governance-heading">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="governance-heading"
              eyebrow="Governance"
              title="Integrity in how we advise and structure"
            />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-slate lg:col-span-7">
            <p>
              Integrity is one of the five values in our S.I.L.G.O. framework: {integrity?.text.toLowerCase()} It
              guides how we approach every engagement.
            </p>
            <p>
              Where mandates involve regulated activities, such as capital-market issuances, we work alongside the
              appropriate licensed parties and regulatory processes rather than in place of them.
            </p>
            <p className="text-base text-muted">
              Details of the board and senior advisers will be published here once confirmed.
            </p>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
