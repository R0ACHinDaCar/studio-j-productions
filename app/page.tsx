import { motion } from "framer-motion";
import Image from "next/image";


import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";


export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
    </main>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <Services preview />
    </main>
  );
}