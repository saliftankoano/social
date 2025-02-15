"use client";
import ClientSection from "@/components/landing/client-section";
import HeroSection from "@/components/landing/hero-section";
import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";
import { BeamContainer } from "@/components/landing/beam-container";
export default function Page() {
  return (
    <>
      <HeroSection />
      <ClientSection />
      <SphereMask />
      <BeamContainer />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  );
}
