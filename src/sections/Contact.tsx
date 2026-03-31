import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { SectionHeader } from '../components/ui/SectionHeader';

export const Contact = () => {
  const { t, language } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('http://portfolio-n8nwithpostgres-0fb047-93-188-167-69.traefik.me/webhook/c1f3b49a-442c-4fb7-9ba5-b369b1144334', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="py-24 border-t-0">
      <SectionHeader subtitle={t('contact.subtitle')} />

      {/* Big CTA heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-[var(--text-primary)] tracking-tight leading-[0.9] mb-20"
      >
        {language === 'es' ? (
          <>Empieza una<br />Conversación</>
        ) : (
          <>Start a<br />Conversation</>
        )}
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
          <p className="text-base font-sans leading-relaxed text-[var(--text-primary)]/80 max-w-sm mb-12">
            {t('contact.description')}
          </p>

          <div className="space-y-4 pt-4">
            <a
              href="mailto:alonso.humberto0401@gmail.com"
              className="group flex items-center gap-5 border border-[var(--border-color)] p-5 hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300"
            >
              <div className="w-10 h-10 border border-[var(--border-color)] group-hover:border-[var(--bg-primary)]/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent group-hover:text-[var(--bg-primary)]/60 block mb-0.5 transition-colors duration-300">{t('contact.emailLink')}</span>
                <p className="text-sm font-sans text-[var(--text-primary)]/90 group-hover:text-[var(--bg-primary)] transition-colors duration-300">
                  alonso.humberto0401@gmail.com
                </p>
              </div>
            </a>

            <a
              href="tel:+524491245952"
              className="group flex items-center gap-5 border border-[var(--border-color)] p-5 hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300"
            >
              <div className="w-10 h-10 border border-[var(--border-color)] group-hover:border-[var(--bg-primary)]/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent group-hover:text-[var(--bg-primary)]/60 block mb-0.5 transition-colors duration-300">{t('contact.phoneLink')}</span>
                <p className="text-sm font-sans text-[var(--text-primary)]/90 group-hover:text-[var(--bg-primary)] transition-colors duration-300">
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
          onSubmit={handleSubmit}
        >
          {[
            { id: 'name', type: 'text', placeholder: t('contact.form.name') },
            { id: 'email', type: 'email', placeholder: t('contact.form.email') },
          ].map((field) => (
            <div key={field.id}>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required
                className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-accent transition-colors duration-300 py-4 font-sans text-base text-[var(--text-primary)] focus:outline-none placeholder:text-[var(--text-primary)]/40"
              />
            </div>
          ))}

          <div>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder={t('contact.form.message')}
              className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-accent transition-colors duration-300 py-4 font-sans text-base text-[var(--text-primary)] focus:outline-none resize-none placeholder:text-[var(--text-primary)]/40"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative px-10 py-5 bg-accent text-white text-[11px] font-mono uppercase tracking-[0.3em] overflow-hidden w-full flex items-center justify-center gap-3 transition-colors duration-300 hover:text-[var(--bg-primary)] shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center gap-3">
               {isSubmitting ? (language === 'es' ? 'Enviando...' : 'Sending...') : submitStatus === 'success' ? (language === 'es' ? '¡Enviado!' : 'Sent!') : submitStatus === 'error' ? 'Error' : t('contact.form.send')}
               {!isSubmitting && submitStatus === 'idle' && (
                 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
               )}
            </span>
            <div className="absolute inset-0 bg-[var(--text-primary)] scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 z-0" />
            <div className="absolute inset-0 border border-[var(--text-primary)] z-0 opacity-20" />
          </button>
        </motion.form>
      </div>

      {/* Footer / Copyright */}
      <div className="mt-32 pt-10 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-mono text-[var(--text-primary)]/50 uppercase tracking-widest">
          © {new Date().getFullYear()} Humberto Alonso López
        </p>
        <p className="text-[10px] font-sans text-[var(--text-primary)]/60">
          {language === 'es' ? 'Desarrollado con' : 'Developed with'} <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-4">React, Tailwind & Framer Motion</span>
        </p>
      </div>
    </footer>
  );
};
