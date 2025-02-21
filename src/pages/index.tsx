// app/page.jsx
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/landingPage/HeroSection';
import Features from '../components/layout/landingPage/Features';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}