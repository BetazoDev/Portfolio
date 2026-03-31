import { Mail, Phone, Linkedin, Figma } from 'lucide-react';
import { useState } from 'react';

export const Footer = () => {
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
      const response = await fetch('https://portfolio-n8nwithpostgres-0fb047-93-188-167-69.traefik.me/webhook/c1f3b49a-442c-4fb7-9ba5-b369b1144334', {
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
    <footer id="contact" className="py-24 border-t border-black">
      <div className="grid lg:grid-cols-2 gap-24">
        {/* Contact Info */}
        <div className="space-y-16">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif text-black tracking-tight font-medium leading-[0.9]">Start a <br /> Conversation</h2>
            <p className="max-w-md text-lg text-black/60 font-sans">
              Currently available for select freelance opportunities and full-time collaborations.
            </p>
          </div>

          <div className="space-y-8 pt-8">
            <div className="group flex items-center gap-6">
              <div className="w-12 h-12 border border-black flex items-center justify-center transition-colors group-hover:bg-black group-hover:text-white">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-black/40">Email</span>
                <p className="text-xl font-medium tracking-tight">alonso.humberto0401@gmail.com</p>
              </div>
            </div>

            <div className="group flex items-center gap-6">
              <div className="w-12 h-12 border border-black flex items-center justify-center transition-colors group-hover:bg-black group-hover:text-white">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-black/40">Phone</span>
                <p className="text-xl font-medium tracking-tight">+52 (449) 124 5952</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-12">
            {[
              { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#" },
              { icon: <Figma size={18} />, label: "Figma", href: "#" }
            ].map(social => (
              <a 
                key={social.label} 
                href={social.href}
                className="w-10 h-10 border border-black/20 flex items-center justify-center transition-colors hover:bg-black hover:text-white hover:border-black"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-12 border border-black shadow-none transition-shadow duration-500 hover:shadow-2xl">
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="relative group">
              <input 
                type="text" 
                name="name"
                id="name" 
                placeholder="Full Name" 
                required
                className="w-full bg-transparent border-b border-black/20 focus:border-black transition-colors duration-300 py-4 font-sans text-lg focus:outline-none placeholder:text-black/20"
              />
            </div>
            
            <div className="relative group">
              <input 
                type="email" 
                name="email"
                id="email" 
                placeholder="Email Address" 
                required
                className="w-full bg-transparent border-b border-black/20 focus:border-black transition-colors duration-300 py-4 font-sans text-lg focus:outline-none placeholder:text-black/20"
              />
            </div>
            
            <div className="relative group">
              <textarea 
                name="message"
                id="message" 
                rows={4} 
                required
                placeholder="How can I help?" 
                className="w-full bg-transparent border-b border-black/20 focus:border-black transition-colors duration-300 py-4 font-sans text-lg focus:outline-none resize-none placeholder:text-black/20"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-12 py-5 bg-black text-white text-sm font-medium uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 w-full lg:w-auto disabled:opacity-50"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : submitStatus === 'error' ? 'Error' : 'Send Message'}
              </span>
              <div className="absolute inset-0 bg-white w-full h-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-0" />
              <span className="absolute inset-0 flex items-center justify-center text-black font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : submitStatus === 'error' ? 'Error' : 'Send Message'}
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className="mt-48 pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-sm font-mono text-black/30 uppercase tracking-widest">© 2026 Humberto Alonso López • Built with precision</p>
        <p className="text-sm font-serif text-black/50 italic leading-tight">WordPress Web Developer & Designer / Software Engineer</p>
      </div>
    </footer>
  );
};
