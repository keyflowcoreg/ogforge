@AGENTS.md

# OGForge

OG image generator — create social cards for Twitter, LinkedIn, Instagram with customizable styles.

## Stack
- Next.js 16 + React 19 + TypeScript + Tailwind v4
- OG Generation: @vercel/og (Satori + Resvg)
- Payment: x402-next (USDC on Base)
- Animations: Framer Motion
- Wallet: 0xCc97e4579eeE0281947F15B027f8Cad022933d7e

## Commands
```bash
npm run dev     # Development (localhost:4009)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint
```

## Key Files
- `app/page.tsx` — Landing + generator (client component, editor + live preview)
- `app/api/generate/route.ts` — POST: x402-gated image generation ($9 USDC)
- `app/api/og/route.tsx` — OG image generation endpoint (@vercel/og)
- `app/success/page.tsx` — Post-purchase page
- `components/x402/` — Shared checkout UI (X402Checkout, PaymentSuccess)
- `app/globals.css` — Tailwind v4 theme

## Port Assignment
Production port: 4009 (fleet-manager.sh)

## Architecture
- Single-page editor with live OG image preview
- Presets: 6 colors (Violet, Rose, Cyan, Amber, Emerald, Blue)
- Styles: Gradient, Minimal, Bold, Dark Mode, Photo
- Formats: OG Image (1200x630), Twitter Card (1200x600), LinkedIn Banner (1584x396), Instagram Story (1080x1920)
- Free: 1 watermarked image/day, OG format only
- Pro ($9): unlimited, all formats, no watermark

## Payment Flow
1. User customizes OG image (title, subtitle, color, style, format)
2. Free: 1/day with watermark, OG format only
3. Clicks "Unlock Pro" → X402Checkout modal
4. Shows wallet + $9 USDC on Base
5. Verify payment → unlimited unwatermarked generation → redirect to /success

## Conventions
- Dark theme (bg-zinc-950)
- No icon libraries — use SVG/emoji
- Framer Motion for all animations
- x402 for payments (never Stripe)
- Cross-sell footer links to ecosystem products
