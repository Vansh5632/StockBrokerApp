import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-primary to-gray-900 pt-16 pb-12 px-4 sm:px-8">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent"></div>
      <div className="absolute -top-40 left-0 w-72 h-72 bg-secondary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Logo and main info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-secondary to-accent overflow-hidden flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold">
                <span className="text-accent">V</span>
                <span className="text-white">broker</span>
              </span>
            </div>
            
            <p className="text-gray-400 max-w-md">
              Your trusted partner in financial market analysis and trading solutions. 
              Providing sophisticated tools with an intuitive user experience.
            </p>
            
            <div className="flex gap-4">
              {/* Social Media Icons */}
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Footer navigation columns */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Products</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Market Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Trading Platform</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Portfolio Tracker</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Mobile App</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Trading Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Market News</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">Blog</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-white/10 pt-10 pb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center">
            <div className="max-w-md">
              <h3 className="text-white font-semibold text-lg mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-400 text-sm">Get the latest news and updates from the world of trading, directly to your inbox.</p>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/40 min-w-[200px]"
                />
                <button className="px-4 py-2.5 bg-accent text-primary rounded-lg font-medium hover:bg-accent/90 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Final footer with links and copyright */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {currentYear} Vbroker. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="text-sm text-gray-400 hover:text-accent transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-accent transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-accent transition-colors duration-200">Cookie Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-accent transition-colors duration-200">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}