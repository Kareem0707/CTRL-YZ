import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-background pt-32 pb-24">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-accent mb-12">Privacy Policy</h1>
          
          <div className="space-y-8 text-foreground/80 leading-relaxed font-sans">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p>When you visit CTRL YZ, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Sharing Personal Information</h2>
              <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you. For example, we use third-party payment processors and shipping companies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Behavioral Advertising</h2>
              <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
              <p>If you are a resident of certain regions, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased.</p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
