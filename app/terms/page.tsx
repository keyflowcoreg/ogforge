import { TermsOfService } from "@/components/TermsOfService";

export const metadata = {
  title: "Terms of Service — OGForge",
  description: "Terms and conditions for using the OGForge AI social card generator.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <TermsOfService
        companyName="OGForge"
        productName="OGForge"
        contactEmail="hello@ogforge.ai"
        websiteUrl="https://ogforge.vercel.app"
        lastUpdated="2026-03-20"
      />
    </main>
  );
}
