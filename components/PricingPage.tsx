import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Container } from './ui/Shared';

/**
 * Pricing — rewritten 11 Oct 2026.
 *
 * £69/month + £100 one-off setup for the DeepFlow plan, monthly, cancel
 * anytime (Colin, 11 Oct 2026). Custom / specialist work is quoted per job.
 * The old £150 plan, the annual £125 option, the £99 Social add-on and the
 * "5 trade-specific automations" are all gone — the trade automations were
 * switched off on 20 Sept 2026 and must not be sold.
 *
 * The same numbers live in command-centre/server/config/pricing.js (used by
 * the sales emails and the phone agent). There is no shared source — change
 * both together.
 */

const PLAN = {
  monthly: 69,
  setup: 100,
};

const GROUPS = [
  {
    title: 'Enquiries',
    items: [
      'Your own enquiry page for Facebook, your van and your emails',
      'A reply written within seconds of someone getting in touch',
      'Phone enquiries logged in 20 seconds, reply written for you',
    ],
  },
  {
    title: 'Quotes',
    items: [
      'Quote email written from the price you put on the job',
      'Quiet quotes followed up — then you\'re told when to ring',
      'See which jobs you win and lose, and why',
    ],
  },
  {
    title: 'Bookings',
    items: [
      'Booking confirmation and reminders before you arrive',
      'Start and finish notes to the customer',
      'How long a customer took to pay last time, before you quote them',
    ],
  },
  {
    title: 'Getting paid',
    items: [
      'Invoice email written when you finish, with your bank details',
      'Every £ and your bank details checked before it goes',
      'Polite reminders at 7, 14, 30 and 45 days',
    ],
  },
  {
    title: 'After the job',
    items: [
      'Review request with your Google, Checkatrade or Trustpilot link',
      'A friendly note eleven months later to bring them back',
    ],
  },
  {
    title: 'Your AI PA',
    items: [
      'Ask it anything about your jobs, customers and money',
      'Call Me — it rings you, you update jobs by talking',
      'Optional 5pm call on weekdays to clear the day',
    ],
  },
  {
    title: 'Keeping watch',
    items: [
      'Reads customer replies and writes your answer',
      'Every message watched for a reply, quiet ones followed up',
      'A text every Friday at 5pm with your week in numbers',
    ],
  },
  {
    title: 'One-tap messages',
    items: [
      'Emergency reply, no-show rebook, referral ask',
      'Warranty check-in, cert reminder, big-quote follow-up',
    ],
  },
];

const FAQ = [
  {
    q: 'Do I need to be good with computers?',
    a: 'No. We set it all up for you. Day to day it\'s an app on your phone: read a message, tap approve. Or tap Call Me and just talk.',
  },
  {
    q: 'Will it send anything without me knowing?',
    a: 'Never. Every message to a customer waits for you to read it and tick a box. If you change the message after ticking, the tick clears. It never phones your customers.',
  },
  {
    q: 'What does the £100 setup cover?',
    a: 'We go through your business with you and set everything up: your details, bank details for invoices, your review links, and how your messages should sound — so they read like you wrote them.',
  },
  {
    q: 'Is there a contract?',
    a: 'No. It\'s monthly. Stop whenever you like.',
  },
  {
    q: 'Does it replace my accounts software?',
    a: 'No. Keep your accounts package, your diary and your bank. DeepFlow handles the talking — the replies, the chasing and the reminders.',
  },
  {
    q: 'What if my problem isn\'t on the list?',
    a: 'That\'s what custom work is for. Tell us the job, send us a photo of the paperwork, and we\'ll show you the fix and the price before we start.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm text-slate-200 font-semibold hover:bg-white/[0.04] transition-colors"
      >
        <span>{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
      </button>
      {open && <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">{a}</p>}
    </div>
  );
}

export const PricingPage: React.FC = () => (
  <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-600/6 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

    <Container className="relative z-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="h-px w-14 bg-gradient-to-r from-accent-500 to-blue-500 mb-8" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            Less than a night<br className="hidden sm:block" /> out a month.
          </h1>
          <p className="text-xl text-slate-300 font-light mb-4 leading-relaxed">
            One plan. Everything in it. No contract.
          </p>
          <p className="text-slate-400 leading-relaxed">
            We set it up, we keep it running, and nothing is ever sent to a customer without you approving it first.
          </p>
        </div>

        {/* The plan */}
        <div className="rounded-2xl p-8 md:p-10 border bg-accent-500/8 border-accent-500/30 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-1">The DeepFlow plan</h2>
              <p className="text-slate-400 text-sm">Your enquiries, quotes, invoices and chasing — handled.</p>
            </div>
            <div className="text-right shrink-0">
              <div>
                <span className="text-5xl font-extrabold text-white">£{PLAN.monthly}</span>
                <span className="text-slate-500 text-sm"> / month</span>
              </div>
              <p className="text-slate-400 text-xs mt-1">+ £{PLAN.setup} one-off setup</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {['Monthly — cancel anytime', 'Set up for you', 'Works on your phone', 'You approve every message'].map(t => (
              <span key={t} className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {GROUPS.map(g => (
              <div key={g.title}>
                <p className="text-white font-bold text-sm mb-2">{g.title}</p>
                <ul className="space-y-2">
                  {g.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <span className="text-sm text-slate-300 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <a href="/#assessment" className="mt-8 inline-flex items-center justify-center w-full h-14 rounded-xl text-base font-bold bg-accent-500 hover:bg-accent-400 text-slate-950 transition-all">
            Get started
          </a>
        </div>

        {/* Worth-it framing */}
        <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl px-8 py-5 mb-6">
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-emerald-400">Is it worth it?</strong>{' '}
            £{PLAN.monthly} is about two hours of your time a month. If it wins you back one job that
            would have gone cold, or gets one late invoice paid weeks sooner, it has paid for itself many times over.
          </p>
        </div>

        {/* Custom */}
        <div className="rounded-2xl p-8 md:p-10 border bg-slate-900/60 border-white/10 mb-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Custom work</h2>
              <p className="text-slate-500 text-sm">For the job no app can fix</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xl font-extrabold text-white">Priced per job</span>
              <p className="text-slate-500 text-xs mt-1">You know the price before we start</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            Job cards from a contractor, a spreadsheet you fill in every month, a portal you type everything into twice,
            supplier invoices, bank statements for your accountant, social media posts. Tell us the job and send us
            a photo of the paperwork. We'll show you the fix and the price.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Real example:</strong> we built D&M Fixing &amp; Joinery a system that takes
            contractor job cards all the way to invoices and the month-end spreadsheet. It gives Robert about an hour and a half back every night.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-slate-900/40 border border-white/8 rounded-2xl p-8 mb-10">
          <p className="text-white font-bold text-base mb-5">How getting started works</p>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Fill in the form', desc: 'A couple of minutes. Tell us your trade and what\'s eating your time.' },
              { step: '2', title: 'We have a quick chat', desc: 'We go through how you work and answer anything you want to know.' },
              { step: '3', title: 'We set it up for you', desc: 'Your details, bank details, review links and how your messages should sound. Nothing for you to install.' },
              { step: '4', title: 'You tap OK, it does the rest', desc: 'Messages are written for you. You read, approve, and get on with the job.' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-accent-500/15 border border-accent-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent-400">{s.step}</span>
                </div>
                <div>
                  <p className="text-slate-200 text-sm font-semibold">{s.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <p className="text-white font-bold text-lg mb-4">Questions people ask</p>
          <div className="space-y-2">
            {FAQ.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>

      </div>
    </Container>
  </div>
);
