// app/page.jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/landingPage/HeroSection';
import Features from '../components/layout/landingPage/Features';
import Footer from '../components/layout/Footer';
import Testimonials from '@/components/layout/landingPage/Testimonals';
import CTA from '@/components/layout/landingPage/CTA';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CTA/>
        <Testimonials/>
      </main>
      <Footer />
    </div>
  );
}
