import HeroSection from "@/components/HeroSection";
import ScholarshipList from "@/components/ScholarshipList";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <div className="bg-gray-50">
        <ScholarshipList />
      </div>
    </main>
  );
}

