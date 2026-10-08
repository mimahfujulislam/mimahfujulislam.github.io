import { Download, FileText } from "lucide-react";
import { profile, socials } from "@/content/profile";
import { withBase } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Accent } from "@/components/ui/accent";

export function ResumeCta() {
  return (
    <section aria-labelledby="resume-heading" className="py-10 sm:py-16">
      <Container>
        <Reveal>
          <div className="gradient-border relative isolate overflow-hidden rounded-3xl border border-line bg-bg-elevated px-6 py-12 sm:px-12 sm:py-16">
            <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_top_right,#000_10%,transparent_65%)]" />
            <div
              aria-hidden
              className="absolute -top-32 -right-24 -z-10 size-[460px] rounded-full bg-[radial-gradient(closest-side,var(--glow-1),transparent)]"
            />
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-accent">
                  <FileText size={18} strokeWidth={1.7} aria-hidden />
                </span>
                <h2
                  id="resume-heading"
                  className="mt-6 text-[1.75rem] leading-tight font-semibold tracking-[-0.025em] text-balance text-fg sm:text-4xl"
                >
                  Want to know more about <Accent>my work?</Accent>
                </h2>
                <p className="mt-4 leading-relaxed text-pretty text-muted sm:text-lg">
                  Download my resume to explore my academic background, projects, research interests, and technical
                  experience.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <ButtonLink href={withBase(profile.resumePath)} download={profile.resumeFileName} size="lg">
                  <Download size={16} aria-hidden />
                  Download Resume
                </ButtonLink>
                <ButtonLink href={socials.linkedin.url} external variant="secondary" size="lg">
                  <LinkedInIcon size={15} />
                  View LinkedIn
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
