/** Serif-italic gradient word used inside headings, e.g. “Technical <Accent>Skills</Accent>”. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="accent-serif text-[1.08em] leading-none">{children}</span>;
}
