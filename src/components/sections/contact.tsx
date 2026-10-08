"use client";

import { ArrowUpRight, Check, CircleAlert, Copy, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";
import { profile, site, socials } from "@/content/profile";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";
import { FacebookIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Accent } from "@/components/ui/accent";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success"; text: string } | { kind: "error"; text: string };

const empty: Fields = { name: "", email: "", subject: "", message: "" };
const hasEndpoint = site.contactEndpoint.length > 0;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (values.message.trim().length < 10) errors.message = "Please write a message of at least 10 characters.";
  return errors;
}

const socialLinks = [
  { ...socials.linkedin, icon: <LinkedInIcon size={16} /> },
  { ...socials.github, icon: <GitHubIcon size={17} /> },
  { ...socials.facebook, icon: <FacebookIcon size={16} /> },
];

export function Contact() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!hasEndpoint) {
      const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
      setStatus({
        kind: "success",
        text: `Your email app should open with the message ready to send. If it doesn’t, write to ${profile.email}.`,
      });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(site.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setValues(empty);
      setStatus({ kind: "success", text: "Thank you — your message has been sent. I’ll get back to you soon." });
    } catch {
      setStatus({
        kind: "error",
        text: `Sorry, the message couldn’t be sent. Please email me directly at ${profile.email}.`,
      });
    }
  };

  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title={<>Let’s Build Something <Accent>Meaningful</Accent></>}
      lead="I’m open to conversations about internships, research opportunities, collaborations, software projects, and graduate study."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
        <div className="flex flex-col gap-3">
          <Reveal className="card spotlight rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <Mail size={18} strokeWidth={1.7} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10.5px] tracking-[0.16em] text-subtle uppercase">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="block truncate text-[15px] font-medium text-fg underline-offset-4 hover:underline sm:text-base"
                >
                  {profile.email}
                </a>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <a href={`mailto:${profile.email}`} className={buttonClasses({ size: "sm", className: "flex-1" })}>
                <Send size={13} aria-hidden /> Write an email
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className={buttonClasses({ variant: "secondary", size: "sm", className: "flex-1" })}
              >
                {copied ? <Check size={13} aria-hidden className="text-success" /> : <Copy size={13} aria-hidden />}
                {copied ? "Copied" : "Copy address"}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
          </Reveal>

          {socialLinks.map((link, i) => (
            <Reveal key={link.label} delay={0.05 * (i + 1)}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card edge-glow flex items-center gap-4 rounded-2xl px-5 py-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-colors group-hover:text-fg">
                  {link.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10.5px] tracking-[0.16em] text-subtle uppercase">
                    {link.label}
                  </span>
                  <span className="block truncate text-[14.5px] text-fg">{link.display}</span>
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="text-subtle transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <form ref={formRef} noValidate onSubmit={onSubmit} className="card rounded-2xl p-6 sm:p-8" aria-describedby="form-note">
            <h3 className="text-lg font-medium tracking-tight text-fg">Send a message</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" autoComplete="name" value={values.name} onChange={update("name")} error={errors.name} />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                onChange={update("email")}
                error={errors.email}
              />
              <Field
                className="sm:col-span-2"
                label="Subject"
                name="subject"
                value={values.subject}
                onChange={update("subject")}
                error={errors.subject}
              />
              <Field
                className="sm:col-span-2"
                label="Message"
                name="message"
                multiline
                value={values.message}
                onChange={update("message")}
                error={errors.message}
              />
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className={buttonClasses({ size: "lg", className: "sm:w-auto" })}
              >
                {status.kind === "sending" ? "Sending…" : "Send Message"}
                <Send size={15} aria-hidden />
              </button>
              <p id="form-note" className="text-[12.5px] leading-relaxed text-subtle">
                {hasEndpoint
                  ? "Your message is delivered through a form service."
                  : "This opens your email app with the message pre-filled — nothing is sent from this website."}
              </p>
            </div>

            <div aria-live="polite" className="empty:hidden">
              {status.kind === "success" || status.kind === "error" ? (
                <p
                  className={cn(
                    "mt-5 flex gap-2.5 rounded-xl border px-4 py-3 text-sm",
                    status.kind === "success"
                      ? "border-success/30 bg-success/[0.07] text-fg"
                      : "border-warning/30 bg-warning/[0.07] text-fg",
                  )}
                >
                  {status.kind === "success" ? (
                    <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-success" />
                  ) : (
                    <CircleAlert size={16} aria-hidden className="mt-0.5 shrink-0 text-warning" />
                  )}
                  {status.text}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

type FieldProps = {
  label: string;
  name: keyof Fields;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  multiline?: boolean;
  className?: string;
};

function Field({ label, name, value, onChange, error, type = "text", autoComplete, inputMode, multiline, className }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const control = cn(
    "mt-2 block w-full rounded-xl border bg-bg/60 px-4 py-3 text-base text-fg transition-[border-color,box-shadow] duration-200 placeholder:text-subtle/80 focus:outline-none focus-visible:outline-none focus:ring-4 sm:text-[15px]",
    error ? "border-warning/60 focus:border-warning focus:ring-warning/15" : "border-line-strong focus:border-accent/60 focus:ring-accent/15",
  );
  const shared = {
    id,
    name,
    value,
    onChange,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: control,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="text-[13px] font-medium text-fg/90">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={cn(control, "resize-y")} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} inputMode={inputMode} />
      )}
      {error ? (
        <p id={errorId} className="mt-1.5 text-[12.5px] text-warning">
          {error}
        </p>
      ) : null}
    </div>
  );
}
