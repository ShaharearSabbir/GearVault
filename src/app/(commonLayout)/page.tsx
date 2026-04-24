import CTA from "@/components/commonLayout/home/CTA";
import FeatureGrid from "@/components/commonLayout/home/FeatureGrid";
import Hero from "@/components/commonLayout/home/Hero";
import StatsBar from "@/components/commonLayout/home/StatsBar";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsBar />
      <FeatureGrid />
      <CTA />
    </main>
  );
}
