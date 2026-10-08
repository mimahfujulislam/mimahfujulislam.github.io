"use client";

import { motion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { profile, socials } from "@/content/profile";
import { withBase } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { DecodeText } from "@/components/ui/decode-text";
import { Marquee } from "@/components/ui/marquee";
import { NeuralField } from "@/components/effects/neural-field";
import { HeroVisual } from "./hero-visual";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const focusAreas = [
  "Machine Learning",
  "Explainable AI",
  "Data Science",
  "Generative AI",
  "Natural Language Processing",
  "Computer Vision",
  "Healthcare AI",
  "Research",
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, ease, delay },
});

export function Hero() {
  const leadWords = profile.headline.lead.split(" ");

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative isolate overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute inset-0">
          <div className="absolute top-[-18%] left-1/2 h-[560px] w-[min(1000px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-1),transparent)]" />
          <div className="absolute top-[18%] right-[-12%] h-[440px] w-[560px] rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)]" />
        </div>
        <NeuralField className="[mask-image:radial-gradient(ellipse_80%_70%_at_50%_38%,#000_30%,transparent_100%)]" />
      </div>

      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <h1 id="hero-heading">
            <motion.span
              {...fadeUp(0)}
              className="flex items-center gap-3 font-mono text-[12px] tracking-[0.2em] text-subtle uppercase"
            >
              <span aria-hidden className="h-px w-8 bg-accent" />
              <span>
                <DecodeText text={profile.name} />
                <span className="text-line-strong"> / </span>
                <span className="text-muted">CSE · {profile.university.short}</span>
              </span>
            </motion.span>
            <span className="mt-5 block text-[2.45rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance text-fg sm:text-[3.4rem] lg:text-[3.85rem]">
              {leadWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.045 }}
                >
                  {word}
                  {" "}
                </motion.span>
              ))}
              <motion.span
                className="text-gradient inline font-serif text-[1.08em] font-normal tracking-[-0.01em] italic"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease, delay: 0.1 + leadWords.length * 0.045 }}
              >
                {profile.headline.highlight}
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...fadeUp(0.45)}
            className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-[17px]"
          >
            {profile.intro}
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#research" size="lg">
              View My Work
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink
              href={withBase(profile.resumePath)}
              download={profile.resumeFileName}
              variant="secondary"
              size="lg"
            >
              <Download size={16} aria-hidden />
              Download Resume
            </ButtonLink>
          </motion.div>

          <motion.ul
            {...fadeUp(0.65)}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
            aria-label="Elsewhere"
          >
            <li>
              <a
                href={socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-fg"
              >
                <GitHubIcon size={15} /> GitHub
              </a>
            </li>
            <li>
              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-fg"
              >
                <LinkedInIcon size={14} /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-fg">
                <Mail size={15} aria-hidden /> Email
              </a>
            </li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
        >
          <HeroVisual />
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-16 border-y border-line bg-surface/60 py-4 sm:mt-24 sm:py-5"
      >
        <Marquee items={focusAreas} label="Focus areas" />
      </motion.div>
    </section>
  );
}
