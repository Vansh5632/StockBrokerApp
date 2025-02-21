// components/CTA.jsx
'use client';

import { useSession, signIn } from "next-auth/react";

export default function CTA() {
  const { data: session } = useSession();

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="glow-bg" />
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent animate-float">
          Ready to Start Trading?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of traders and experience the future of stock trading.
        </p>
        {!session && (
          <button 
            onClick={() => signIn('google')}
            className="px-8 py-3 text-lg rounded-md font-semibold bg-secondary text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] animate-glow"
          >
            Sign Up with Google
          </button>
        )}
      </div>
    </section>
  );
}