import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-background pt-32 pb-24">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-accent mb-12">Return Policy</h1>
          
          <div className="space-y-8 text-foreground/80 leading-relaxed font-sans">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Returns</h2>
              <p>Our policy lasts 14 days. If 14 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Refunds (if applicable)</h2>
              <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Exchanges (if applicable)</h2>
              <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at contact@ctrlyz.com.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Shipping</h2>
              <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
