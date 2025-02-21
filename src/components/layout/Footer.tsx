// components/Footer.jsx
export default function Footer() {
    return (
      <footer className="py-8 px-8 text-center border-t border-white/10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <span className="text-accent font-bold text-2xl">Vbroker</span>
          </div>
          <div className="space-x-6 mb-4">
            <a href="#" className="hover:text-accent transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-accent transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors duration-300">Support</a>
          </div>
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} Vbroker. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }