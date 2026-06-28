import React, { useState } from 'react';
import { Check, Mail, User, MessageSquare, Tag } from 'lucide-react';
import { Container, Button } from './ui/Shared';

const inputClass = "w-full bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 outline-none transition-all placeholder:text-slate-700 hover:bg-white/[0.08] text-sm";
const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 group-focus-within:text-accent-400 transition-colors";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:5000/api/intake';
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          source: 'general_enquiry',
        }),
      });
    } catch {
      // fail silently — show success regardless
    } finally {
      setSubmitted(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-600/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <div className="h-px w-14 bg-gradient-to-r from-accent-500 to-blue-500 mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Get in Touch</h1>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Have a question, partnership idea, or just want to know more?
              Drop us a message and we'll get back to you.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent rounded-t-3xl" />

            {submitted ? (
              <div className="py-14 flex flex-col items-center justify-center text-center">
                <div className="h-20 w-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
                  Thanks for reaching out, {formData.name.split(' ')[0]}. We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 group">
                    <label className={labelClass}>Your Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-focus-within:text-accent-500 transition-colors" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={`${inputClass} pl-11`}
                        placeholder="Colin Campbell"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 group">
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-focus-within:text-accent-500 transition-colors" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={`${inputClass} pl-11`}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 group">
                  <label className={labelClass}>
                    Subject{' '}
                    <span className="normal-case font-normal text-slate-700">(optional)</span>
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-focus-within:text-accent-500 transition-colors" />
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className={`${inputClass} pl-11`}
                      placeholder="e.g. Partnership enquiry, general question..."
                    />
                  </div>
                </div>

                <div className="space-y-1.5 group">
                  <label className={labelClass}>Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-slate-600 w-4 h-4 group-focus-within:text-accent-500 transition-colors" />
                    <textarea
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClass} pl-11 resize-none h-36`}
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="vibrant"
                    fullWidth
                    disabled={isSubmitting}
                    className="py-4"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </Button>
                </div>

              </form>
            )}
          </div>

          {/* Alt contact note */}
          {!submitted && (
            <p className="text-center text-slate-600 text-sm mt-6">
              Prefer email?{' '}
              <a href="mailto:hello@deepflowai.co.uk" className="text-accent-400 hover:text-accent-300 underline transition-colors">
                hello@deepflowai.co.uk
              </a>
            </p>
          )}

        </div>
      </Container>
    </div>
  );
};
