// components/Features.jsx
export default function Features() {
  const features = [
    {
      title: "Real-time Market Data",
      description: "Get up-to-the-minute market updates and price movements with our enterprise-grade data feeds.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "from-blue-600/20 to-blue-400/5",
      textColor: "text-blue-400",
    },
    {
      title: "Advanced Analytics",
      description: "Make data-driven decisions with powerful tools designed for both beginners and professionals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "from-purple-600/20 to-purple-400/5",
      textColor: "text-purple-400",
    },
    {
      title: "Mobile Trading",
      description: "Execute trades anytime, anywhere with our intuitive mobile app that keeps you connected to markets.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-green-600/20 to-green-400/5",
      textColor: "text-green-400",
    },
    {
      title: "Portfolio Management",
      description: "Track performance, analyze diversification, and optimize your investments all in one place.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-amber-600/20 to-amber-400/5",
      textColor: "text-amber-400",
    },
    {
      title: "Risk Assessment",
      description: "Understand potential risks with advanced metrics and simulations before executing trades.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: "from-red-600/20 to-red-400/5",
      textColor: "text-red-400",
    },
    {
      title: "AI-Driven Insights",
      description: "Get personalized recommendations and market insights powered by machine learning algorithms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: "from-cyan-600/20 to-cyan-400/5",
      textColor: "text-cyan-400",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary to-primary/90"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Platform Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Everything You Need to <span className="text-accent">Trade Like a Pro</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Vbroker combines powerful tools with an intuitive interface to help you make better trading decisions
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className={`absolute w-32 h-32 -top-3 -left-3 rounded-full bg-gradient-to-r ${feature.color} opacity-20 filter blur-2xl group-hover:opacity-40 transition-all duration-500`}></div>
              
              {/* Feature icon */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-6 bg-gradient-to-br ${feature.color} ${feature.textColor} p-2.5`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
              
              <div className="mt-8 flex justify-between items-center">
                <div className={`text-sm font-medium ${feature.textColor}`}>
                  Learn more
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${feature.textColor} transform group-hover:translate-x-1 transition-transform duration-300`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}