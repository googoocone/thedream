import HeroSection from "@/components/HeroSection";
import ScholarshipList from "@/components/ScholarshipList";
import ProcessSection from "@/components/home/ProcessSection";
import CategorySection from "@/components/home/CategorySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ProcessSection />
      <CategorySection />
      <div className="bg-gray-50">
        <ScholarshipList />
      </div>
    </main>
  );
}

