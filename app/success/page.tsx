'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CROSS_SELL = [
  { name: 'PromptForge', href: 'https://promptforge.com', desc: '200+ production AI prompts', price: '$19' },
  { name: 'SiteForge', href: 'https://siteforge.com', desc: 'AI landing pages in seconds', price: '$9' },
  { name: 'CryptoPayKit', href: 'https://cryptopaykit.com', desc: 'x402 developer templates', price: '$29' },
  { name: 'RulesForge', href: 'https://rulesforge.com', desc: 'AI coding rules for your team', price: '$14' },
]

export default function SuccessPage() {
  const [showCheck, setShowCheck] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowCheck(true), 300)
    const t2 = setTimeout(() => setShowContent(true), 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleDownload = async () => {
    try {
      const res = await fetch('/api/download')
      if (!res.ok) throw new Error('Download failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'og-card.png'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Download failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] relative overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes confetti-fall-2 {
          0% { transform: translateY(-100vh) rotate(0deg) scale(0.8); opacity: 1; }
          100% { transform: translateY(100vh) rotate(-540deg) scale(0.3); opacity: 0; }
        }
        .confetti-piece {
          position: fixed;
          top: -20px;
          z-index: 50;
          pointer-events: none;
        }
        @keyframes check-draw {
          0% { stroke-dashoffset: 50; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circle-fill {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-check-draw {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: check-draw 0.5s ease-out 0.5s forwards;
        }
        .animate-circle-fill {
          animation: circle-fill 0.5s ease-out forwards;
        }
        .animate-fade-up {
          opacity: 0;
          animation: fade-up 0.5s ease-out forwards;
        }
      `}</style>

      {/* Confetti particles */}
      {showCheck && Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            backgroundColor: ['#8B5CF6', '#A78BFA', '#C084FC', '#7C3AED', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'][i % 8],
            borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '0',
            animation: `${i % 2 === 0 ? 'confetti-fall' : 'confetti-fall-2'} ${2 + Math.random() * 3}s ease-out ${Math.random() * 1.5}s forwards`,
          }}
        />
      ))}

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Checkmark */}
        <div className="flex justify-center mb-8">
          <div className={`w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center ${showCheck ? 'animate-circle-fill' : 'opacity-0'}`}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="#10B981" strokeWidth="3" opacity="0.3" />
              <path
                d="M14 24L21 31L34 18"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className={showCheck ? 'animate-check-draw' : ''}
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        {showContent && (
          <div className="text-center mb-10 animate-fade-up">
            <h1 className="text-3xl font-bold mb-3">Payment Confirmed!</h1>
            <p className="text-zinc-400 text-lg">Your social card is ready</p>
          </div>
        )}

        {/* Card preview mockup */}
        {showContent && (
          <div className="animate-fade-up mb-6" style={{ animationDelay: '0.1s' }}>
            <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#3f3f46]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                <span className="ml-3 text-xs text-zinc-500">og-card.png &mdash; 1200 x 630</span>
              </div>
              <div className="aspect-[1200/630] bg-gradient-to-br from-violet-600/20 via-[#18181b] to-fuchsia-600/20 flex items-center justify-center p-8">
                <div className="text-center space-y-3">
                  <div className="h-5 bg-violet-500/20 rounded w-48 mx-auto" />
                  <div className="h-3 bg-zinc-700 rounded w-64 mx-auto" />
                  <div className="h-3 bg-zinc-700 rounded w-40 mx-auto" />
                  <div className="mt-4 flex justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20" />
                    <div className="w-8 h-8 rounded-full bg-fuchsia-500/20" />
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Download button */}
        {showContent && (
          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <button
              onClick={handleDownload}
              className="w-full bg-violet-500 hover:bg-violet-600 text-white py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-3 mb-4"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PNG
            </button>
          </div>
        )}

        {/* Formats info */}
        {showContent && (
          <div className="animate-fade-up mb-10" style={{ animationDelay: '0.2s' }}>
            <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-5 mt-4">
              <p className="text-sm font-semibold text-violet-400 mb-3">Your card details:</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                  High-resolution PNG &mdash; no watermark
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                  Optimized for Open Graph (1200 x 630)
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                  Works on Twitter, LinkedIn, Facebook, Discord
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                  Ready to upload &mdash; no editing needed
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* CTA */}
        {showContent && (
          <div className="animate-fade-up mb-16" style={{ animationDelay: '0.25s' }}>
            <Link
              href="/"
              className="block text-center bg-[#18181b] border border-[#3f3f46] hover:border-violet-500/40 text-violet-400 py-4 rounded-xl font-semibold transition-colors"
            >
              Create another &rarr;
            </Link>
          </div>
        )}

        {/* Cross-sell */}
        {showContent && (
          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="border-t border-[#3f3f46] pt-10">
              <p className="text-sm text-zinc-500 text-center mb-6">More tools from the Forge ecosystem</p>
              <div className="grid grid-cols-2 gap-3">
                {CROSS_SELL.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#18181b] border border-[#3f3f46] rounded-lg p-4 hover:border-violet-500/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm group-hover:text-violet-400 transition-colors">{item.name}</span>
                      <span className="text-xs text-violet-500">{item.price}</span>
                    </div>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
