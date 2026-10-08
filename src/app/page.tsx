import { schooling } from "@/content/education";
import { profile, site, socials } from "@/content/profile";
import { researchAreas } from "@/content/research";
import { Hero } from "@/components/hero/hero";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { OpenSource } from "@/components/sections/open-source";
import { QuickStats } from "@/components/sections/quick-stats";
import { Research } from "@/components/sections/research";
import { ResumeCta } from "@/components/sections/resume-cta";
import { Skills } from "@/components/sections/skills";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: site.url,
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    url: site.url,
    email: `mailto:${profile.email}`,
    jobTitle: "Computer Science and Engineering Undergraduate",
    description: site.description,
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: profile.university.name, url: profile.university.url },
      ...schooling.map((s) => ({ "@type": "EducationalOrganization", name: s.institution })),
    ],
    knowsAbout: researchAreas.map((a) => a.title),
    sameAs: [socials.github.url, socials.linkedin.url, socials.facebook.url],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <QuickStats />
        <About />
        <Skills />
        <Research />
        <OpenSource />
        <Experience />
        <Education />
        <ResumeCta />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
