import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NewsletterCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-linear-to-r from-brown-accent to-brown-dartext-brown-dark rounded-3xl p-12 text-center shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Jangan Lewatkan Update Terbaru!
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Dapatkan tips bisnis, artikel inspiratif, dan insight eksklusif
              langsung ke email Anda setiap minggu
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-6 py-4 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 outline-none focus:border-white/60 transition-all"
              />
              <button className="bg-white hover:bg-white/90 text-brown-dark font-bold rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-white/60 mt-4">
              Gratis • Tanpa spam • Bisa unsubscribe kapan saja
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
