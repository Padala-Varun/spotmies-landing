/**
 * Every piece of copy and data on the landing page lives here.
 * Sourced from spotmies.com (Oct 2026); edit this file to update the page.
 */

export const site = {
  name: "Spotmies",
  legalName: "Spotmies LLP",
  url: "https://www.spotmies.com",
  tagline: "Experience the excellence",
  founded: 2019,
  description:
    "Spotmies is a product studio blending human craft with AI to design, build and scale software — AI & ML, Web3, mobile, SaaS, product design and generative AI film.",
  bookingUrl: "https://calendly.com/spotmies/30min",
  email: "info@spotmies.com",
  phone: "+91 7416498484",
  hiringPhone: "+91 7207333883",
  city: "Visakhapatnam, India",
  timeZone: "Asia/Kolkata",
  address: ["4-58-2/9, MIG-80, North Ext,", "Lawsons Bay Colony,", "Visakhapatnam, Andhra Pradesh 530013"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lawsons+Bay+Colony+Visakhapatnam+530013",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/spotmies" },
    { label: "Instagram", href: "https://www.instagram.com/spotmies" },
    { label: "YouTube", href: "https://www.youtube.com/@spotmies" },
    { label: "X (Twitter)", href: "https://twitter.com/spotmies" },
  ],
  external: {
    work: "https://www.spotmies.com/work",
    about: "https://www.spotmies.com/about",
    careers: "https://www.spotmies.com/careers",
    blog: "https://www.spotmies.com/blog",
    privacy: "https://www.spotmies.com/privacy-policy",
  },
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  badge: "Available for new projects",
  sub: "Spotmies is a product studio that blends human craft with AI to design, build and scale digital products — for startups and growing businesses since 2019.",
};

export type Logo = { name: string; file: string; w: number; h: number; solid?: boolean };

export const logos: Logo[] = [
  { name: "Reaidy", file: "reaidy.png", w: 4490, h: 672 },
  { name: "Amero X", file: "amero-x.png", w: 6137, h: 1399 },
  { name: "OROLEXA", file: "orolexa.png", w: 1237, h: 430, solid: true },
  { name: "Zin in Thuiswerken", file: "zin-in-thuiswerken.png", w: 636, h: 129 },
  { name: "A Square GoKarting", file: "a-square-gokarting.png", w: 3000, h: 1000 },
  { name: "SMARTFALCON", file: "smartfalcon.png", w: 242, h: 60 },
  { name: "Credit Report", file: "credit-report.png", w: 922, h: 239 },
  { name: "Andhra University Incubation Center", file: "au-incubation.png", w: 2861, h: 852 },
  { name: "Schemax Tech", file: "schemax.png", w: 1235, h: 338 },
  { name: "Sweken IT Solutions", file: "sweken.png", w: 574, h: 202 },
  { name: "Vihaan Electrix", file: "vihaan-electrix.png", w: 3696, h: 1296 },
  { name: "DecenTrialz", file: "decentrialz.png", w: 500, h: 100 },
  { name: "Advait Labs", file: "advait-labs.png", w: 445, h: 69 },
  { name: "Chalo Ride", file: "chalo-ride.png", w: 820, h: 304 },
  { name: "Mr Bikes", file: "mr-bikes.png", w: 5704, h: 1802 },
  { name: "IOX Academy", file: "iox-academy.png", w: 1665, h: 467 },
  { name: "ID No Drafts", file: "id-no-drafts.png", w: 1753, h: 579 },
  { name: "CGRUM", file: "cgrum.png", w: 3272, h: 904 },
  { name: "Nandikrushi", file: "nandikrushi.png", w: 2148, h: 473 },
  { name: "HRDInc", file: "hrdinc.png", w: 183, h: 105 },
  { name: "ADVON", file: "advon.png", w: 878, h: 319 },
  { name: "Indieskull Syndicate", file: "indieskull.png", w: 258, h: 136 },
  { name: "My Body Qode", file: "my-body-qode.png", w: 1481, h: 552 },
  { name: "SafeGuard Air", file: "safeguard-air.png", w: 1052, h: 213 },
  { name: "Orfus", file: "orfus.png", w: 5280, h: 2970 },
  { name: "Vitals", file: "vitals.png", w: 744, h: 271 },
  { name: "Varun Motors", file: "varun-motors.png", w: 1520, h: 386 },
  { name: "Awaken", file: "awaken.png", w: 907, h: 554 },
  { name: "BoomBoomTalk", file: "boomboomtalk.png", w: 1911, h: 467 },
  { name: "Commuter", file: "commuter.png", w: 1260, h: 178 },
  { name: "EduMoon", file: "edumoon.png", w: 1136, h: 380 },
  { name: "Farm Vaidya", file: "farm-vaidya.png", w: 1173, h: 270 },
  { name: "Mobile Masala", file: "mobile-masala.png", w: 1104, h: 261 },
  { name: "TheReachX", file: "thereachx.png", w: 308, h: 65 },
  { name: "Referral Bazaar", file: "referral-bazaar.png", w: 1466, h: 417 },
  { name: "Stoory", file: "stoory.png", w: 300, h: 106 },
  { name: "Teckybot", file: "teckybot.png", w: 2975, h: 744 },
  { name: "WingDent", file: "wingdent.png", w: 872, h: 286 },
];

export type Service = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  layout: "wide" | "tall" | "base" | "full";
};

export const services: Service[] = [
  {
    title: "AI & Machine Learning",
    description:
      "Intelligent features that ship — from AI integrations to data-driven products like AI job interviews and instant dental analysis.",
    tags: ["AI Integration", "Data Science", "Computer Vision"],
    image: "/expertise/ai.png",
    layout: "wide",
  },
  {
    title: "Blockchain & Web3",
    description: "Smart contracts, DEXs and Web3 platforms engineered for security, trust and scale.",
    tags: ["Smart Contracts", "DeFi", "Web3"],
    image: "/expertise/blockchain.png",
    layout: "tall",
  },
  {
    title: "Android & iOS Apps",
    description: "Cross-platform apps built with Flutter that look great and perform flawlessly on every device.",
    tags: ["Flutter", "Android", "iOS"],
    image: "/expertise/mobile.png",
    layout: "base",
  },
  {
    title: "SaaS Platforms",
    description: "Scalable web platforms engineered for performance, reliability and growth.",
    tags: ["Web Platforms", "SaaS Dev", "Cloud"],
    image: "/expertise/saas.png",
    layout: "base",
  },
  {
    title: "Product Design",
    description: "Research-led UI/UX, design systems and branding that turn ideas into products people love.",
    tags: ["UI/UX", "Design Systems", "Branding"],
    image: "/expertise/design.png",
    layout: "full",
  },
];

/** Generative AI film reels, streamed from the Spotmies CDN. */
export const film = {
  title: ["Generative", "AI filmmaking"],
  copy: "Transform your creative vision into reality with state-of-the-art AI video. We blend machine learning with cinematic storytelling to produce stunning, high-fidelity visual narratives — scaling your production capabilities instantly.",
  poster: "/brand/video-poster.jpg",
  reels: [
    "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3iVkvCKwGbtro0xYShRpEzMyFOLuf7c8eCGVqT",
    "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3iKoFnG85WTx7bFMEnAO58qUL6iuIVRmQzkN9Y",
    "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3iBttBB0ExxH8PRt7TM2LOspFIy0U5EJv3AeYk",
    "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3it9fvGSlUx52NqWcVG736rAjlbaDeOMXsL8dw",
    "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3ieTqBXafMf3Tj5ICFamSKdR2HWEQsw4uLhBOz",
  ],
};

export const about = {
  statement:
    "With over 7 years in the industry, our services have evolved to complement each other — so we can design, develop, implement, maintain and extend one consistent experience across every touchpoint.",
  stats: [
    { value: 7, suffix: "+", label: "Years of building" },
    { value: 38, suffix: "+", label: "Client brands" },
    { value: 10, suffix: "", label: "Industries served" },
    { value: 2019, suffix: "", label: "Founded in Vizag", plain: true },
  ],
};

/** Positions (0–100) mirror the original Brand ↔ Product mastery map. */
export const mastery: { label: string; x: number; y: number; core?: boolean }[] = [
  { label: "Smart Contracts", x: 29, y: 18 },
  { label: "Motion Design", x: 24, y: 42 },
  { label: "Growth Hacking", x: 15, y: 66 },
  { label: "AI Integration", x: 27, y: 88 },
  { label: "Design Systems", x: 51, y: 14, core: true },
  { label: "Product Branding", x: 42, y: 38, core: true },
  { label: "Brand Strategy", x: 37, y: 64, core: true },
  { label: "Web Platforms", x: 45, y: 88, core: true },
  { label: "Mobile Apps", x: 61, y: 38, core: true },
  { label: "UI/UX Design", x: 56, y: 64, core: true },
  { label: "SaaS Dev", x: 61, y: 88, core: true },
  { label: "Data Science", x: 71, y: 16 },
  { label: "Product Strategy", x: 79, y: 40 },
  { label: "GTM Strategy", x: 72, y: 64 },
  { label: "Community", x: 86, y: 66 },
  { label: "Tech Docs", x: 78, y: 88 },
];

export type Work = { name: string; category: string; description: string; image: string };

export const works: Work[] = [
  {
    name: "Reaidy.io",
    category: "AI · HRTech",
    description: "Revolutionizing recruitment with precise AI job interviews and smart assessments.",
    image: "/works/reaidy.png",
  },
  {
    name: "Amero X",
    category: "Blockchain · Fintech",
    description: "A premium hybrid DEX featuring non-custodial swaps, copy trading and institutional-grade tools.",
    image: "/works/amero-x.png",
  },
  {
    name: "OROLEXA",
    category: "AI · Healthcare",
    description: "Smart dental health tracking with AI-powered instant analysis.",
    image: "/works/orolexa.png",
  },
  {
    name: "Vitals Care Pro",
    category: "Healthcare",
    description: "Continuous remote health monitoring for chronic conditions and elderly care.",
    image: "/works/vitals.png",
  },
  {
    name: "EduMoon",
    category: "EdTech",
    description: "The largest engineering student community for learning, skill development and growth.",
    image: "/works/edumoon.png",
  },
  {
    name: "Awaken",
    category: "Fintech",
    description: "Smart goal-based financial planning with professional expert guidance.",
    image: "/works/awaken.png",
  },
  {
    name: "Chalo Ride",
    category: "Travel · Mobility",
    description: "Visakhapatnam's most trusted and transparent two-wheeler rental service.",
    image: "/works/chalo-ride.png",
  },
  {
    name: "Mr Bikes",
    category: "Travel · Mobility",
    description: "Andhra Pradesh's top bike rental platform with flexible rides and safety gear included.",
    image: "/works/mr-bikes.png",
  },
  {
    name: "SafeGuard Air",
    category: "IoT · AI",
    description: "Smart IoT + AI platform for real-time air quality monitoring and safety alerts.",
    image: "/works/safeguard-air.png",
  },
];

/** Shots from the "Our designs" archive, split into parallax columns. */
export const designColumns: string[][] = [
  ["d27", "d4", "d35", "d23", "d40"],
  ["d29", "d8", "d38", "d26", "d2"],
  ["d30", "d36", "d9", "d24", "d28"],
  ["d37", "d3", "d41", "d25", "d5"],
].map((col) => col.map((id) => `/designs/${id}.png`));

export const process = [
  {
    title: "Analyze",
    description: "We dive deep into your requirements, stripping away complexity to find the core solution.",
    points: ["Requirements deep-dive", "Scope & architecture", "Custom quote"],
  },
  {
    title: "Design",
    description: "Architecture meets aesthetics. We craft pixel-perfect interfaces designed for human interaction.",
    points: ["UX flows", "UI & design systems", "Pixel-perfect interfaces"],
  },
  {
    title: "Develop",
    description: "Clean, scalable code that turns concepts into high-performance realities — in agile sprints.",
    points: ["Agile sprints", "Transparent progress", "Scalable code"],
  },
  {
    title: "Deliver",
    description: "Rigorous testing and smooth deployment so your product launches flawlessly — and keeps improving.",
    points: ["QA & testing", "Smooth deployment", "Post-launch support"],
  },
];

export type Industry = {
  name: string;
  preview?: { src: string; fit: "cover" | "contain"; caption: string };
};

export const industries: Industry[] = [
  { name: "Healthcare", preview: { src: "/works/vitals.png", fit: "cover", caption: "Vitals Care Pro" } },
  { name: "Fintech", preview: { src: "/works/awaken.png", fit: "cover", caption: "Awaken" } },
  { name: "AgriTech", preview: { src: "/logos/farm-vaidya.png", fit: "contain", caption: "Farm Vaidya" } },
  { name: "Crypto", preview: { src: "/works/amero-x.png", fit: "cover", caption: "Amero X" } },
  { name: "Travel", preview: { src: "/works/chalo-ride.png", fit: "cover", caption: "Chalo Ride" } },
  {
    name: "Entertainment",
    preview: { src: "/logos/a-square-gokarting.png", fit: "contain", caption: "A-Square Entertainments" },
  },
  { name: "Logistics & Supply Chain" },
  { name: "HRTech", preview: { src: "/works/reaidy.png", fit: "cover", caption: "Reaidy.io" } },
  { name: "EdTech", preview: { src: "/works/edumoon.png", fit: "cover", caption: "EduMoon" } },
  { name: "Retail" },
];

export const founders = [
  {
    name: "Satish Kumar Saride",
    role: "Co-Founder & CEO",
    image: "/founders/satish.jpg",
    linkedin: "https://www.linkedin.com/in/saridesatishkumar/",
  },
  {
    name: "Sekhar Javvadi",
    role: "Co-Founder & CTO",
    image: "/founders/sekhar.jpg",
    linkedin: "https://www.linkedin.com/in/sekhar-javvadi/",
  },
  {
    name: "Hemanth Kumar",
    role: "Co-Founder",
    image: "/founders/hemanth.jpg",
    linkedin: "https://www.linkedin.com/in/hemanth-kumar-veeranala-967ba318a/",
  },
  {
    name: "Naveen Kumar",
    role: "Co-Founder & Head of Product Design",
    image: "/founders/naveen.jpg",
    linkedin: "https://www.linkedin.com/in/naveen-kumar-atava-318ba318a/",
  },
];

export const testimonials = [
  {
    quote:
      "Impressed by the team’s expertise and adaptability regarding the development of our AI solution, which made the process went smoothly. Highly recommend them for innovative solutions.",
    name: "Marco Turk",
    role: "Founder",
    company: "Zin In Thuiswerken",
    image: "/people/marco.jpg",
  },
  {
    quote:
      "Spotmies team provided top-notch customer service. Our project was completed in a timely manner, and the quality of the work was outstanding.",
    name: "Vamsi Gummadi",
    role: "Founder & CEO",
    company: "Sweken",
    image: "/people/vamsi.jpg",
  },
  {
    quote:
      "UI Designer in this team is very good at suggesting ideas to get more attention for the clients businesses while frontend & the blockchain devs are exceptionally experienced & excellent in their respective fields. Really impressed by their work, 10/10 would recommend.",
    name: "Ravi Unukuru",
    role: "Web3 Entrepreneur & YouTuber",
    company: "Content Creator",
    image: "/people/ravi.jpg",
  },
  {
    quote:
      "We chose spotmies because of responsive and trust work on delivery on time. They implemented cleared designs and latest strategies for outlining and reporting for every stage of the development process.",
    name: "Anand Boddeti",
    role: "Founder",
    company: "A-Square Entertainments",
    image: "/people/anand.png",
  },
  {
    quote:
      "The team at Spotmies is highly dedicated & efficient in their work. Their responsiveness & commitment towards implementing tech ideas is commendable. I feel fortunate to have learned about them through a referral, and I am eagerly looking forward to continue working with them in the future.",
    name: "Swaroop",
    role: "Founder",
    company: "Advait Labs & Decentrialz",
    image: "/people/swaroop.jpg",
  },
  {
    quote:
      "Spotmies is a dynamic company with an impressive portfolio of completed projects. Their commitment to excellence and top-notch solutions make them a valuable partner",
    name: "Mahidhar",
    role: "Founder & CEO",
    company: "EduMoon",
    image: "/people/mahidhar.jpg",
  },
  {
    quote:
      "Spotmies has been a reliable partner for our business, delivering high-quality services and products that have exceeded our expectations.",
    name: "Dileep",
    role: "Founder",
    company: "Chalo Ride",
    image: "/people/dileep.jpg",
  },
  {
    quote:
      "Spotmies is not just a service provider; they are visionaries who understand the pulse of our industry. With their cutting-edge product designing, they have given us a competitive edge and positioned us as leaders in the market.",
    name: "Venkat",
    role: "Founder",
    company: "Mr Bikes",
    image: "/people/venkat.jpg",
  },
];

export const faqs = [
  {
    q: "What services do you offer?",
    a: "We provide end-to-end digital solutions including UI/UX design, full-stack web development, mobile app creation, AI & blockchain products and enterprise software. We specialize in building scalable, future-proof products using modern tech stacks.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Timelines vary based on complexity. A standard marketing site typically takes 2–4 weeks, while a custom web application or MVP can range from 8–12 weeks. We work in agile sprints to ensure steady progress and transparency.",
  },
  {
    q: "How do you handle pricing?",
    a: "We offer flexible engagement models tailored to your needs — fixed-price contracts for well-defined scopes and time-and-materials (hourly) for ongoing or evolving projects. Contact us for a custom quote.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes! We don't just launch and leave. Our maintenance packages include server monitoring, security updates, bug fixes and feature enhancements to keep your product running smoothly.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We often collaborate with internal teams as an extension of your workforce. Whether you need specialized skills or extra hands on deck, we integrate seamlessly into your existing workflows.",
  },
  {
    q: "Do you sign an NDA?",
    a: "Yes — confidentiality is paramount. We're happy to sign a Non-Disclosure Agreement before discussing any sensitive details, so your intellectual property stays safe.",
  },
];

export const projectTypes = ["Web app", "Mobile app", "AI / ML", "Blockchain", "Product design", "AI film"] as const;

export const countryCodes = ["+91", "+1", "+44", "+61", "+971"] as const;
