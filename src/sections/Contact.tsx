import { motion } from 'framer-motion';

export const Contact = () => {
  return (
    <footer id="contact" className="py-24 border-t-0">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-20">
        <span className="w-8 h-[1px] bg-white/20" />
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30">
          Get in touch
        </span>
      </div>

      {/* Big CTA heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-white tracking-tight leading-[0.9] mb-20"
      >
        Start a<br />Conversation
      </motion.h2>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-base font-sans leading-relaxed text-white/45 max-w-sm mb-12">
            Currently available for select freelance opportunities and full-time collaborations. Let's build something exceptional together.
          </p>

          <div className="space-y-4 pt-4">
            <a
              href="mailto:alonso.humberto0401@gmail.com"
              className="group flex items-center gap-5 border border-white/10 p-5 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <div className="w-10 h-10 border border-white/10 group-hover:border-black/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30 group-hover:text-black/50 block mb-0.5 transition-colors duration-300">Email</span>
                <p className="text-sm font-sans text-white/70 group-hover:text-black transition-colors duration-300">
                  alonso.humberto0401@gmail.com
                </p>
              </div>
            </a>

            <a
              href="tel:+524491245952"
              className="group flex items-center gap-5 border border-white/10 p-5 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <div className="w-10 h-10 border border-white/10 group-hover:border-black/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30 group-hover:text-black/50 block mb-0.5 transition-colors duration-300">Phone</span>
                <p className="text-sm font-sans text-white/70 group-hover:text-black transition-colors duration-300">
                  +52 (449) 124 5952
                </p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { id: 'name', type: 'text', placeholder: 'Full Name' },
            { id: 'email', type: 'email', placeholder: 'Email Address' },
          ].map((field) => (
            <div key={field.id}>
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                className="w-full bg-transparent border-b border-white/20 focus:border-white transition-colors duration-300 py-4 font-sans text-base text-white focus:outline-none placeholder:text-white/20"
              />
            </div>
          ))}

          <div>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell me about your project..."
              className="w-full bg-transparent border-b border-white/20 focus:border-white transition-colors duration-300 py-4 font-sans text-base text-white focus:outline-none resize-none placeholder:text-white/20"
            />
          </div>

          <button
            type="submit"
            className="group relative px-10 py-5 bg-white text-black text-[11px] font-mono uppercase tracking-[0.3em] overflow-hidden w-full flex items-center justify-center gap-3 transition-colors duration-300 hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-3">
               Send Message
               <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
            </span>
            <div className="absolute inset-0 bg-black scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 z-0" />
            <div className="absolute inset-0 border border-white z-0" />
          </button>
        </motion.form>
      </div>

      {/* Footer / Copyright */}
      <div className="mt-32 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
          © {new Date().getFullYear()} Humberto Alonso López
        </p>
        <p className="text-[10px] font-sans text-white/40">
          Developed with <span className="text-white">React, Tailwind & Framer Motion</span>
        </p>
      </div>
    </footer>
  );
};
