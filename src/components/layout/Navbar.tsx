// components/Navbar.jsx
export default function Navbar() {
    return (
      <nav className="fixed w-full z-50 bg-primary/80 backdrop-blur-md px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-accent animate-pulse">
            Vbroker
          </div>
          <div className="space-x-6 flex items-center">
            <a href="#features" className="hover:text-accent transition-colors duration-300">
              Features
            </a>
            <a href="#testimonials" className="hover:text-accent transition-colors duration-300">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-accent transition-colors duration-300">
              Contact
            </a>
            <button className="px-4 py-2 rounded-md bg-secondary text-white hover:bg-secondary/80 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              Login
            </button>
          </div>
        </div>
      </nav>
    );
  }