import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { I18nProvider } from './i18n';
import ProgressBar from './components/ProgressBar';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import WikiDemo from './components/WikiDemo';
import Comparison from './components/Comparison';
import Architecture from './components/Architecture';
import Features from './components/Features';
import Providers from './components/Providers';
import Ecosystem from './components/Ecosystem';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <I18nProvider>
      <div className="relative min-h-screen bg-[#1e1e1e] text-[#d4d4d4] overflow-x-hidden">
        <ProgressBar />
        <Header />
        <main className="pt-14">
          <Hero />
          <Philosophy />
          <WikiDemo />
          <Comparison />
          <Architecture />
          <Features />
          <Ecosystem />
          <Providers />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}

export default App;