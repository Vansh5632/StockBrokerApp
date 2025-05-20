// components/Testimonials.jsx
export default function Testimonials() {
  const testimonials = [
    {
      name: "John D.",
      role: "Active Trader",
      company: "InvestTech Corp",
      quote: "Vbroker transformed my trading experience with its intuitive interface and real-time insights. I've increased my portfolio returns by 18% since I started using it.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah M.",
      role: "Investor",
      company: "Growth Capital",
      quote: "The analytics tools are a game-changer. I make better decisions faster and have significantly improved my risk management approach.",
      rating: 5, 
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "David L.",
      role: "Day Trader",
      company: "Independent",
      quote: "As someone who trades daily, having real-time data that I can trust is essential. Vbroker delivers exactly what I need when I need it.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/86.jpg"
    },
    {
      name: "Elena P.",
      role: "Financial Advisor",
      company: "Wealth Partners",
      quote: "I've recommended Vbroker to all my clients. The platform's portfolio visualization makes it easy to explain complex strategies.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/90"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 -left-12 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Decorative dots pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Trusted by <span className="text-accent">Thousands</span> of Traders
          </h2>
          <p className="text-gray-300 text-lg">
            Hear what our users have to say about their experience with Vbroker
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="mb-16 p-1 rounded-2xl bg-gradient-to-r from-secondary/50 via-accent/50 to-secondary/50">
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-xl border border-white/10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/10">
                  <img 
                    src={testimonials[0].image} 
                    alt={testimonials[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-secondary text-white text-xs px-3 py-1 rounded-full">
                  VIP Member
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl font-light text-white mb-6 relative">
                  <svg className="absolute -top-4 -left-4 h-8 w-8 text-accent/30" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8v12H2V14c0-3.3 2.7-6 6-6h2zm20 0v12h-8V14c0-3.3 2.7-6 6-6h2z"/>
                  </svg>
                  "{testimonials[0].quote}"
                </blockquote>
                
                <div>
                  <p className="text-lg font-semibold text-accent">{testimonials[0].name}</p>
                  <p className="text-gray-400">
                    {testimonials[0].role} at {testimonials[0].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(1).map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="bg-white/10 p-1.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582a1 1 0 00-.646.942v4.3a3 3 0 001.896 2.793l.91.303a8.001 8.001 0 007.589-1.891l.744-.744A1 1 0 0014 9.572V7a1 1 0 00-.553-.894l-3-1.5A1 1 0 0010 5V3a1 1 0 00-1-1H5a1 1 0 100 2h4z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M7.25 12.25a.75.75 0 100-1.5.75.75 0 000 1.5zm4.25 1.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
              
              <div className="pt-4 border-t border-white/10 text-sm text-gray-400 flex justify-between items-center">
                <span>{testimonial.company}</span>
                <span className="text-accent">Verified User</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA banner */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 mb-6">
            Join thousands of satisfied traders who've transformed their trading experience
          </p>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-secondary to-secondary/80 text-white font-medium hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300">
            Start Trading Today
          </button>
        </div>
      </div>
    </section>
  );
}