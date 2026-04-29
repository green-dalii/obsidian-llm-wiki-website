import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { I18nProvider } from './i18n';
import ProgressBar from './components/ProgressBar';
import Header from './components/Header';
import Hero from './components/Hero';
import WikiDemo from './components/WikiDemo';
import Comparison from './components/Comparison';
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
      <div className="relative min-h-screen bg-obsidian-bg text-obsidian-text overflow-x-hidden">
        <ProgressBar />
        <Header />
        <main className="pt-14">
          <Hero />
          <Comparison />
          <WikiDemo />
          <div className="h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-obsidian-purple/20 to-transparent" />
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