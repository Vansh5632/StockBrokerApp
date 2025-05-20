// components/CTA.jsx
'use client';

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function CTA() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd handle the signup process here
    signIn('google');
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 overflow-hidden">
      {/* Enhanced background with animated gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/90"></div>
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(40deg,transparent,transparent_65%,rgba(37,99,235,0.3)_75%,transparent_95%)] animate-[gradient-shift_15s_ease_infinite]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(37,99,235,0.2),transparent_50%)]"></div>
      </div>
      
      {/* Animated decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/15 rounded-full filter blur-3xl"></div>
      
      <div className="relative max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-2">
          <div className="rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 p-10 sm:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Content */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                  Ready to Transform Your<br /> 
                  <span className="bg-gradient-to-r from-accent via-white to-secondary bg-clip-text text-transparent">
                    Trading Experience?
                  </span>
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300">Real-time data and advanced analytics at your fingertips</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300">Intuitive portfolio management tools</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300">Free trial with $10,000 in virtual funds to practice</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-gradient-to-br from-gray-400 to-gray-600 overflow-hidden">
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">
                    Join <span className="text-accent font-semibold">1,200+</span> traders today
                  </p>
                </div>
              </div>
              
              {/* Sign-up form */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Get Started for Free</h3>
                
                {!session ? (
                  <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-white placeholder-gray-500"
                          required
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
                      >
                        Create Free Account
                      </button>
                    </form>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => signIn('google')}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`w-full py-3 px-6 rounded-lg border border-white/10 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative ${
                        isHovered ? 'bg-white/10' : 'bg-white/5'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}></div>
                      <svg className="h-5 w-5 relative z-10" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span className="relative z-10">Google</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary/30 text-white rounded-full mx-auto flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Welcome Back!</h3>
                    <p className="text-gray-300 mb-6">You're already signed in as {session.user?.name}</p>
                    <a
                      href="/dashboard"
                      className="inline-block py-3 px-6 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
                    >
                      Go to Dashboard
                    </a>
                  </div>
                )}
                
                <div className="mt-6 text-xs text-gray-400 text-center">
                  By signing up, you agree to our 
                  <a href="#" className="text-accent hover:underline mx-1">Terms</a>
                  and
                  <a href="#" className="text-accent hover:underline mx-1">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}