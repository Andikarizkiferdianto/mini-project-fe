// Jatahe fadhil
import Navbar from './Navbar';
import Hero from './Hero';
// import WhyChooseUs from './Whychooseus';
// import Modul from './Modul';
// import Pricing from './Pricing';

// Jatahe sakti
import Workflow from './Workflow';
import Gallery from './Gallery';
import CallToAction from './Calltoaction';
import ContactForm from './Contactform';
import Footer from './Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />
      <Hero />
      {/* <WhyChooseUs />
      <Modul />
      <Pricing /> */}
      
      <Workflow />
      <Gallery />
      <section id="kontak" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden border border-slate-100 bg-white">
            <div className="lg:w-2/3 order-2 lg:order-1">
              <ContactForm />
            </div>

            <div className="lg:w-1/3 order-1 lg:order-2">
              <CallToAction />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;