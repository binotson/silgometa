import { PracticeMedia } from "@/components/media";
import { CtaBand, PageHero } from "@/components/sections";
import { Container, Section, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { services } from "@/content/services";

export const metadata = pageMetadata({
  title: "Services & Practice Areas",
  description:
    "Corporate deal structuring and capital markets, strategic and marketing consultancy, infrastructure and technology solutions, and business consulting and capacity building.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & practice areas"
        title="Advisory across finance, strategy, technology and institutions"
        intro="Four practice areas that can be engaged individually or together, depending on the scope of your mandate."
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
                  <h2
                    id={`${s.slug}-heading`}
                    className="mt-4 font-serif text-3xl leading-tight font-semibold text-navy-900 sm:text-4xl"
                  >
                    {s.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-slate">{s.intro}</p>
                  <TextLink href={`/services/${s.slug}`} className="mt-7">
                    <span>
                      View practice area <span className="sr-only">{s.title}</span>
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
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
