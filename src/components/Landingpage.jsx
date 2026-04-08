// Jatahe fadhil
import Navbar from './Navbar';
import Hero from './Hero';
import WhyChooseUs from './Whychooseus';
import Modul from './Modul';
import Pricing from './Pricing';

// Jatahe sakti
// import Workflow from './Workflow';
// import Gallery from './Gallery';
// import CallToAction from './Calltoaction';
// import ContactForm from './Contactform';
// import Footer from './Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Modul />
      <Pricing />
      
      {/* <Workflow />
      <Gallery />
      <CallToAction />
      <ContactForm />
      <Footer /> */}
    </div>
  );
}

export default LandingPage;