import Image from "next/image";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { logos, type Logo } from "@/lib/content";
import { cn } from "@/lib/utils";

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div className="group/logo flex h-20 w-[168px] shrink-0 items-center justify-center px-6 md:h-24 md:w-[200px]">
      <Image
        src={`/logos/${logo.file}`}
        alt={logo.name}
        width={logo.w}
        height={logo.h}
        sizes="200px"
        className={cn(
          "max-h-9 w-auto max-w-full object-contain opacity-55 transition-[filter,opacity] duration-500 group-hover/logo:opacity-100 group-hover/logo:[filter:none] md:max-h-10",
          logo.solid ? "[filter:grayscale(1)]" : "[filter:brightness(0)_invert(1)]",
        )}
      />
    </div>
  );
}

export function Clients() {
  const half = Math.ceil(logos.length / 2);
  return (
    <section aria-label="Clients" className="relative z-10 -mt-[18svh] border-y border-line bg-bg/60 py-10 backdrop-blur-sm md:py-14">
      <div className="shell mb-8 flex items-center justify-between gap-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Trusted by <span className="text-fg">{logos.length}+</span> startups & businesses
        </p>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted md:block">
          Scroll to speed it up →
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <VelocityMarquee speed={-3}>
          {logos.slice(0, half).map((l) => (
            <LogoItem key={l.file} logo={l} />
          ))}
        </VelocityMarquee>
        <VelocityMarquee speed={3}>
          {logos.slice(half).map((l) => (
            <LogoItem key={l.file} logo={l} />
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
