import { About } from "@/components/sections/About";
import { AiFilm } from "@/components/sections/AiFilm";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { DesignWall } from "@/components/sections/DesignWall";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Founders } from "@/components/sections/Founders";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Nav } from "@/components/sections/Nav";
import { Preloader } from "@/components/sections/Preloader";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Works } from "@/components/sections/Works";
import { Cursor } from "@/components/ui/Cursor";
import { faqs, founders, site } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: `${site.url}/spotmies_banner.png`,
      foundingDate: String(site.founded),
      email: site.email,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "4-58-2/9, MIG-80, North Ext, Lawsons Bay Colony",
        addressLocality: "Visakhapatnam",
        addressRegion: "Andhra Pradesh",
        postalCode: "530013",
        addressCountry: "IN",
      },
      founder: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role, sameAs: f.linkedin })),
      sameAs: site.socials.map((s) => s.href),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-medium text-black transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main id="main">
        <Hero />
        <Clients />
        <Services />
        <AiFilm />
        <About />
        <Works />
        <DesignWall />
        <Process />
        <Industries />
        <Founders />
        <Testimonials />
        <Faq />
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
