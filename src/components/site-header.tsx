"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/components/ui";
import { contact, mainNav, type NavItem } from "@/content/site";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const itemActive = (pathname: string, item: NavItem) =>
  isActive(pathname, item.href) || (item.children ?? []).some((c) => isActive(pathname, c.href));

/** Desktop dropdown (disclosure pattern): opens on click, keyboard or hover. */
function NavDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = itemActive(pathname, item);

  // Close after navigation (derived during render, no effect needed).
  if (open && openedAt !== pathname) setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const show = () => {
    setOpenedAt(pathname);
    setOpen(true);
  };

  return (
    <li
      ref={rootRef}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? setOpen(false) : show())}
        className={cn(
          "relative inline-flex items-center gap-1 rounded-sm px-2.5 py-2 text-[0.95rem] font-medium transition-colors xl:px-3",
          active ? "text-navy-900" : "text-slate hover:text-navy-900",
        )}
      >
        {item.label}
        <ChevronDown aria-hidden className={cn("size-4 transition-transform", open && "rotate-180")} />
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-2.5 -bottom-px h-0.5 bg-gold-500 transition-opacity xl:inset-x-3",
            active ? "opacity-100" : "opacity-0",
          )}
        />
      </button>
      <div id={panelId} hidden={!open} className="absolute top-full left-0 z-50 pt-3">
        <ul className="w-[22rem] overflow-hidden rounded-sm border border-line bg-paper py-2 shadow-[0_18px_40px_-20px_rgba(16,36,58,0.45)]">
          {item.children?.map((child) => {
            const current = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block border-l-2 px-5 py-2.5 transition-colors hover:bg-mist",
                    current ? "border-gold-500 bg-mist" : "border-transparent",
                  )}
                >
                  <span className="block text-[0.95rem] font-semibold text-navy-900">{child.label}</span>
                  {child.description && <span className="mt-0.5 block text-sm text-muted">{child.description}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

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

  const mobileItems: NavItem[] = [
    { href: "/", label: "Home" },
    ...mainNav,
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-inverse focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link href="/" aria-label="SILGO META LIMITED — home" className="shrink-0 rounded-sm">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {mainNav.map((item) => {
                if (item.children) return <NavDropdown key={item.href} item={item} pathname={pathname} />;
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-sm px-2.5 py-2 text-[0.95rem] font-medium whitespace-nowrap transition-colors xl:px-3",
                        active ? "text-navy-900" : "text-slate hover:text-navy-900",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-2.5 -bottom-px h-0.5 bg-gold-500 transition-opacity xl:inset-x-3",
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
            {/* On very narrow phones the toggle moves into the menu panel. */}
            <ThemeToggle className="max-[359px]:hidden" />
            <Link
              href="/contact"
              className="hidden min-h-11 items-center rounded-sm bg-primary px-5 text-[0.95rem] font-semibold whitespace-nowrap text-on-primary transition-colors hover:bg-primary-hover sm:inline-flex lg:max-xl:px-4"
            >
              <span className="lg:max-xl:hidden">Discuss a Project</span>
              <span className="hidden lg:max-xl:inline">Contact</span>
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
            {mobileItems.map((item) => {
              if (item.children) {
                return (
                  <li key={item.href} className="py-4">
                    <p className="text-sm font-semibold tracking-[0.14em] text-gold-700 uppercase">{item.label}</p>
                    <ul className="mt-2 border-l border-line pl-4">
                      {item.children.map((child) => {
                        const active = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={active ? "page" : undefined}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center justify-between gap-4 py-2.5 text-lg",
                                active ? "font-semibold text-navy-900" : "text-navy-900/85",
                              )}
                            >
                              {child.label}
                              {active && <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-gold-500" />}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
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
          <div className="mt-8 flex items-center gap-3 text-base text-slate min-[360px]:hidden">
            <ThemeToggle />
            Light / dark theme
          </div>
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
