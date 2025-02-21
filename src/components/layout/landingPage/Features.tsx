export default function Features() {
    const features = [
      {
        title: "Real-time Data",
        description: "Get up-to-the-minute market updates and price movements."
      },
      {
        title: "Advanced Analytics",
        description: "Powerful tools to analyze stocks and make informed decisions."
      },
      {
        title: "Mobile Trading",
        description: "Trade on-the-go with our intuitive mobile app."
      }
    ];
  
    return (
      <section id="features" className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-accent">
          Why Choose Vbroker?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg bg-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }