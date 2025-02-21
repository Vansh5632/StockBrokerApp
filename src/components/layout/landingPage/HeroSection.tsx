// components/Hero.jsx
export default function HeroSection() {
    return (
      <section className="flex flex-col items-center text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 text-accent">
          Trade Smart with Vbroker
        </h1>
        <p className="text-xl max-w-2xl mb-8">
          Your ultimate stock trading companion. Real-time insights, 
          powerful tools, and seamless execution.
        </p>
        <button className="px-8 py-3 text-lg rounded-md font-semibold bg-secondary text-white">
          Get Started
        </button>
      </section>
    );
  }