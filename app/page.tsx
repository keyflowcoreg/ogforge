"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X402Checkout } from "@/components/x402/X402Checkout";

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

const CROSS_SELL = [
  {
    name: "PageForge",
    desc: "AI landing pages in 60 seconds",
    href: "https://pageforge.ai",
  },
  {
    name: "RulesForge",
    desc: "AI cursor rules for any framework",
    href: "https://rulesforge.ai",
  },
  {
    name: "SiteForge",
    desc: "Full website generation with AI",
    href: "https://siteforge.ai",
  },
  {
    name: "CryptoPayKit",
    desc: "Accept crypto payments in minutes",
    href: "https://cryptopaykit.com",
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
        <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400 mb-6">
              AI-Powered Social Cards
            </span>
          </motion.div>
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            Your links look boring.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Fix that in 10 seconds.
            </span>
          </motion.h1>
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
            <a
              href="#preview"
              className="rounded-xl bg-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-500 hover:shadow-violet-500/40"
            >
              Try the Editor
            </a>
            <a
              href="#pricing"
              className="rounded-xl border border-zinc-700 px-8 py-3.5 text-base font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              See Pricing
            </a>
          </motion.div>
        </div>
      </section>

      {/* Live Preview Editor */}
      <section id="preview" className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
            whileInView="visible"
            viewport={{ once: true }}
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
            whileInView="visible"
            viewport={{ once: true }}
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
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-center transition hover:border-violet-500/40 hover:bg-zinc-900"
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
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
              whileInView="visible"
              viewport={{ once: true }}
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
                <X402Checkout
                  endpoint="/api/generate"
                  method="POST"
                  productName="OGForge Premium Card"
                  price="$9"
                  description="Clean, high-res social card. No watermark. All 4 formats and 5 styles included."
                  onSuccess={() => router.push("/success")}
                  accentColor="#8b5cf6"
                >
                  <button
                    className="mt-8 w-full rounded-xl py-3 text-sm font-semibold transition bg-violet-600 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-500"
                  >
                    {plan.cta}
                  </button>
                </X402Checkout>
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
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
          <X402Checkout
            endpoint="/api/generate"
            method="POST"
            productName="OGForge Premium Card"
            price="$9"
            description="Clean, high-res social card. No watermark. All 4 formats and 5 styles included."
            onSuccess={() => router.push("/success")}
            accentColor="#8b5cf6"
          >
            <button className="mt-8 rounded-xl bg-violet-600 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-500 hover:shadow-violet-500/40">
              Generate Your Card — $9
            </button>
          </X402Checkout>
          <p className="mt-3 text-sm text-zinc-500">
            Paid with USDC on Base via x402 protocol
          </p>
        </motion.div>
      </section>

      {/* Cross-sell Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/40">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-zinc-500 mb-8">
            More from AI Business Factory
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CROSS_SELL.map((product) => (
              <a
                key={product.name}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-violet-500/30 hover:bg-zinc-800/80"
              >
                <p className="font-semibold text-white group-hover:text-violet-400 transition">
                  {product.name}
                </p>
                <p className="mt-1 text-sm text-zinc-500">{product.desc}</p>
              </a>
            ))}
          </div>
          <div className="mt-12 text-center text-sm text-zinc-600">
            OGForge by AI Business Factory
          </div>
        </div>
      </footer>
    </div>
  );
}
