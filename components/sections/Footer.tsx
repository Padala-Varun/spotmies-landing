import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { nav, site } from "@/lib/content";
import { BackToTop, Wordmark } from "./FooterClient";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const company = [
  { label: "About us", href: site.external.about },
  { label: "Careers", href: site.external.careers },
  { label: "Blog", href: site.external.blog },
  { label: "Privacy policy", href: site.external.privacy },
];

export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-4">
          <Image src="/brand/logo.png" alt="Spotmies" width={3330} height={741} className="h-9 w-auto self-start" />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Spotmies is a technology-driven product studio that helps businesses plan, design, build and deliver
            impactful digital products — specializing in AI & ML, Blockchain and modern web platforms.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-6">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim">Explore</p>
            {[...nav, { label: "Contact", href: "#contact" }].map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim">Company</p>
            {company.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group/f inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
              >
                {l.label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover/f:opacity-100" />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim">Connect</p>
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
              >
                <SocialIcon name={s.label} className="size-3.5" />
                {s.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="shell mt-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim">Recognised by</span>
          <Image src="/brand/startup-india.png" alt="Startup India" width={2049} height={453} className="h-6 w-auto opacity-80" />
        </div>
        <BackToTop />
      </div>

      <Wordmark />

      <div className="shell flex flex-col gap-2 border-t border-line py-6 text-xs text-dim md:flex-row md:justify-between">
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <p>Visakhapatnam, India · Human + AI product studio</p>
      </div>
    </footer>
  );
}
