import { PracticeMedia } from "@/components/media";
import { CtaBand, PageHero } from "@/components/sections";
import { Container, Section, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { services } from "@/content/services";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Strategic capital access and funding facilitation, capital markets readiness and transaction advisory, corporate finance, technology and infrastructure advisory, and institutional capacity building.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Connecting enterprise to capital"
        intro="Five service pillars, led by strategic capital access, plus a complementary strategy practice. They can be engaged individually or together, depending on the scope of your mandate."
        breadcrumbs={[{ href: "/services", label: "Services" }]}
      />

      <Section tone="white" padding="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <div className="divide-y divide-line">
            {services.map((s) => (
              <section
                key={s.slug}
                aria-labelledby={`${s.slug}-heading`}
                className="reveal grid gap-8 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20"
              >
                <div className="lg:col-span-5">
                  <p aria-hidden className="font-serif text-5xl font-semibold text-gold-500">
                    {s.number}
                  </p>
                  {s.kicker && (
                    <p className="mt-3 text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">{s.kicker}</p>
                  )}
                  <h2
                    id={`${s.slug}-heading`}
                    className="mt-4 font-serif text-3xl leading-tight font-semibold text-navy-900 sm:text-4xl"
                  >
                    {s.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-slate">{s.intro}</p>
                  <TextLink href={`/services/${s.slug}`} className="mt-7">
                    <span>
                      View service <span className="sr-only">{s.title}</span>
                    </span>
                  </TextLink>
                </div>
                <div className="lg:col-span-7">
                  <PracticeMedia slug={s.slug} className="mb-8 aspect-[16/7]" />
                  <h3 className="text-sm font-semibold tracking-[0.14em] text-muted uppercase">Services include</h3>
                  <ul className="mt-5 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                    {s.offerings.map((o) => (
                      <li key={o.name} className="bg-paper p-5 text-base font-medium text-navy-900">
                        {o.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-sm border border-gold-500/50 bg-paper p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">Commercial Paper Advisory</h2>
              <p className="mt-2 text-base leading-relaxed text-slate">
                Preliminary eligibility, funding requirement evaluation and introductions to licensed fund arrangers
                and issuing houses.
              </p>
            </div>
            <TextLink href="/services/commercial-paper-advisory" className="shrink-0">
              Commercial Paper Advisory
            </TextLink>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
