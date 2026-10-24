import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-paper">
      <Container className="py-24 sm:py-32">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-5 max-w-2xl font-serif text-4xl font-semibold text-navy-900 sm:text-5xl">
          We could not find that page
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
          The page may have moved, or the link may be incorrect. Try one of the pages below.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/" arrow>
            Return home
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            Our services
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
