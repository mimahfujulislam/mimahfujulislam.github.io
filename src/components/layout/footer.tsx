import { ArrowUp, Mail } from "lucide-react";
import { navItems, profile, socials } from "@/content/profile";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo";
import { FacebookIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

const links = [
  { label: "GitHub", href: socials.github.url, icon: <GitHubIcon size={15} /> },
  { label: "LinkedIn", href: socials.linkedin.url, icon: <LinkedInIcon size={14} /> },
  { label: "Facebook", href: socials.facebook.url, icon: <FacebookIcon size={14} /> },
  { label: "Email", href: `mailto:${profile.email}`, icon: <Mail size={15} aria-hidden /> },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-fg">
              <LogoMark />
              {profile.name}
            </p>
            <p className="mt-4 font-mono text-[12px] leading-relaxed text-subtle">{profile.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[10.5px] tracking-[0.16em] text-subtle uppercase">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-muted transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10.5px] tracking-[0.16em] text-subtle uppercase">Connect</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-fg"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-subtle">© 2026 {profile.name}. All rights reserved.</p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 self-start rounded-full text-[13px] text-subtle transition-colors hover:text-fg sm:self-auto"
          >
            Back to top <ArrowUp size={13} aria-hidden />
          </a>
        </div>

        {/* signature wordmark — fills the content width and fades into the page edge */}
        <div aria-hidden className="pointer-events-none mt-10 -mb-[9%] select-none sm:-mb-[7%]">
          <svg viewBox="0 0 1000 150" className="block h-auto w-full text-fg">
            <defs>
              <linearGradient id="wordmark-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.2" />
                <stop offset="0.85" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <text
              x="500"
              y="124"
              textAnchor="middle"
              textLength="996"
              lengthAdjust="spacingAndGlyphs"
              fontSize="150"
              fontWeight="600"
              fill="url(#wordmark-fade)"
              className="font-sans"
            >
              {profile.name}
            </text>
          </svg>
        </div>
      </Container>
    </footer>
  );
}
