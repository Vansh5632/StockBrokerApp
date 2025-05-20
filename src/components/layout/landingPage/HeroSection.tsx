// components/Hero.jsx
'use client';

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <section className="relative pt-24 md:pt-32 pb-20 px-4 overflow-hidden">
      {/* Advanced background with multiple gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/90 via-primary to-primary/95">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/5 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Content section */}
          <div className="flex-1 text-left md:pr-8">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
              <p className="text-xs md:text-sm font-medium text-accent">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                Trade smarter, not harder
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              <span className="text-accent leading-tight">Elevate</span> Your Trading 
              <span className="block mt-2">Experience with <span className="text-accent">Vbroker</span></span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-300">
              Unlock powerful trading tools, real-time insights, and seamless execution. 
              Your all-in-one platform for the modern investor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {!session && (
                <button 
                  onClick={() => signIn('google')}
                  className="px-8 py-4 text-lg rounded-full font-semibold bg-gradient-to-r from-secondary to-secondary/80 text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.607,1.972-2.101,3.467-4.26,3.866c-3.431,0.635-6.862-1.865-7.19-5.339c-0.34-3.595,2.479-6.62,6.005-6.62c1.002,0,1.946,0.246,2.777,0.679c0.757,0.395,1.683,0.236,2.286-0.366l0,0c0.954-0.954,0.701-2.563-0.498-3.179c-1.678-0.862-3.529-1.349-5.5-1.349c-6.728,0-12.118,5.724-11.312,12.579c0.731,6.206,6.194,10.807,12.476,10.807c6.467,0,11.977-4.996,12.476-11.491c0.107-1.395-0.993-2.57-2.388-2.57h-5.81C13.4,11.077,12.545,11.933,12.545,12.151z"/>
                    </svg>
                    Get Started with Google
                  </span>
                </button>
              )}
              
              <a href="#features" className="px-8 py-4 text-lg rounded-full font-semibold bg-transparent border border-white/20 text-white hover:bg-white/5 transition-all duration-300 text-center">
                Explore Features
              </a>
            </div>
            
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-primary bg-gray-${200 + (i * 100)} overflow-hidden`}></div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-accent font-semibold">1,200+</span> traders joined last month
              </p>
            </div>
          </div>
          
          {/* Visual section */}
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-accent/30 rounded-full blur-3xl opacity-30"></div>
              <div className="relative h-full w-full rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/90 via-gray-900/60 to-gray-900/90 backdrop-blur-xl p-8 shadow-2xl overflow-hidden">
                {/* Decorative grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Chart simulation */}
                  <div className="w-full h-3/5 relative">
                    <div className="absolute top-0 right-0 p-2 bg-green-500/10 rounded-lg text-green-400 text-xs">+12.4%</div>
                    <div className="w-full h-full flex items-end">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-[4.166%] mx-px ${i % 2 === 0 ? 'bg-green-500' : 'bg-green-400'}`} 
                          style={{ 
                            height: `${15 + Math.random() * 70}%`,
                            opacity: i < 20 ? 0.7 : 1,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Trading UI mockup */}
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-300">NVDA</span>
                      <span className="text-green-500 text-sm font-medium">$980.42</span>
                    </div>
                    <div className="flex justify-between gap-3 mt-2">
                      <button className="flex-1 bg-green-500/20 text-green-400 rounded-lg py-2 text-sm">Buy</button>
                      <button className="flex-1 bg-red-500/20 text-red-400 rounded-lg py-2 text-sm">Sell</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}