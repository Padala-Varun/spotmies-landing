"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, LoaderCircle, Mail, MapPin, Phone, Send, Briefcase } from "lucide-react";
import { Eyebrow } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { MaskWord, maskParent, Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { countryCodes, projectTypes, site } from "@/lib/content";
import { cn, EASE } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { timeZone: site.timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"} IST</span>;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {}
      }}
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}

const field =
  "w-full rounded-2xl border border-line bg-white/[0.03] px-4 py-3.5 text-[15px] text-fg placeholder:text-dim outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:border-accent/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(0,238,249,0.08)]";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [types, setTypes] = useState<string[]>([]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const phoneNumber = String(fd.get("phone") ?? "").trim();
    const phone = phoneNumber ? `${fd.get("code")} ${phoneNumber}` : "";

    const next: Errors = {};
    if (name.length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (message.length < 10) next.message = "A sentence or two about your project helps us reply faster.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const payload = { name, email, phone, message, projectTypes: types };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 503) {
        // No delivery endpoint configured: hand off to the visitor's email app instead.
        const body = [message, "", types.length ? `Project: ${types.join(", ")}` : "", phone ? `Phone: ${phone}` : "", `— ${name} (${email})`]
          .filter(Boolean)
          .join("\n");
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
        setStatus("mailto");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <motion.div
        className="flex min-h-[520px] flex-col items-start justify-center gap-5 p-8 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        role="status"
      >
        <span className="grid size-14 place-items-center rounded-full bg-accent text-black shadow-[0_0_40px_rgba(0,238,249,0.6)]">
          <Check className="size-6" />
        </span>
        <h3 className="text-3xl font-medium tracking-tight">
          {status === "sent" ? "Message received." : "Almost there."}
        </h3>
        <p className="max-w-sm text-muted">
          {status === "sent"
            ? "Thanks for reaching out — the team will get back to you shortly."
            : "We've opened your email app with your message filled in. Hit send and we'll reply shortly."}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="text-sm text-accent underline-offset-4 hover:underline">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 p-6 md:p-10">
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm text-muted">What are you building?</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((t) => {
            const on = types.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTypes((prev) => (on ? prev.filter((x) => x !== t) : [...prev, t]))}
                aria-pressed={on}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                  on ? "border-accent bg-accent text-black" : "border-line text-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-muted">
            Name <span className="text-accent">*</span>
          </span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            className={cn(field, errors.name && "border-red-400/60")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {errors.name ? (
            <span id="err-name" className="text-xs text-red-300">
              {errors.name}
            </span>
          ) : null}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-muted">
            Email <span className="text-accent">*</span>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={cn(field, errors.email && "border-red-400/60")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email ? (
            <span id="err-email" className="text-xs text-red-300">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted" id="phone-label">
          Phone <span className="text-dim">(optional)</span>
        </span>
        <div className="flex gap-2">
          <select name="code" aria-label="Country code" className={cn(field, "w-[96px] shrink-0 appearance-none bg-surface-2 text-center")} defaultValue="+91">
            {countryCodes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input name="phone" type="tel" autoComplete="tel-national" placeholder="98765 43210" className={field} aria-labelledby="phone-label" />
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-muted">
          Project details <span className="text-accent">*</span>
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your idea, timeline and goals…"
          className={cn(field, "resize-none", errors.message && "border-red-400/60")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message ? (
          <span id="err-message" className="text-xs text-red-300">
            {errors.message}
          </span>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group/send mt-2 flex items-center justify-center gap-3 rounded-full bg-fg py-4 font-medium text-black transition-[box-shadow,transform] duration-500 hover:shadow-[0_0_50px_-8px_rgba(0,238,249,0.7)] active:scale-[0.99] disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="size-4 transition-transform duration-500 group-hover/send:-translate-y-0.5 group-hover/send:translate-x-1" />
          </>
        )}
      </button>
      <AnimatePresence>
        {status === "error" ? (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-red-300"
            role="alert"
          >
            Something went wrong. Please email us at{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

export function Contact() {
  const channels = [
    { icon: Mail, label: "Email us", value: site.email, href: `mailto:${site.email}`, extra: <CopyEmail /> },
    { icon: Phone, label: "Call us", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: Briefcase, label: "Hiring", value: site.hiringPhone, href: `tel:${site.hiringPhone.replace(/\s/g, "")}` },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[900px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(0,238,249,0.11),transparent)] [mask-image:linear-gradient(to_bottom,transparent,#000_40%)]" />
      <div className="shell relative">
        <Eyebrow index="11">Contact</Eyebrow>
        <motion.h2
          variants={maskParent}
          custom={0.07}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-6 max-w-5xl text-[clamp(2.75rem,7.5vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]"
          aria-label="Let's build something extraordinary."
        >
          <span aria-hidden>
            <MaskWord>Let&apos;s</MaskWord> <MaskWord>build</MaskWord> <MaskWord>something</MaskWord>{" "}
            <MaskWord className="font-serif font-normal italic text-accent">extraordinary.</MaskWord>
          </span>
        </motion.h2>

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
                Whether you need to modernize your infrastructure, scale your platform or build from scratch — we&apos;re
                ready to help.
              </p>
            </Reveal>

            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {channels.map((c, i) => (
                <Reveal key={c.label} as="li" delay={i * 0.06} y={16}>
                  <div className="flex items-center gap-4 py-5">
                    <span className="grid size-11 place-items-center rounded-full border border-line text-accent">
                      <c.icon className="size-4" />
                    </span>
                    <a href={c.href} className="group/ch flex flex-1 flex-col">
                      <span className="text-xs text-muted">{c.label}</span>
                      <span className="text-lg font-medium transition-colors group-hover/ch:text-accent">{c.value}</span>
                    </a>
                    {c.extra}
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.15}>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group/map relative block overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-line-strong"
              >
                <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:14px_14px]" />
                <div className="pointer-events-none absolute right-10 top-8 size-24 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-accent/15 text-accent">
                    <MapPin className="size-5" />
                  </span>
                  <span className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fg">
                    <span className="relative flex size-1.5">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                      <span className="relative size-1.5 rounded-full bg-accent" />
                    </span>
                    <LocalTime />
                  </span>
                </div>
                <p className="relative mt-8 text-xl font-medium">{site.city}</p>
                <address className="relative mt-2 text-sm not-italic leading-relaxed text-muted">
                  {site.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <span className="relative mt-5 inline-flex items-center gap-1 text-sm text-accent">
                  Open in Maps <ArrowUpRight className="size-4 transition-transform group-hover/map:-translate-y-0.5 group-hover/map:translate-x-0.5" />
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.2} className="flex gap-3">
              {site.socials.map((s) => (
                <Magnetic key={s.label} strength={0.4}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid size-12 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-black"
                    aria-label={s.label}
                  >
                    <SocialIcon name={s.label} className="size-4" />
                  </a>
                </Magnetic>
              ))}
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <SpotlightCard tilt={false} className="bg-surface/80">
              <div className="relative z-10">
                <ContactForm />
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
