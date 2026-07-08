import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Statistics from './components/Statistics';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-background">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Portfolio />
        <Statistics />
        <Contact />
      </main>
    </div>
  );
}

export default App;
