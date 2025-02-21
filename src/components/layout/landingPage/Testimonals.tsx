// components/Testimonials.jsx
export default function Testimonials() {
    const testimonials = [
      {
        name: "John D.",
        role: "Active Trader",
        quote: "Vbroker transformed my trading experience with its intuitive interface and real-time insights.",
      },
      {
        name: "Sarah M.",
        role: "Investor",
        quote: "The analytics tools are a game-changer. I make better decisions faster.",
      },
    ];
  
    return (
      <section id="testimonials" className="py-20 px-8 relative overflow-hidden">
        <div className="glow-bg" />
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent animate-[fadeIn_0.5s_ease-in]">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-accent">{testimonial.name}</p>
                  <p className="text-sm opacity-75">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }