import { motion } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import cognivance_img from "../images/cognivance.png";
import eventflex_img from "../images/eventflex.png";
import prism_img from "../images/prism.png";
import testiview_img from "../images/testiview.png";
import timevault_img from "../images/timevault.png";
import veriaudit_img from "../images/veriaudit.png";
import texttocomp from "../images/textcomp.png";

import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code2,
  Database,
  Braces,
  GitBranch,
  Terminal,
  Sparkles,
  ExternalLink,
  Trophy,
  GraduationCap,
  Users,
  Send,
  Zap,
  Activity,
  Layers,
  Server,
  Package,
  Shield,
  Coffee,
  Star,
  Award,
  Briefcase,
  Calendar,
  ChevronRight,
  Copy,
  Check,
  Building2,
} from "lucide-react";
import SpaceScene from "../components/SpaceScene";
import Navbar from "../components/Navbar";
import {
  Counter,
  Typewriter,
  ScrollProgress,
  GlowCursor,
  Tilt,
} from "../components/UIBits";

const SKILLS = [
  {
    icon: Code2,
    name: "Languages",
    accent: "from-amber-500/20 to-orange-500/5",
    items: [
      { n: "JavaScript / TypeScript", lvl: 95 },
      { n: "C / C++", lvl: 85 },
      { n: "Python", lvl: 80 },
      { n: "SQL", lvl: 85 },
      { n: "Rust", lvl: 80 },
      { n: "Solidity", lvl: 70 },
    ],
  },
  {
    icon: Braces,
    name: "Frontend",
    accent: "from-sky-500/20 to-cyan-500/5",
    items: [
      { n: "React.js", lvl: 95 },
      { n: "Next.js", lvl: 85 },
      { n: "Redux / Zustand", lvl: 85 },
      { n: "Tailwind CSS", lvl: 92 },
      { n: "Three.js / R3F", lvl: 60 },
      { n: "Responsive Design", lvl: 92 },
    ],
  },
  {
    icon: Server,
    name: "Backend",
    accent: "from-emerald-500/20 to-teal-500/5",
    items: [
      { n: "Node.js", lvl: 90 },
      { n: "Express.js", lvl: 88 },
      { n: "REST APIs", lvl: 90 },
      { n: "Prisma ORM", lvl: 80 },
      { n: "Microservices", lvl: 85 },
    ],
  },
  {
    icon: Database,
    name: "Databases",
    accent: "from-violet-500/20 to-purple-500/5",
    items: [
      { n: "PostgreSQL", lvl: 90 },
      { n: "MongoDB", lvl: 85 },
      { n: "MySQL", lvl: 85 },
      { n: "Schema Design", lvl: 95 },
    ],
  },
  {
    icon: GitBranch,
    name: "Tools & DevOps",
    accent: "from-rose-500/20 to-pink-500/5",
    items: [
      { n: "Git / GitHub", lvl: 95 },
      { n: "Docker", lvl: 78 },
      { n: "CI/CD", lvl: 75 },
      { n: "Jest / Mocha", lvl: 80 },
      { n: "Linux", lvl: 82 },
    ],
  },
  {
    icon: Terminal,
    name: "Blockchain / AI ",
    accent: "from-yellow-500/20 to-amber-500/5",
    items: [
      { n: "Solidity + Hardhat", lvl: 82 },
      { n: "Web3.js / Ethers", lvl: 85 },
      { n: "Anchor · Solana", lvl: 68 },
      { n: "Chainlink", lvl: 80 },
      { n: "LangChain / RAG", lvl: 85 },
    ],
  },
];

const EXPERIENCE = [
  {
    company: "Dabur India Ltd",
    role: "Software Engineering Intern",
    duration: "May 2026 — Present",
    location: "Delhi, India · On-site",
    stack: [
      "Node.js",
      "React",
      "Python",
      "REST APIs",
      "Docker",
      "n8n",
      "Workflow Automation",
      "Excel",
    ],
    bullets: [
      "Developing and enhancing DaburGPT, an internal AI platform that streamlines knowledge access and improves productivity across business teams.",
      "Building AI agents to automate repetitive workflows, reducing manual effort and significantly improving operational efficiency.",
      "Designing and developing internal web applications to organize business processes, centralize information, and improve team collaboration.",
    ],
  },
  {
    company: "Zerone Smart Infrastructure Pvt Ltd",
    role: "Frontend Developer Intern",
    duration: "Jun 2024 — Aug 2024",
    location: "May 2026 — Present",
    location: "Delhi, India · On-site",
    stack: [
      "React",
      "Redux",
      "Custom Hooks",
      "UI Design",
      "Responsive Design",
      "Agile",
    ],
    bullets: [
      "Architected mobile-first React + Redux UI components — reduced average load time by ~20% across 5+ apps.",
      "Designed a reusable component library w/ custom hooks — accelerated feature delivery by 30% for 3 partner teams.",
      "Owned Zedyer sprints in Agile/Scrum; consistent green sprints with disciplined Git workflows.",
    ],
  },
];

const PROJECTS = [
  {
    name: "VeriAudit AI",
    tag: "AI Smart Contract Auditor",
    role: "Multi-Agent Security Platform",
    stack: [
      "React.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "LangGraph",
      "Groq API",
      "Slither",
      "Mythril",
      "Tree-sitter",
      "PostgreSQL",
      "Docker",
    ],
    desc: "Enterprise-grade AI smart contract auditing platform that combines static analysis, symbolic execution, retrieval-augmented generation, and multi-agent reasoning to detect vulnerabilities, generate exploit PoCs, recommend secure patches, and compare contract versions for security regressions.",
    metrics: [
      { k: "Analysis", v: "6 AI Agents" },
      { k: "Detection", v: "Static + Symbolic" },
      { k: "Output", v: "PoC + Patch" },
    ],
    image: veriaudit_img,
    live: "#",
    code: "https://github.com/Vansh98789/veriaudit.git",
  },
  {
    name: "TestiView",
    tag: "Full-Stack SaaS",
    role: "Design · Backend · Frontend",
    stack: ["React", "Node", "Express", "PostgreSQL", "JWT", "Prisma"],
    desc: "A testimonial collection SaaS. REST API with input-validation middleware, JWT auth, and PostgreSQL data model. Responsive React front-end shipped with grid, carousel & animated displays.",
    metrics: [
      { k: "Integration time", v: "-50%" },
      { k: "Retention", v: "+25%" },
      { k: "Live users", v: "100+" },
    ],
    image: testiview_img,
    live: "https://testiview-frontend.vercel.app/",
    code: "https://github.com/Vansh98789/testiview_to_deploy.git",
  },
  {
    name: "EventFlex",
    tag: "Blockchain × Frontend",
    role: "Smart Contracts · dApp",
    stack: ["React", "Solidity", "Web3.js", "Ethereum", "Hardhat"],
    desc: "Trustless event management dApp. Solidity contracts handle on-chain ticket verification & automated escrow. React + Web3.js frontend with MetaMask flow, QR check-ins and on-chain logging.",
    metrics: [
      { k: "Txn errors", v: "-80%" },
      { k: "Beta users", v: "50+" },
      { k: "Check-in speed", v: "3× faster" },
    ],
    image: eventflex_img,
    live: "https://event-flex.vercel.app/",
    code: "https://github.com/Vansh98789/Event-Flex.git",
  },
  {
    name: "TimeVault",
    tag: "Decentralized dApp",
    role: "Rust · Anchor · Full-stack",
    stack: ["React", "Rust", "Anchor", "Solana", "IPFS", "Filebase"],
    desc: "Timestamp-locked capsules on Solana Devnet using Anchor PDAs; IPFS via Filebase keeps large payloads off-chain. Wallet-based auth via Phantom / Backpack for a fully censorship-resistant flow.",
    metrics: [
      { k: "On-chain cost", v: "-90%" },
      { k: "Wallet auth", v: "100%" },
      { k: "Uptime target", v: "24/7" },
    ],
    image: timevault_img,
    live: "https://time-capsule-sol-frontend.vercel.app/",
    code: "https://github.com/Vansh98789/TimeCapsule-Sol.git",
  },
  {
    name: "AI UI Builder",
    tag: "Multi-Agent LLM",
    role: "AI Full-stack",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Groq API",
      "Tailwind CSS",
    ],
    desc: "LLM-powered UI generation platform that converts natural language into production-ready React components through a multi-agent architecture consisting of Planner, Generator, and Explainer agents with JSON-driven rendering and strict validation.",
    metrics: [
      { k: "Architecture", v: "3 AI Agents" },
      { k: "Rendering", v: "JSON Driven" },
      { k: "Validation", v: "100%" },
    ],
    image: texttocomp,
    live: "#",
    code: "https://github.com/Vansh98789/Text-to-Component.git",
  },
  {
    name: "PRISM",
    tag: "Solana Risk Analysis Platform",
    role: "Blockchain · Full-stack",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Bun",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Solana Web3.js",
      "JWT",
      "Zod",
    ],
    desc: "A full-stack Solana meme-coin risk analysis platform that evaluates token safety using live on-chain and market data. PRISM generates a safety score with detailed risk breakdowns by analyzing mint and freeze authority, holder concentration, liquidity, LP burn status, market metrics, creator history, and social signals, helping traders identify suspicious or high-risk tokens before investing.",
    metrics: [
      { k: "Data Sources", v: "8 APIs" },
      { k: "Risk Score", v: "0-100" },
      { k: "Analysis", v: "Real-time" },
    ],
    image: prism_img,
    live: "https://prism-frotend.vercel.app/",
    code: "https://github.com/Vansh98789/Prism.git",
  },
  {
    name: "Cognivance",
    tag: "Web3 Skill Verification Platform",
    role: "Blockchain · Full-stack",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Solana",
      "Rust",
      "Anchor",
      "Metaplex",
      "Solana Wallet Adapter",
      "Turborepo",
    ],
    desc: "A decentralized skill verification and job escrow platform built on Solana that transforms interview performance into permanent on-chain credentials. Candidates earn skill-based NFTs (Bronze, Silver, Gold) as a verifiable Skill Passport, while recruiters create SOL-backed job escrows and hire only candidates who meet NFT-based qualification requirements, enabling a transparent and trustless hiring ecosystem.",
    metrics: [
      { k: "Credentials", v: "NFT Based" },
      { k: "Payments", v: "SOL Escrow" },
      { k: "Verification", v: "On-chain" },
    ],
    image: cognivance_img,
    live: "https://cognivance-frontend.vercel.app/",
    code: "https://github.com/Vansh98789/Cognivance.git",
  },
];

const ACHIEVEMENTS = [
  {
    metric: 50,
    suffix: "%",
    label: "Faster integration",
    desc: "TestiView REST API cut client integration time.",
  },
  {
    metric: 80,
    suffix: "%",
    label: "Fewer txn errors",
    desc: "EventFlex blockchain escrow eliminated 4/5 failures.",
  },
  {
    metric: 90,
    suffix: "%",
    label: "Cheaper storage",
    desc: "TimeVault IPFS/Filebase pipeline vs. pure on-chain.",
  },
  {
    metric: 30,
    suffix: "%",
    label: "Faster delivery",
    desc: "Reusable component library at Zerone across 3 teams.",
  },
];

const STATS = [
  { icon: Zap, num: 2, suffix: "+", label: "Years shipping" },
  { icon: Package, num: 25, suffix: "+", label: "Projects built" },
  { icon: Coffee, num: 8.5, dec: 1, suffix: "", label: "CGPA · MAIT" },
];

const PILLARS = [
  {
    icon: Layers,
    title: "Full-stack systems",
    desc: "From Postgres schema to pixel - designing REST APIs, modelling data, and delivering responsive React UIs.",
  },
  {
    icon: Terminal,
    title: "Blockchain across chains",
    desc: "Solidity + Hardhat on Ethereum, Rust + Anchor on Solana - smart contracts, dApps, and wallet-integrated frontends shipped on both.",
  },
  {
    icon: Sparkles,
    title: "AI-powered products",
    desc: "LangChain, RAG pipelines, and multi-agent architectures - building AI tools and platforms that solve real workflows, not just demos.",
  },
];

/* ================= HELPERS ================= */
const Section = ({
  id,
  overline,
  title,
  subtitle,
  children,
  className = "",
}) => (
  <section
    id={id}
    data-testid={`section-${id}`}
    className={`relative py-24 sm:py-32 px-6 md:px-10 ${className}`}
  >
    <div className="mx-auto max-w-7xl">
      {overline && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono tracking-[0.3em] uppercase text-[#F4B961] mb-4 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-[#F4B961]" />
          {overline}
        </motion.div>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white/95 mb-3 max-w-4xl"
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/60 max-w-2xl text-base sm:text-lg leading-relaxed mb-14"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </div>
  </section>
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

/* ================= SECTIONS ================= */
function Hero() {
  return (
    <section
      id="top"
      data-testid="section-hero"
      className="relative min-h-screen flex items-center px-6 md:px-10 pt-32 pb-16"
    >
      <div className="mx-auto max-w-7xl w-full grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 relative z-10">
          <motion.div
            {...fadeUp}
            className="text-xs font-mono tracking-[0.3em] uppercase text-[#F4B961] mb-6 flex items-center gap-2"
          >
            <span className="inline-block w-8 h-px bg-[#F4B961]" />
            SYSTEM ONLINE // DEV PROTOCOL v2.6
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-[88px] leading-[0.92] tracking-tight text-white"
          >
            Vansh
            <br />
            <span className="text-[#F4B961]">Maheshwari</span>
            <span className="text-[#F4B961]">.</span>
          </motion.h1>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="mt-5 h-8 text-lg sm:text-xl text-white/85"
          >
            <Typewriter
              phrases={[
                "Software Development Engineer.",
                "blockchain & AI developer.",
                "Full-stack builder — React · Node · Postgres.",
                "Performance-obsessed. Ship-first mindset.",
              ]}
            />
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed"
          >
            Creating experiences through code.
<span className="text-white/85">
  {" "}
  Full stack. AI. Blockchain.
</span>
            .
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              data-testid="hero-cta-work"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F4B961] text-[#030305] font-medium hover:bg-[#E89D42] transition-all hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(244,185,97,0.2),0_15px_40px_-10px_rgba(244,185,97,0.4)]"
            >
              Explore Work
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="https://github.com/Vansh98789"
              target="_blank"
              rel="noreferrer"
              data-testid="hero-cta-github"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white hover:bg-white/5 hover:border-white/30 transition-all backdrop-blur-md"
            >
              <Github size={16} /> View GitHub
            </a>
            <a
              href="#contact"
              data-testid="hero-cta-contact"
              className="text-sm text-white/60 hover:text-[#F4B961] transition-colors underline underline-offset-4 decoration-white/20"
            >
              or say hi ↗
            </a>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.45 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
          >
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="glass rounded-xl p-4"
                  data-testid={`hero-stat-${i}`}
                >
                  <Icon size={16} className="text-[#F4B961] mb-2" />
                  <div className="font-display text-2xl text-white">
                    <Counter
                      end={s.num}
                      suffix={s.suffix}
                      decimals={s.dec || 0}
                    />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Floating code terminal card — sits in space beside the moon */}
        <div className="md:col-span-5 relative min-h-[520px] hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="absolute right-0 top-24 w-full max-w-md animate-float"
          >
            <div className="glass rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F4B961]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[10px] font-mono uppercase tracking-widest text-white/40">
                  ~/vansh — intro.ts
                </span>
              </div>
              <pre className="text-[12.5px] leading-6 p-5 font-mono text-white/80 overflow-x-auto">
                {`const vansh = {
  role: `}
                <span className="text-[#F4B961]">"SDE"</span>
                {`,
  stack: [`}
                <span className="text-emerald-300">"React"</span>
                {`, `}
                <span className="text-emerald-300">"Node"</span>
                {`, `}
                <span className="text-emerald-300">"Postgres"</span>
                {`],
  currently: `}
                <span className="text-[#F4B961]">"@Dabur · DaburGPT"</span>
                {`,
  believes: (
    ship: `}
                <span className="text-sky-300">"fast"</span>
                {`,
    read: `}
                <span className="text-sky-300">"prod logs"</span>
                {`,
    write: `}
                <span className="text-sky-300">"tests"</span>
                {`
  ),
  side: [`}
                <span className="text-violet-300">"blockchain"</span>
                {`, `}
                <span className="text-violet-300">"AI"</span>
                {`],
  open_to: `}
                <span className="text-[#F4B961]">"SDE roles 2026"</span>
                {`,
};`}
              </pre>
              <div className="flex items-center gap-2 px-5 py-3 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                available for opportunities
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-[10px] font-mono tracking-[0.3em]">
        <span>SCROLL DOWN</span>
        <span className="w-px h-8 bg-gradient-to-b from-[#F4B961] to-transparent" />
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <Section
      id="pillars"
      overline="// 01 · What I Bring"
      title="Three things I optimise for."
      subtitle="The lens I use whether the ticket says 'Full-stack', 'Blockchain', or 'AI'."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Tilt key={p.title} className="h-full">
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="glass rounded-2xl p-7 h-full relative overflow-hidden group"
                data-testid={`pillar-${i}`}
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#F4B961]/5 blur-3xl group-hover:bg-[#F4B961]/10 transition-colors" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-[#F4B961]/10 border border-[#F4B961]/25 flex items-center justify-center mb-5">
                    <Icon size={18} className="text-[#F4B961]" />
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {p.desc}
                  </p>
                  <div className="mt-6 text-[10px] font-mono uppercase tracking-widest text-white/30 flex items-center gap-1">
                    0{i + 1} <ChevronRight size={12} />
                  </div>
                </div>
              </motion.div>
            </Tilt>
          );
        })}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section
      id="about"
      overline="// 02 · About"
      title="Engineer first. Explorer always."
    >
      <div className="grid md:grid-cols-12 gap-6">
        <motion.div
          {...fadeUp}
          className="md:col-span-7 glass rounded-2xl p-8 sm:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4B961]/5 blur-3xl rounded-full" />
          <div className="relative">
            <p className="text-white/85 text-lg leading-relaxed">
              I'm a{" "}
              <span className="text-[#F4B961]">
                Software Development Engineer
              </span>{" "}
              in the final year of B.Tech CSE at Maharaja Agrasen Institute of
              Technology, Delhi — currently interning at{" "}
              <span className="text-white">Dabur India Ltd</span> on their
              internal AI platform, DaburGPT.
            </p>
            <p className="text-white/60 leading-relaxed mt-5">
              My core craft is{" "}
              <span className="text-white/90">full-stack engineering</span>:
              designing REST APIs, building responsive React interfaces,
              modelling relational data, and shipping features that measurably
              move product metrics. I care deeply about performance, clean
              architecture, and code that the next developer can read.
            </p>
            <p className="text-white/60 leading-relaxed mt-5">
              On the side I explore{" "}
              <span className="text-white/85">blockchain</span> (Solidity,
              Anchor/Solana) and{" "}
              <span className="text-white/85">AI tooling</span> — but my compass
              points firmly at strong SDE fundamentals: systems thinking, data
              structures, and reliable software.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#F4B961]/10 border border-[#F4B961]/25 text-[#F4B961]">
                Available · SDE Roles 2026
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-white/70">
                Based in Delhi, IN
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-white/70">
                Open to Remote
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="md:col-span-5 flex flex-col gap-4"
        >
          <div className="glass rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
              <Briefcase size={16} className="text-emerald-300" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-300/80 mb-1">
                Now
              </div>
              <div className="text-white/95 font-medium">
                SWE Intern @ Dabur India
              </div>
              <div className="text-white/50 text-sm mt-1">
                Optimising Node/React/Python services on DaburGPT.
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#F4B961]/10 border border-[#F4B961]/25 flex items-center justify-center shrink-0">
              <Star size={16} className="text-[#F4B961]" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#F4B961]/90 mb-1">
                Focus
              </div>
              <div className="text-white/95 font-medium">
                Full-stack SDE · Systems · Performance
              </div>
              <div className="text-white/50 text-sm mt-1">
                React · Node · PostgreSQL · Docker · CI/CD.
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/25 flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-violet-300" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-violet-300/80 mb-1">
                Also Into
              </div>
              <div className="text-white/95 font-medium">
                3D Web · Blockchain · AI Tools
              </div>
              <div className="text-white/50 text-sm mt-1">
                Three.js / R3F · Solidity · Anchor · LangChain.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section
      id="skills"
      overline="// 03 · Toolbox"
      title="Skills, ranked by daily use."
      subtitle="SDE fundamentals sit at the centre - blockchain and AI are peripheral explorations, kept honest."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SKILLS.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
              className="glass rounded-2xl p-7 relative overflow-hidden group"
              data-testid={`skill-card-${cat.name.toLowerCase().replace(/[^a-z]/g, "-")}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-40 group-hover:opacity-60 transition-opacity`}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F4B961]/10 border border-[#F4B961]/25 flex items-center justify-center">
                      <Icon size={16} className="text-[#F4B961]" />
                    </div>
                    <h3 className="font-display text-lg text-white">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                    0{i + 1}
                  </span>
                </div>
                <div className="space-y-3">
                  {cat.items.map((s) => (
                    <div key={s.n}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-sm text-white/80">{s.n}</span>
                        <span className="text-[10px] font-mono text-white/40">
                          {s.lvl}%
                        </span>
                      </div>
                      <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.lvl}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.2,
                          }}
                          className="h-full bg-gradient-to-r from-[#F4B961] to-[#E89D42]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section
      id="experience"
      overline="// 04 · Experience"
      title="Work log."
      subtitle="Two internships that shaped how I think about production code."
    >
      <div className="relative border-l border-white/10 ml-3 pl-10 space-y-16">
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={exp.company}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[46px] top-3 flex items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-[#F4B961] shadow-[0_0_22px_#F4B961]" />
              <span className="absolute w-8 h-8 rounded-full bg-[#F4B961]/20 animate-ping" />
            </span>

            <div className="glass rounded-2xl p-7 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <Building2 size={16} className="text-[#F4B961]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-white">
                      {exp.role}
                    </h3>
                    <div className="text-[#F4B961] font-mono text-sm mt-0.5">
                      {exp.company}
                    </div>
                  </div>
                </div>
                <div className="text-white/45 text-xs font-mono flex items-center gap-2">
                  <Calendar size={12} /> {exp.duration} · {exp.location}
                </div>
              </div>
              <ul className="space-y-2.5 text-white/70 text-[15px] leading-relaxed">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-[#F4B961] shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[#F4B961]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {exp.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/10 text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section
      id="projects"
      overline="// 05 · Projects"
      title="Selected work."
      subtitle="Full-stack applications shipped end-to-end — from data model to deployed UI, with metrics I can defend."
    >
      <div className="space-y-8">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            className="glass rounded-3xl overflow-hidden grid md:grid-cols-12 gap-0 group hover:border-[#F4B961]/25 transition-all"
            data-testid={`project-card-${i}`}
          >
            <div
              className={`md:col-span-5 relative overflow-hidden min-h-[280px] md:min-h-[360px] ${i % 2 === 1 ? "md:order-2" : ""}`}
            >
              <img
                src={p.image}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-${i % 2 === 1 ? "l" : "r"} from-[#030305]/95 via-[#030305]/30 to-transparent`}
              />
              <div className="absolute top-5 left-5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/70 backdrop-blur border border-[#F4B961]/30 text-[#F4B961] tracking-widest uppercase">
                {p.tag}
              </div>
              <div className="absolute bottom-5 left-5 text-[10px] font-mono text-white/40 tracking-widest uppercase">
                Project · 0{i + 1}
              </div>
            </div>

            <div
              className={`md:col-span-7 p-8 md:p-10 flex flex-col justify-between ${i % 2 === 1 ? "md:order-1" : ""}`}
            >
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
                  {p.role}
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-white mb-4 tracking-tight">
                  {p.name}
                </h3>
                <p className="text-white/65 leading-relaxed text-[15px]">
                  {p.desc}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {p.metrics.map((m) => (
                    <div
                      key={m.k}
                      className="border border-white/8 bg-white/[0.02] rounded-xl p-3"
                    >
                      <div className="font-display text-lg text-[#F4B961]">
                        {m.v}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">
                        {m.k}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/10 text-white/75"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-5 text-sm">
                <a
                  href={p.code}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`project-${i}-code`}
                  className="inline-flex items-center gap-1.5 text-white/85 hover:text-[#F4B961] transition-colors group/link"
                >
                  <Github size={14} /> Code
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>

                {p.live !== "#" && (
                  <a
                    href={p.live}
                    data-testid={`project-${i}-live`}
                    className="inline-flex items-center gap-1.5 text-white/85 hover:text-[#F4B961] transition-colors group/link"
                  >
                    <ExternalLink size={14} /> Live Demo
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  return (
    <Section
      id="achievements"
      overline="// 06 · Impact"
      title="Shipped outcomes."
      subtitle="Numbers I've moved. Everything below is receipts-attached, not just a claim."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-[#F4B961]/30 transition-all"
            data-testid={`achievement-${i}`}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#F4B961]/5 blur-3xl group-hover:bg-[#F4B961]/10 transition-colors" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={13} className="text-[#F4B961]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  Impact metric
                </span>
              </div>
              <div className="font-display text-5xl sm:text-6xl text-[#F4B961] tracking-tight leading-none">
                <Counter end={a.metric} suffix={a.suffix} duration={1800} />
              </div>
              <div className="mt-4 text-sm text-white/85 font-medium">
                {a.label}
              </div>
              <p className="mt-1 text-xs text-white/50 leading-relaxed">
                {a.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" overline="// 07 · Education">
      <motion.div
        {...fadeUp}
        className="glass rounded-3xl p-8 sm:p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#F4B961]/5 blur-3xl rounded-full" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-5 items-start">
            <div className="w-14 h-14 rounded-2xl bg-[#F4B961]/10 border border-[#F4B961]/25 flex items-center justify-center shrink-0">
              <GraduationCap className="text-[#F4B961]" size={24} />
            </div>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white tracking-tight">
                Maharaja Agrasen Institute of Technology
              </h3>
              <div className="text-[#F4B961] font-mono text-sm mt-1.5">
                B.Tech · Computer Science & Engineering
              </div>
              <div className="text-white/50 text-sm mt-1">
                Delhi, India · Sep 2022 — Jun 2026
              </div>
              <div className="mt-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                  Relevant Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Data Structures",
                    "Algorithms",
                    "DBMS",
                    "Operating Systems",
                    "Computer Networks",
                    "OOP",
                    "System Design",
                  ].map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/10 text-white/70"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="md:text-right">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">
              CGPA
            </div>
            <div className="font-display text-6xl text-[#F4B961] tracking-tight leading-none">
              <Counter end={8.5} decimals={1} />
            </div>
            <div className="text-xs font-mono text-white/40 mt-1">/ 10.0</div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);
  const email = "vanshmaheshwari2004.vm@gmail.com";

  const copy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const submit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setStatus("sent");
        formRef.current.reset();
        setTimeout(() => setStatus("idle"), 4000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  };
  return (
    <Section
      id="contact"
      overline="// 08 · Contact"
      title="Let's build something."
    >
      <div className="grid md:grid-cols-12 gap-6">
        <motion.div {...fadeUp} className="md:col-span-5 flex flex-col gap-5">
          <div>
            <h3 className="font-display text-4xl sm:text-5xl text-white leading-[1] tracking-tight">
              Ready when <br />
              <span className="text-[#F4B961]">you are.</span>
            </h3>
            <p className="text-white/60 mt-5 leading-relaxed max-w-md">
              SDE role, a collab, or a curious question about 3D web — my inbox
              is open. Typical reply within{" "}
              <span className="text-[#F4B961]">24 hours</span>.
            </p>
          </div>

          <button
            onClick={copy}
            data-testid="contact-copy-email"
            className="glass rounded-2xl p-5 flex items-center justify-between gap-3 hover:border-[#F4B961]/40 transition-all text-left group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Mail size={16} className="text-[#F4B961] shrink-0" />
              <span className="text-white/85 text-sm truncate">{email}</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 flex items-center gap-1.5 shrink-0">
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-400" /> copied
                </>
              ) : (
                <>
                  <Copy size={12} /> copy
                </>
              )}
            </span>
          </button>

          <a
            href="https://github.com/Vansh98789"
            target="_blank"
            rel="noreferrer"
            data-testid="contact-github-link"
            className="glass rounded-2xl p-5 flex items-center gap-3 hover:border-[#F4B961]/40 transition-all"
          >
            <Github size={16} className="text-[#F4B961]" />
            <span className="text-white/85 text-sm">github.com/Vansh98789</span>
            <ArrowUpRight size={13} className="ml-auto text-white/40" />
          </a>

          <a
            href="https://linkedin.com/in/vansh-maheshwari2004"
            target="_blank"
            rel="noreferrer"
            data-testid="contact-linkedin-link"
            className="glass rounded-2xl p-5 flex items-center gap-3 hover:border-[#F4B961]/40 transition-all"
          >
            <Linkedin size={16} className="text-[#F4B961]" />
            <span className="text-white/85 text-sm">
              linkedin.com/in/vansh-maheshwari2004
            </span>
            <ArrowUpRight size={13} className="ml-auto text-white/40" />
          </a>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/80">
                status
              </span>
            </div>
            <div className="text-white/85 text-sm">
              Available for SDE opportunities · Full-time 2026
            </div>
            <div className="text-white/45 text-xs mt-1 flex items-center gap-1.5">
              <MapPin size={11} /> Delhi, IN · Open to Remote
            </div>
          </div>
        </motion.div>

        <motion.form
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          ref={formRef}
          onSubmit={submit}
          className="md:col-span-7 glass rounded-2xl p-8 relative overflow-hidden"
          data-testid="contact-form"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F4B961]/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#F4B961]">
                {"// send transmission"}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                secure
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
                  Your name
                </span>
                <input
                  type="text"
                  name="from_name"
                  required
                  data-testid="contact-input-name"
                  className="mt-2 w-full bg-white/[0.03] border border-white/10 focus:border-[#F4B961]/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors placeholder-white/25"
                  placeholder="Ada Lovelace"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
                  Email
                </span>
                <input
                  type="email"
                  name="reply_to"
                  required
                  data-testid="contact-input-email"
                  className="mt-2 w-full bg-white/[0.03] border border-white/10 focus:border-[#F4B961]/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors placeholder-white/25"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="block mt-5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
                Subject
              </span>
              <input
                type="text"
                name="subject"
                data-testid="contact-input-subject"
                className="mt-2 w-full bg-white/[0.03] border border-white/10 focus:border-[#F4B961]/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors placeholder-white/25"
                placeholder="Opportunity · Idea · Question"
              />
            </label>
            <label className="block mt-5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
                Message
              </span>
              <textarea
                required
                rows={6}
                name="message"
                data-testid="contact-input-message"
                className="mt-2 w-full bg-white/[0.03] border border-white/10 focus:border-[#F4B961]/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors placeholder-white/25 resize-none"
                placeholder="Tell me what you're working on..."
              />
            </label>
            <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/45">
                {status === "sent"
                  ? "✓ transmission received · I'll reply soon"
                  : status === "sending"
                    ? "→ transmitting..."
                    : status === "error"
                      ? "✗ failed to send · try emailing directly"
                      : "→ ready to transmit"}
              </span>
              <button
                type="submit"
                disabled={status === "sending"}
                data-testid="contact-submit-button"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#F4B961] text-[#030305] font-medium hover:bg-[#E89D42] transition-all hover:-translate-y-0.5 disabled:opacity-60 shadow-[0_15px_40px_-10px_rgba(244,185,97,0.4)]"
              >
                <Send size={14} />{" "}
                {status === "sending"
                  ? "Sending..."
                  : status === "sent"
                    ? "Sent"
                    : "Send Message"}
              </button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/40 font-mono">
        <div>© {new Date().getFullYear()} VANSH MAHESHWARI</div>
        <div className="flex items-center gap-4">
          <span>END OF TRANSMISSION</span>
          <span className="text-[#F4B961]">∎</span>
          <a href="#top" className="hover:text-[#F4B961] transition-colors">
            ↑ Back to top
          </a>
        </div>
      </div>
    </Section>
  );
}
/* ================= ROOT ================= */
export default function Portfolio() {
  return (
    <div className="relative text-white" data-testid="portfolio-root">
      <ScrollProgress />
      <GlowCursor />
      <SpaceScene />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Pillars />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
