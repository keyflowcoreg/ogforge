import { PrivacyPolicy } from "@/components/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy — OGForge",
  description: "How OGForge collects, uses, and protects your personal data under the GDPR.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <PrivacyPolicy
        companyName="OGForge"
        contactEmail="hello@ogforge.ai"
        websiteUrl="https://ogforge.vercel.app"
        lastUpdated="2026-03-20"
      />
    </main>
  );
}
