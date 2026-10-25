"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <h1 className="max-w-2xl font-serif text-4xl font-semibold text-navy-900 sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-navy-900/20 px-6 font-semibold text-navy-900 hover:border-navy-900"
          >
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
