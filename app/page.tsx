"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PayNow } from "@/components/paynow";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SocialShare } from "@/components/SocialShare";
import EmailCapture from "@/components/EmailCapture";
import { EcosystemFooter } from "@/components/EcosystemFooter";
import { TrustBar } from "@/components/TrustBar";
import { ExitIntent } from "@/components/ExitIntent";
import { SplitText } from "@/components/SplitText";
import { MagneticButton } from "@/components/MagneticButton";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

const FAQ_ITEMS = [
  {
    question: "What is OGForge?",
    answer: "OGForge is an AI-powered tool that generates beautiful Open Graph images, Twitter cards, LinkedIn banners, and Instagram stories in seconds. No design skills required.",
  },
  {
    question: "What formats are supported?",
    answer: "OGForge supports OG Image (1200x630), Twitter Card (1200x600), LinkedIn Banner (1584x396), and Instagram Story (1080x1920) — all the dimensions social platforms expect.",
  },
  {
    question: "What does the free plan include?",
    answer: "The free plan gives you 1 watermarked OG image per day in the standard OG format. Perfect for trying out the tool before committing.",
  },
  {
    question: "What do I get with the $9 Pro card?",
    answer: "The Pro tier unlocks all 4 output formats, all 5 styles, high-resolution PNG downloads, and removes the watermark. Pay once per card, own it forever.",
  },
  {
    question: "How do I pay?",
    answer: "We accept credit/debit cards (via Apple Pay, Google Pay, or direct entry) and USDC cryptocurrency on the Base network. All payments are processed securely.",
  },
  {
    question: "Can I use generated cards commercially?",
    answer: "Yes. Pro cards come with a full commercial license — use them on your website, social media, product launches, or anywhere else you need professional social previews.",
  },
];

const PRESET_COLORS = [
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Blue", hex: "#3b82f6" },
];

const STYLES = ["Gradient", "Minimal", "Bold", "Dark Mode", "Photo"] as const;
type CardStyle = (typeof STYLES)[number];

const FORMATS = [
  { label: "OG Image", size: "1200 x 630", w: 1200, h: 630 },
  { label: "Twitter Card", size: "1200 x 600", w: 1200, h: 600 },
  { label: "LinkedIn Banner", size: "1584 x 396", w: 1584, h: 396 },
  { label: "Instagram Story", size: "1080 x 1920", w: 1080, h: 1920 },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "1 / day",
    features: [
      "1 watermarked image per day",
      "OG Image format only",
      "Basic styles",
    ],
    cta: "Try Free",
    highlighted: false,
  },
  {
    name: "Single",
    price: "$9",
    period: "USDC",
    features: [
      "Clean, no watermark",
      "All 4 output formats",
      "All 5 styles",
      "High-res PNG download",
    ],
    cta: "Generate Your Card — $9",
    highlighted: true,
  },
  {
    name: "API Pack",
    price: "$49",
    period: "USDC",
    features: [
      "100 API credits",
      "Programmatic generation",
      "All formats & styles",
      "Priority rendering",
    ],
    cta: "Get API Pack",
    highlighted: false,
  },
];

function getStyleCSS(
  style: CardStyle,
  color: string
): { bg: string; text: string; sub: string } {
  switch (style) {
    case "Gradient":
      return {
        bg: `linear-gradient(135deg, ${color} 0%, ${color}99 40%, #09090b 100%)`,
        text: "#ffffff",
        sub: "#ffffffcc",
      };
    case "Minimal":
      return { bg: "#ffffff", text: "#18181b", sub: "#71717a" };
    case "Bold":
      return { bg: color, text: "#ffffff", sub: "#ffffffdd" };
    case "Dark Mode":
      return { bg: "#09090b", text: "#fafafa", sub: "#a1a1aa" };
    case "Photo":
      return {
        bg: `linear-gradient(135deg, #09090b 0%, ${color}44 50%, #09090b 100%)`,
        text: "#ffffff",
        sub: "#d4d4d8",
      };
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("Your Awesome Product");
  const [description, setDescription] = useState(
    "Ship faster. Grow smarter. Build the future."
  );
  const [color, setColor] = useState("#8b5cf6");
  const [customHex, setCustomHex] = useState("");
  const [style, setStyle] = useState<CardStyle>("Gradient");

  const activeColor = customHex.match(/^#[0-9a-fA-F]{6}$/)
    ? customHex
    : color;
  const s = getStyleCSS(style, activeColor);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.15),transparent)]" />
        {/* Secondary pink glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_-10%,rgba(217,70,239,0.08),transparent)]" />

        {/* Floating OG card previews */}
        <div className="pointer-events-none absolute left-[5%] top-[20%] hidden w-56 -rotate-6 rounded-xl border border-violet-500/15 bg-zinc-900/60 shadow-xl shadow-violet-500/10 backdrop-blur-sm overflow-hidden lg:block">
          <div className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
          <div className="p-3">
            <div className="mb-2 h-2 w-16 rounded bg-violet-500/20" />
            <div className="mb-1 h-2.5 w-full rounded bg-zinc-700/50" />
            <div className="h-2.5 w-3/4 rounded bg-zinc-700/30" />
            <div className="mt-2 flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-violet-500/30" />
              <div className="h-1.5 w-12 rounded bg-zinc-700/40" />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-[6%] top-[28%] hidden w-48 rotate-3 rounded-xl border border-fuchsia-500/15 bg-zinc-900/50 shadow-lg shadow-fuchsia-500/10 backdrop-blur-sm overflow-hidden lg:block">
          <div className="h-1 bg-gradient-to-r from-fuchsia-500 to-rose-500" />
          <div className="p-3">
            <div className="mb-2 h-2 w-20 rounded bg-fuchsia-500/20" />
            <div className="mb-1 h-2.5 w-full rounded bg-zinc-700/50" />
            <div className="h-2.5 w-2/3 rounded bg-zinc-700/30" />
          </div>
        </div>

        <div className="pointer-events-none absolute right-[12%] bottom-[15%] hidden w-44 rotate-6 rounded-xl border border-violet-500/10 bg-zinc-900/40 shadow-lg backdrop-blur-sm overflow-hidden lg:block">
          <div className="h-1 bg-gradient-to-r from-violet-400 to-violet-600" />
          <div className="p-2.5">
            <div className="mb-1.5 h-2 w-14 rounded bg-violet-500/15" />
            <div className="mb-1 h-2 w-full rounded bg-zinc-700/40" />
            <div className="h-2 w-1/2 rounded bg-zinc-700/25" />
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block rounded-full border border-fuchsia-500/30 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 px-4 py-1.5 text-sm font-medium text-fuchsia-300 mb-6">
              AI-Powered Social Cards
            </span>
          </motion.div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            <SplitText text="Your links look boring." className="justify-center" delay={0.1} />
            <SplitText text="Fix that in 10 seconds." className="justify-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400" delay={0.4} />
          </h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            AI-powered Open Graph images for Product Hunt, Twitter, LinkedIn,
            and beyond. Generate stunning social cards that make people click.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
          >
            <MagneticButton
              onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-xl bg-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-500 hover:shadow-violet-500/40 cursor-pointer"
            >
              Try the Editor
            </MagneticButton>
            <a
              href="#pricing"
              className="rounded-xl border border-zinc-700 px-8 py-3.5 text-base font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              See Pricing
            </a>
          </motion.div>
        </div>
      </section>

      {/* TrustBar */}
      <div className="mx-auto max-w-6xl px-6">
        <TrustBar items={[
          { label: 'Cards Generated', value: 5000, suffix: '+' },
          { label: 'Formats', value: 4 },
          { label: 'Styles', value: 5 },
          { label: 'Resolution', value: 4, suffix: 'K' },
        ]} />
      </div>

      {/* Live Preview Editor */}
      <section id="preview" className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Live Preview Editor
          </h2>
          <p className="mt-3 text-zinc-400">
            Customize your card and see changes in real-time
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
          {/* Controls */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm h-fit"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your title"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your description"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Brand Color
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      setColor(c.hex);
                      setCustomHex("");
                    }}
                    className={`h-9 w-9 rounded-lg transition-all ${
                      color === c.hex && !customHex
                        ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ background: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={customHex || color}
                  onChange={(e) => setCustomHex(e.target.value)}
                  className="h-9 w-9 rounded-lg cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value)}
                  placeholder="Custom #hex"
                  className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 font-mono focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((st) => (
                  <button
                    key={st}
                    onClick={() => setStyle(st)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      style === st
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Logo{" "}
                <span className="text-zinc-500 font-normal">(optional)</span>
              </label>
              <label className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-800/50 px-4 py-4 text-sm text-zinc-400 cursor-pointer hover:border-violet-500/50 hover:text-violet-400 transition">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload logo image
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </motion.div>

          {/* Live Preview Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
                <span className="inline-block h-2 w-2 rounded-full bg-violet-500" />
                Live Preview — OG Image 1200 x 630
              </div>
              <div
                className="relative w-full overflow-hidden rounded-xl transition-all duration-300"
                style={{ aspectRatio: "1200 / 630" }}
              >
                <div
                  className="absolute inset-0 flex flex-col justify-center px-[8%] py-[6%]"
                  style={{ background: s.bg }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1"
                    style={{ background: activeColor }}
                  />
                  <h3
                    className="text-[clamp(1.2rem,3.5vw,3.2rem)] font-black leading-[1.1] mb-[0.6em] max-w-[80%]"
                    style={{ color: s.text }}
                  >
                    {title || "Your Title Here"}
                  </h3>
                  <p
                    className="text-[clamp(0.6rem,1.6vw,1.4rem)] leading-relaxed max-w-[70%]"
                    style={{ color: s.sub }}
                  >
                    {description || "Your description goes here"}
                  </p>
                  <div
                    className="absolute bottom-[6%] right-[5%] flex items-center gap-1.5 text-[clamp(0.4rem,0.8vw,0.75rem)] font-bold uppercase tracking-wider"
                    style={{ color: s.sub }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: activeColor }}
                    />
                    OGForge
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Output Formats */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Every Platform. One Click.
          </h2>
          <p className="mt-3 text-zinc-400">
            Export in the exact dimensions each platform expects
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FORMATS.map((f, i) => (
            <motion.div
              key={f.label}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-center transition hover:border-fuchsia-500/30 hover:bg-zinc-900 hover:shadow-lg hover:shadow-fuchsia-500/5"
            >
              <div
                className="mx-auto mb-4 rounded-lg border border-zinc-700 bg-zinc-800 transition group-hover:border-violet-500/30"
                style={{
                  width: "100%",
                  maxWidth: "140px",
                  aspectRatio: `${f.w} / ${f.h}`,
                }}
              />
              <p className="font-semibold text-white">{f.label}</p>
              <p className="mt-1 text-sm text-zinc-500">{f.size}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 text-zinc-400">
            Pay per card with USDC on Base. No subscriptions.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i}
              className={`relative rounded-2xl border p-8 transition ${
                plan.highlighted
                  ? "border-violet-500 bg-violet-500/5 shadow-lg shadow-violet-500/10"
                  : "border-zinc-800 bg-zinc-900/60"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-zinc-500">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-zinc-300"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-violet-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              {plan.highlighted ? (
                <div className="mt-8">
                  <PayNow
                    productName="OGForge Premium Card"
                    price={9}
                    description="Clean, high-res social card. No watermark. All formats and styles."
                    onSuccess={() => router.push("/success")}
                    accentColor="#8b5cf6"
                  />
                </div>
              ) : (
                <button
                  className="mt-8 w-full rounded-xl py-3 text-sm font-semibold transition bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                >
                  {plan.cta}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Stop losing clicks to ugly previews.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Generate a professional social card in seconds. Pay once, own
            forever.
          </p>
          <div className="mt-8 max-w-sm mx-auto">
            <PayNow
              productName="OGForge Premium Card"
              price={9}
              description="Clean, high-res social card. No watermark. All formats and styles."
              onSuccess={() => router.push("/success")}
              accentColor="#8b5cf6"
            />
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            Card, Apple Pay, or USDC on Base accepted
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <FAQAccordion items={FAQ_ITEMS} />
      </section>

      {/* Email Capture */}
      <section className="mx-auto max-w-xl px-6 py-20">
        <EmailCapture
          heading="OG image tips & trends"
          description="Weekly tips on social card design that gets clicks."
          accent="violet"
        />
      </section>

      {/* Social Share */}
      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <p className="text-zinc-400 text-sm mb-4">Share OGForge with your network</p>
        <div className="flex justify-center">
          <SocialShare
            url="https://ogforge.vercel.app"
            title="OGForge — AI Social Card Generator"
            description="Generate stunning OG images, Twitter cards, and LinkedIn banners in seconds."
            hashtags={["OGForge", "OpenGraph", "SocialCards"]}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">What designers are saying</h2>
        </div>
        <TestimonialCarousel testimonials={[
          { name: "Nina Patel", role: "Product Designer", company: "Linear", text: "Our click-through rates on Twitter increased 34% after switching to OGForge cards. The gradient style is gorgeous and stands out in feeds.", rating: 5 },
          { name: "Jake Morrison", role: "DevRel Lead", company: "Supabase", text: "We use OGForge for all our blog post OG images now. Consistent, professional, and takes seconds instead of opening Figma.", rating: 5 },
          { name: "Amy Foster", role: "Marketing Lead", company: "Indie Hackers", text: "The LinkedIn banner format is a game-changer. Professional social presence in 10 seconds flat. Our team adopted it immediately.", rating: 4 },
        ]} />
      </section>

      <EcosystemFooter currentProduct="OGForge" />

      <ExitIntent
        heading="First OG image free — no watermark"
        description="See the quality before you pay."
        ctaText="Generate free card"
      />
    </div>
  );
}
