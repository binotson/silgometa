"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/components/ui";
import { contact, mainNav } from "@/content/site";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu after navigation (derived during render, no effect needed).
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-inverse focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link href="/" aria-label="SILGO META LIMITED — home" className="shrink-0 rounded-sm">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-sm px-3 py-2 text-[0.95rem] font-medium transition-colors",
                        active ? "text-navy-900" : "text-slate hover:text-navy-900",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3 -bottom-px h-0.5 bg-gold-500 transition-opacity",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden min-h-11 items-center rounded-sm bg-primary px-5 text-[0.95rem] font-semibold text-on-primary transition-colors hover:bg-primary-hover sm:inline-flex"
            >
              Discuss a Project
            </Link>
            <button
              ref={buttonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-sm border border-line text-navy-900 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => {
                setOpenedAt(pathname);
                setOpen((v) => !v);
              }}
            >
              {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise contain this fixed panel. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper sm:top-20 lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <ul className="divide-y divide-line border-y border-line">
            {[{ href: "/", label: "Home" }, ...mainNav, { href: "/contact", label: "Contact" }].map((item) => {
              const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-4 font-serif text-xl",
                      active ? "font-semibold text-navy-900" : "text-navy-900/85",
                    )}
                  >
                    {item.label}
                    {active && <span aria-hidden className="size-1.5 rounded-full bg-gold-500" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 flex min-h-12 items-center justify-center rounded-sm bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover"
          >
            Discuss a Project
          </Link>
          <div className="mt-8 space-y-2 text-base">
            <a href={contact.phoneHref} className="block text-slate hover:text-navy-900">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="block text-slate hover:text-navy-900">
              {contact.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
