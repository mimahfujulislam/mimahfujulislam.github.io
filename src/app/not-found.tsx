import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-dvh items-center">
      <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <Container className="max-w-xl text-center">
        <p className="font-mono text-[12px] tracking-[0.2em] text-subtle uppercase">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg">This page doesn’t exist.</h1>
        <p className="mt-4 text-muted">The link may be broken, or the page may have moved.</p>
        <ButtonLink href="/" className="mt-8">
          <ArrowLeft size={15} aria-hidden /> Back to the portfolio
        </ButtonLink>
      </Container>
    </main>
  );
}
