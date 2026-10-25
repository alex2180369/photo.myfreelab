import { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleChoosePackage = (packageName) => {
    setSelectedPackage(packageName);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <a className="skip-link" href="#top">
        Перейти к содержимому
      </a>
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Pricing onChoose={handleChoosePackage} />
        <Testimonials />
        <Contact selectedPackage={selectedPackage} />
      </main>
      <Footer />
    </>
  );
}
