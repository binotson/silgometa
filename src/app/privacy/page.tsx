import { PageHero } from "@/components/sections";
import { Container, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { company, contact } from "@/content/site";

export const metadata = pageMetadata({
  title: "Privacy Notice",
  description: "How Silgo Meta Limited handles personal information submitted through this website.",
  path: "/privacy",
});

/* Plain-language notice describing the site's actual data handling. Client to have it reviewed by counsel. */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy notice"
        breadcrumbs={[{ href: "/privacy", label: "Privacy" }]}
      />
      <Section tone="white" padding="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="prose-silgo max-w-[68ch]">
            <p>
              This notice explains how {company.legalName} (&ldquo;Silgo Meta&rdquo;, &ldquo;we&rdquo;) handles
              personal information submitted through this website.
            </p>
            <h2>Information we collect</h2>
            <p>
              When you use the enquiry form, we collect the details you provide: your name, email address, and
              optionally your organization and telephone number, together with the type of enquiry and your message.
            </p>
            <p>
              This website does not use advertising or analytics cookies. Our hosting provider may keep standard
              technical logs, such as IP addresses, for security and reliability purposes.
            </p>
            <h2>How we use it</h2>
            <ul>
              <li>To respond to your enquiry and arrange any follow-up conversation.</li>
              <li>To protect the website and the enquiry form against spam and abuse.</li>
            </ul>
            <p>We do not sell your personal information or use it for unrelated marketing.</p>
            <h2>Sharing</h2>
            <p>
              Enquiries are delivered to our team by email through a service provider acting on our behalf. We do not
              otherwise share your information unless required by law.
            </p>
            <h2>Your choices</h2>
            <p>
              You may ask us to access, correct or delete the personal information you have sent us, in line with
              applicable Nigerian data protection law. Please write to{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
