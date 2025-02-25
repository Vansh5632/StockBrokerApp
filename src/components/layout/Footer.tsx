export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Logo and Description */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-accent font-bold text-3xl mb-3">Vbroker</span>
          <p className="text-gray-400 max-w-md text-center">
            Your trusted partner in financial market analysis and trading solutions.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 mb-8">
          <a 
            href="#" 
            className="text-gray-300 hover:text-accent transition-colors duration-300 
            border-b-2 border-transparent hover:border-accent pb-1"
          >
            Terms
          </a>
          <a 
            href="#" 
            className="text-gray-300 hover:text-accent transition-colors duration-300 
            border-b-2 border-transparent hover:border-accent pb-1"
          >
            Privacy
          </a>
          <a 
            href="#" 
            className="text-gray-300 hover:text-accent transition-colors duration-300 
            border-b-2 border-transparent hover:border-accent pb-1"
          >
            Support
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Vbroker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}