"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Download, Mail, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, profile, socials } from "@/content/profile";
import { cn, withBase } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo";
import { FacebookIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { useActiveSection } from "./use-active-section";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: lock page scroll, close on Escape / desktop resize, keep focus inside the header.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;
      const focusables = headerRef.current.querySelectorAll<HTMLElement>(
        "#mobile-menu a, #mobile-menu button, [data-menu-toggle]",
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && close();

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, close]);

  return (
    // The header itself never gets a backdrop-filter: that would make it the containing
    // block for the fixed-position mobile menu. Only the capsule is blurred.
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <ScrollProgress />
      <Container className="pt-3">
        <div
          className={cn(
            "flex h-14 items-center justify-between gap-4 rounded-full border pr-2 pl-3 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-4",
            scrolled || open
              ? "border-line bg-bg/70 shadow-[0_10px_40px_-18px_rgb(0_0_0/0.45)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        >
        <a
          href="#home"
          className="flex items-center gap-2.5 rounded-lg text-[15px] font-semibold tracking-tight text-fg"
          onClick={() => close()}
        >
          <LogoMark />
          {profile.name}
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative isolate rounded-full px-3 py-1.5 text-[13.5px] transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-surface-hover"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="hidden size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-hover hover:text-fg sm:inline-flex lg:hidden xl:inline-flex"
          >
            <GitHubIcon size={16} />
          </a>
          <a
            href={socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className="hidden size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-hover hover:text-fg sm:inline-flex lg:hidden xl:inline-flex"
          >
            <LinkedInIcon size={15} />
          </a>
          <ThemeToggle />
          <ButtonLink
            href={withBase(profile.resumePath)}
            download={profile.resumeFileName}
            variant="secondary"
            size="sm"
            className="ml-1.5 hidden sm:inline-flex"
          >
            Resume
            <Download size={13} aria-hidden className="text-muted" />
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            data-menu-toggle
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 inline-flex size-9 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-surface-hover lg:hidden"
          >
            {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
          </button>
        </div>
        </div>
      </Container>

      <AnimatePresence>
        {open ? <MobileMenu active={active} onNavigate={() => close()} /> : null}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({ active, onNavigate }: { active: string; onNavigate: () => void }) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => firstLinkRef.current?.focus(), []);

  return (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-x-3 top-[4.9rem] bottom-3 overflow-y-auto rounded-3xl border border-line bg-bg/95 shadow-[var(--shadow-lift)] backdrop-blur-xl sm:inset-x-6 lg:hidden"
    >
      <div className="flex min-h-full flex-col p-5 sm:p-6">
        <nav aria-label="Mobile">
          <ul className="divide-y divide-line">
            {navItems.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i, duration: 0.25 }}
              >
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={onNavigate}
                  aria-current={active === item.id ? "location" : undefined}
                  className="group flex items-center justify-between py-3.5"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={cn(
                        "text-xl font-medium tracking-tight transition-colors",
                        active === item.id ? "text-fg" : "text-muted group-hover:text-fg",
                      )}
                    >
                      {item.label}
                    </span>
                  </span>
                  {active === item.id ? <span className="size-1.5 rounded-full bg-accent" aria-hidden /> : null}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-5 pt-10">
          <ButtonLink
            href={withBase(profile.resumePath)}
            download={profile.resumeFileName}
            size="lg"
            className="w-full"
          >
            <Download size={16} aria-hidden />
            Download Resume
          </ButtonLink>
          <div className="grid grid-cols-4 gap-2">
            {[
              { href: socials.github.url, label: "GitHub", icon: <GitHubIcon size={16} /> },
              { href: socials.linkedin.url, label: "LinkedIn", icon: <LinkedInIcon size={15} /> },
              { href: socials.facebook.url, label: "Facebook", icon: <FacebookIcon size={15} /> },
              { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={16} aria-hidden /> },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-surface py-3 text-[11px] text-muted transition-colors hover:text-fg"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Thin reading-progress line along the top edge of the viewport. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
    />
  );
}
