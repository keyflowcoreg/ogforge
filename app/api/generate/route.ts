import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "x402-next";
import { facilitator } from "@coinbase/x402";

const handler = async (req: NextRequest) => {
  const { title, description, color, style } = await req.json();
  const html = generateCardHTML(title, description, color, style);
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
};

export const POST = withX402(
  handler,
  "0xCc97e4579eeE0281947F15B027f8Cad022933d7e",
  {
    price: "$9",
    network: "base",
    config: { description: "OGForge — Premium Social Card" },
  },
  facilitator as Parameters<typeof withX402>[3]
);

function generateCardHTML(
  title: string,
  description: string,
  color: string,
  style: string
) {
  const safeTitle = escapeHtml(title || "Your Title Here");
  const safeDesc = escapeHtml(description || "Your description goes here");
  const safeColor = escapeHtml(color || "#8b5cf6");

  const styles: Record<string, { bg: string; text: string; sub: string }> = {
    gradient: {
      bg: `linear-gradient(135deg, ${safeColor} 0%, ${safeColor}99 40%, #09090b 100%)`,
      text: "#ffffff",
      sub: "#ffffffcc",
    },
    minimal: {
      bg: "#ffffff",
      text: "#18181b",
      sub: "#71717a",
    },
    bold: {
      bg: safeColor,
      text: "#ffffff",
      sub: "#ffffffdd",
    },
    darkmode: {
      bg: "#09090b",
      text: "#fafafa",
      sub: "#a1a1aa",
    },
    photo: {
      bg: `linear-gradient(135deg, #09090b 0%, ${safeColor}44 50%, #09090b 100%)`,
      text: "#ffffff",
      sub: "#d4d4d8",
    },
  };

  const s = styles[style] || styles.gradient;
  const isGradient =
    s.bg.includes("linear-gradient") || s.bg.includes("radial-gradient");
  const bgProp = isGradient ? `background: ${s.bg}` : `background: ${s.bg}`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1200">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    ${bgProp};
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 100px;
    position: relative;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: ${safeColor};
  }
  h1 {
    font-size: 64px;
    font-weight: 900;
    color: ${s.text};
    line-height: 1.1;
    margin-bottom: 24px;
    max-width: 900px;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    color: ${s.sub};
    line-height: 1.4;
    max-width: 800px;
  }
  .badge {
    position: absolute;
    bottom: 40px;
    right: 60px;
    font-size: 16px;
    font-weight: 700;
    color: ${s.sub};
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${safeColor};
    margin-right: 8px;
    vertical-align: middle;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="accent-bar"></div>
    <h1>${safeTitle}</h1>
    <p>${safeDesc}</p>
    <div class="badge"><span class="dot"></span>OGForge</div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
