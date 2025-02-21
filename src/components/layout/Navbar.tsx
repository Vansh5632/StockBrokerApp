// components/Navbar.jsx
export default function Navbar() {
    return (
      <nav className="flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-bold text-accent">
          Vbroker
        </div>
        <div className="space-x-6">
          <a href="#features" className="hover:text-accent transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-accent transition-colors">
            Pricing
          </a>
          <a href="#contact" className="hover:text-accent transition-colors">
            Contact
          </a>
          <button className="px-4 py-2 rounded-md bg-secondary text-white">
            Login
          </button>
        </div>
      </nav>
    );
  }