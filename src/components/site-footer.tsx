import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";
import { regulatoryPositioning } from "@/content/corporate";
import { company, contact, offices } from "@/content/site";
import { services } from "@/content/services";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/corporate-overview", label: "Corporate overview" },
  { href: "/leadership", label: "Leadership" },
  { href: "/governance", label: "Governance & compliance" },
  { href: "/sectors", label: "Sector solutions" },
  { href: "/process", label: "Our process" },
  { href: "/projects", label: "Projects" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="SILGO META LIMITED — home" className="inline-block rounded-sm">
              <Logo onDark />
            </Link>
            <p className="mt-6 max-w-sm font-serif text-lg leading-snug text-white">{company.tagline}</p>
            <p className="mt-3 text-sm font-semibold tracking-[0.12em] text-gold-400 uppercase">{company.rcLabel}</p>
            <div className="mt-6 space-y-2 text-base">
              <a href={contact.phoneHref} className="block text-white hover:text-gold-300">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="block text-white hover:text-gold-300">
                {contact.email}
              </a>
            </div>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-gold-400 uppercase">Services</h2>
            <ul className="mt-5 space-y-3 text-base">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services/commercial-paper-advisory" className="hover:text-white">
                  Commercial Paper Advisory
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-gold-400 uppercase">Company</h2>
            <ul className="mt-5 space-y-3 text-base">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-gold-400 uppercase">Offices</h2>
            <div className="mt-5 space-y-6 text-base">
              {offices.map((o) => (
                <address key={o.id} className="not-italic">
                  <span className="block font-semibold text-white">
                    {o.name} — {o.role}
                  </span>
                  {o.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{o.region}</span>
                </address>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-5xl text-sm leading-relaxed text-white/60">
            {regulatoryPositioning.short}{" "}
            <Link href="/governance" className="text-white/80 underline decoration-gold-500 underline-offset-4 hover:text-white">
              Governance &amp; compliance
            </Link>
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {company.legalName} · {company.rcLabel} · Registered with the Corporate Affairs
            Commission, Nigeria
          </p>
          <Link href="/privacy" className="shrink-0 hover:text-white">
            Privacy notice
          </Link>
        </div>
      </Container>
    </footer>
  );
}
