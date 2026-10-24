import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/sections";
import { Container, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { contact, mapSearchUrl, offices } from "@/content/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Silgo Meta Limited. Executive office: Katsina House, Central Business District, Abuja. Operations hub: Plot 508, BUK Road, Kano. Telephone +234-906-8888-488.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Discuss a project"
        intro="Tell us about your objectives and we will arrange an initial conversation. You can also reach us directly by telephone or email."
        breadcrumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <Section tone="white" padding="py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="enquiry" className="font-serif text-3xl font-semibold text-navy-900">
              Send an enquiry
            </h2>
            <div className="mt-8">
              <ContactForm to={contact.email} />
            </div>
          </div>

          <aside className="space-y-10 lg:col-span-4 lg:col-start-9" aria-label="Contact details">
            <div>
              <h2 className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">Direct contact</h2>
              <ul className="mt-5 space-y-4 text-base">
                <li>
                  <a href={contact.phoneHref} className="flex items-center gap-3 font-semibold text-navy-900 hover:text-gold-700">
                    <Phone aria-hidden className="size-5 text-gold-700" />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 font-semibold text-navy-900 hover:text-gold-700">
                    <Mail aria-hidden className="size-5 text-gold-700" />
                    {contact.email}
                  </a>
                </li>
              </ul>
            </div>

            {offices.map((o) => (
              <div key={o.id} className="border-t border-line pt-8">
                <h2 className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">
                  {o.name} {o.role}
                </h2>
                <address className="mt-4 text-base leading-relaxed text-slate not-italic">
                  {o.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{o.region}</span>
                </address>
                <a
                  href={mapSearchUrl(o.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4"
                >
                  <MapPin aria-hidden className="size-4" />
                  Search address on Google Maps
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            ))}

            <div className="border-t border-line pt-8">
              <h2 className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">Email directory</h2>
              <dl className="mt-4 space-y-3 text-base">
                {contact.directory.map((d) => (
                  <div key={d.email}>
                    <dt className="text-sm text-muted">{d.label}</dt>
                    <dd>
                      <a href={`mailto:${d.email}`} className="break-words text-navy-900 hover:text-gold-700">
                        {d.email}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
