// components/Features.jsx
export default function Features() {
    const features = [
      {
        title: "Real-time Data",
        description: "Get up-to-the-minute market updates and price movements.",
      },
      {
        title: "Advanced Analytics",
        description: "Powerful tools to analyze stocks and make informed decisions.",
      },
      {
        title: "Mobile Trading",
        description: "Trade on-the-go with our intuitive mobile app.",
      },
    ];
  
    return (
      <section id="features" className="py-20 px-8 relative overflow-hidden">
        <div className="glow-bg" />
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent animate-[fadeIn_0.5s_ease-in]">
            Why Choose Vbroker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }