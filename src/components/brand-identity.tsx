import { LinePattern } from "@/components/sections";
import { brandIdentity } from "@/content/corporate";

/**
 * The name philosophy as two halves: SIL·GO (silver & gold: tangible value,
 * real capital) on a warm light panel, META (technology, the digital frontier)
 * on the navy brand panel.
 */
export function BrandIdentityPanel() {
  const { silgo, meta } = brandIdentity;
  return (
    <div className="grid overflow-hidden rounded-sm border border-line md:grid-cols-2">
      <article className="relative bg-paper p-8 sm:p-10 lg:p-12">
        <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-silver-400 via-gold-300 to-gold-500" />
        <p className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">{silgo.meaning}</p>
        <h3 className="mt-4 font-serif text-5xl leading-none font-bold tracking-[0.08em] sm:text-6xl">
          <span className="text-[#6f6c79] dark:text-silver-400">SIL</span>
          <span aria-hidden className="text-gold-500">·</span>
          <span className="text-gold-700">GO</span>
          <span className="sr-only"> — Silver and Gold</span>
        </h3>
        <dl aria-hidden className="mt-3 flex gap-6 text-xs font-semibold tracking-[0.2em] uppercase">
          <div className="text-[#6f6c79] dark:text-silver-400">
            <dt className="sr-only">SIL</dt>
            <dd>Silver</dd>
          </div>
          <div className="text-gold-700">
            <dt className="sr-only">GO</dt>
            <dd>Gold</dd>
          </div>
        </dl>
        <p className="mt-8 font-serif text-xl text-navy-900">{silgo.theme}</p>
        <p className="mt-3 text-base leading-relaxed text-slate">{silgo.text}</p>
        <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">{silgo.services}</p>
      </article>

      <article className="relative overflow-hidden bg-inverse p-8 text-white sm:p-10 lg:p-12">
        <LinePattern className="top-0 right-0 h-full w-full opacity-70" />
        <div className="relative">
          <p className="text-sm font-semibold tracking-[0.14em] text-gold-400 uppercase">{meta.meaning}</p>
          <h3 className="mt-4 font-serif text-5xl leading-none font-bold tracking-[0.08em] text-white sm:text-6xl">
            {meta.label}
          </h3>
          <p aria-hidden className="mt-3 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            Digital · Future
          </p>
          <p className="mt-8 font-serif text-xl text-white">{meta.theme}</p>
          <p className="mt-3 text-base leading-relaxed text-white/75">{meta.text}</p>
          <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-relaxed text-white/60">{meta.services}</p>
        </div>
      </article>
    </div>
  );
}
