import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <Services preview />
    </main>
  );
}