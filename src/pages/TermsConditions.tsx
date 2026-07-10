import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function TermsConditions() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-background pt-32 pb-24">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-accent mb-12">Terms & Conditions</h1>
          
          <div className="space-y-8 text-foreground/80 leading-relaxed font-sans">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Overview</h2>
              <p>This website is operated by CTRL YZ. Throughout the site, the terms “we”, “us” and “our” refer to CTRL YZ. CTRL YZ offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Online Store Terms</h2>
              <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Accuracy of Information</h2>
              <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions.</p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
