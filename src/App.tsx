import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { PageTransition } from '@/components/layout/PageTransition';
import { Loader } from '@/components/layout/Loader';
import { Home } from '@/pages/Home';
import { Services } from '@/pages/Services';
import { About } from '@/pages/About';
import { Quote } from '@/pages/Quote';
import { Tracking } from '@/pages/Tracking';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();
  const is404 = !['/', '/services', '/about', '/quote', '/track', '/contact'].includes(
    location.pathname,
  );

  return (
    <>
      <Navbar />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/track" element={<Tracking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      {!is404 && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-ink-900 noise">
      <Loader />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
