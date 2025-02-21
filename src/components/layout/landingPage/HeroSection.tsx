// components/Hero.jsx
'use client';

import { useSession, signIn } from "next-auth/react";

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="glow-bg" />
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-accent animate-float">
          Trade Smart with Vbroker
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-90 animate-[fadeIn_1s_ease-in]">
          Your ultimate stock trading companion. Real-time insights, 
          powerful tools, and seamless execution.
        </p>
        {!session && (
          <button 
            onClick={() => signIn('google')}
            className="px-8 py-3 text-lg rounded-md font-semibold bg-secondary text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] animate-glow"
          >
            Get Started with Google
          </button>
        )}
      </div>
    </section>
  );
}