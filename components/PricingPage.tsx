import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Container } from './ui/Shared';

/**
 * Pricing — single plan, everything included.
 *
 * Rewritten 2026-07-27, replacing the Starter/Core/Trade Pro ladder.
 *
 * Why: tradespeople buy solutions to problems, not feature counts. Gating an
 * automation only earns money if the buyer already understands and wants it —
 * and someone who's never heard of an AI voice agent won't pay more to unlock
 * one. Worse, every automation a client actually uses makes them less likely
 * to cancel, so gating suppressed usage and increased churn. For a
 * subscription business churn costs more than lost upsell.
 *
 * NOTE: these figures must stay in step with
 * command-centre/server/config/pricing.js, which feeds Aria, the proposal
 * generator and the sales emails. There is no shared source between the
 * marketing site and the app — change both together.
 */

const PLAN = {
  monthly:   200,
  annualMo:  167,   // 2 months free
  minTerm:   3,
};

// Founding-member rate — first 5 clients, locked for life.
// Mirrors FOUNDING in command-centre/server/config/pricing.js.
// When the 5 places are gone, set `show: false` — do NOT change the numbers,
// since existing founding members keep this rate permanently.
const FOUNDING = {
  show:     true,
  monthly:  150,
  places:   5,
};

const SOCIAL_ADDON = {
  monthly:  99,
  annualMo: 83,
};

// ── The 5 core automations, included for everyone ─────────────────────────────
const CORE_FIVE = [
  { name: 'Lead follow-up',       desc: 'Responds to every new enquiry automatically — within minutes, not hours.' },
  { name: 'Quote reminder',       desc: 'Chases unanswered quotes so you stop losing jobs to competitors who followed up.' },
  { name: 'Invoice chaser',       desc: 'Professionally escalating payment reminders at 7, 14 and 30 days. No awkward calls.' },
  { name: 'Appointment reminder', desc: 'Sends 48-hour and 2-hour reminders before every job. No-shows drop off fast.' },
  { name: 'Review request',       desc: 'Asks for a Google review 24 hours after every completed job, at the perfect moment.' },
];

// ── Trade-specific extras — also included ─────────────────────────────────────
const TRADE_EXTRAS: Record<string, string[]> = {
  'Plumber':           ['Emergency callout response', 'No-show follow-up', 'Annual landlord check reminder', 'New enquiry SMS alert', 'Lapsed customer win-back'],
  'Gas Engineer':      ['Emergency callout response', 'Annual boiler service reminder', 'Pre-winter seasonal outreach', 'Insurance/membership renewal alert', 'Gas Safe renewal reminder'],
  'Electrician':       ['Emergency callout response', 'Big job nurture (rewires/EV chargers)', 'NICEIC/NAPIT renewal reminder', 'Insurance/membership renewal alert', 'New enquiry SMS alert'],
  'Builder':           ['Big job nurture (extensions)', 'No-show follow-up', 'Guarantee check-in', 'Lapsed customer win-back', 'Weekly timesheet chaser'],
  'Roofer':            ['Pre-winter seasonal outreach', 'Big quote nurture', 'Emergency callout response', 'No-show follow-up', 'Guarantee check-in'],
  'Joiner':            ['Big job nurture', 'Guarantee check-in', 'Referral trigger', 'Lapsed customer win-back', 'Silent customer alert'],
  'Painter/Decorator': ['Spring/Christmas seasonal outreach', 'Big job nurture', 'Referral trigger', 'Lapsed customer win-back', 'Silent customer alert'],
  'Landscaper':        ['Spring booking rush outreach', 'Annual maintenance reminder', 'Big project nurture', 'Referral trigger', 'Lapsed customer win-back'],
};

// ── Everything else in the plan ───────────────────────────────────────────────
const ALSO_INCLUDED = [
  { name: 'Your own app',            desc: 'The portal installs to your phone home screen. Approve replies from the van.' },
  { name: 'AI assistant',            desc: 'Ask it anything about your jobs, quotes or who still owes you money.' },
  { name: 'Call me',                 desc: "Tap a button and the AI rings you with a rundown of what needs attention." },
  { name: 'WhatsApp & email replies',desc: 'Customers message however they like. Every reply is drafted for you.' },
  { name: 'Photo enquiries',         desc: 'A customer sends a photo of the problem — it becomes a job with a description.' },
];

function TradeExtras() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      {Object.entries(TRADE_EXTRAS).map(([trade, extras]) => (
        <div key={trade} className="border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === trade ? null : trade)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-left text-sm text-slate-300 hover:text-white hover:bg-white/4 transition-colors"
          >
            <span className="font-medium">{trade}</span>
            {open === trade
              ? <ChevronUp className="w-4 h-4 text-slate-500" />
              : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
          {open === trade && (
            <div className="px-5 pb-4 bg-slate-900/40">
              <ul className="space-y-1.5 pt-1">
                {extras.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-accent-500 mt-0.5 flex-shrink-0">›</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
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
            One price.<br className="hidden sm:block" /> Everything included.
          </h1>
          <p className="text-xl text-slate-300 font-light mb-4 leading-relaxed">
            No packages to compare, no features held back, no upgrade nudges.
            You get every automation we build — including the ones made specifically for your trade.
          </p>
          <p className="text-slate-400 leading-relaxed">
            We set it all up, we keep it running, and nothing is ever sent to a customer without you approving it first.
          </p>
        </div>

        {/* The plan */}
        <div className="rounded-2xl p-8 md:p-10 border bg-accent-500/8 border-accent-500/30 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-1">DeepflowAI</h2>
              <p className="text-slate-400 text-sm">Your whole customer admin, handled.</p>
            </div>
            <div className="text-right shrink-0">
              {FOUNDING.show ? (
                <>
                  <div className="flex items-baseline justify-end gap-2">
                    <span className="text-xl font-semibold text-slate-500 line-through">£{PLAN.monthly}</span>
                    <span className="text-4xl font-extrabold text-white">£{FOUNDING.monthly}</span>
                    <span className="text-slate-500 text-sm">/ month</span>
                  </div>
                  <p className="text-amber-400 text-xs mt-1 font-semibold">
                    Founding rate — first {FOUNDING.places} businesses only
                  </p>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-4xl font-extrabold text-white">£{PLAN.monthly}</span>
                    <span className="text-slate-500 text-sm"> / month</span>
                  </div>
                  <p className="text-emerald-500 text-xs mt-1">£{PLAN.annualMo}/mo paid annually</p>
                </>
              )}
            </div>
          </div>

          {FOUNDING.show && (
            <div className="rounded-xl bg-amber-500/8 border border-amber-500/25 px-5 py-4 mb-6">
              <p className="text-sm text-amber-200/90 leading-relaxed">
                <strong className="text-amber-300">We're taking on our first {FOUNDING.places} businesses at £{FOUNDING.monthly} a month — locked for life.</strong>{' '}
                Not an introductory offer that jumps up later. That price is yours for as long as you stay,
                even when it goes to £{PLAN.monthly} for everyone else.
              </p>
              <p className="text-xs text-amber-200/60 mt-2 leading-relaxed">
                Why: we're new, and we'd rather have five businesses who'll tell us honestly what's working
                than fifty who quietly drift off. All we ask is your feedback — and if it earns it, a few
                words we can quote.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {['No setup fee', 'No long contract', `${PLAN.minTerm}-month minimum`, 'Cancel anytime after'].map(t => (
              <span key={t} className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {[
              'All 5 core automations',
              '5 more built for your trade',
              'Your own phone app',
              'AI assistant, 24/7',
              'Email, WhatsApp & voice',
              'You approve every message',
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Optional add-on */}
        <div className="rounded-2xl p-8 border bg-slate-900/60 border-white/10 mb-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-white">Social Content</h2>
                <span className="text-xs font-bold text-slate-400 bg-slate-800/60 border border-white/8 px-2.5 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-slate-500 text-xs">A separate service, if you want it</p>
            </div>
            <div className="text-right shrink-0">
              <div>
                <span className="text-2xl font-extrabold text-white">£{SOCIAL_ADDON.monthly}</span>
                <span className="text-slate-500 text-sm"> / month</span>
              </div>
              <p className="text-emerald-500 text-xs mt-0.5">£{SOCIAL_ADDON.annualMo}/mo paid annually</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Done-for-you social posts and images, written and produced every month, ready for you to approve and post.
            This is the one thing that isn't in the main plan — it's a separate piece of work, not a locked feature.
          </p>
        </div>

        {/* Worth-it framing */}
        <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl px-8 py-5 mb-10">
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-emerald-400">Work out your own number.</strong>{' '}
            Take the hours you lose each week to chasing quotes, writing invoices and reminding people about
            appointments, and multiply by what an hour of your time is worth. For most trades, one recovered
            hour a week already covers the <strong className="text-white">£{FOUNDING.show ? FOUNDING.monthly : PLAN.monthly}</strong> — and one job
            won back from a quote that would otherwise have gone cold covers several months.
          </p>
        </div>

        {/* Core five */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-5">
          <p className="text-white font-bold text-base mb-1">The 5 core automations</p>
          <p className="text-slate-500 text-xs mb-6">Every client gets all five. No picking, no tiers.</p>
          <ul className="space-y-5">
            {CORE_FIVE.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-slate-200 text-sm font-semibold">{a.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Trade extras */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-5">
          <p className="text-white font-bold text-base mb-1">Plus 5 built for your trade</p>
          <p className="text-slate-500 text-xs mb-5">
            Included as standard. Pick your trade to see exactly what you'd get.
          </p>
          <TradeExtras />
        </div>

        {/* Also included */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-5">
          <p className="text-white font-bold text-base mb-1">And everything else</p>
          <p className="text-slate-500 text-xs mb-6">Not extras. Just part of it.</p>
          <ul className="space-y-5">
            {ALSO_INCLUDED.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent-500/15 border border-accent-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent-400" />
                </div>
                <div>
                  <p className="text-slate-200 text-sm font-semibold">{a.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* How it works */}
        <div className="bg-slate-900/40 border border-white/8 rounded-2xl p-8 mb-5">
          <p className="text-white font-bold text-base mb-5">How it works</p>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Fill in the form', desc: "Takes 2 minutes. Tell us your trade and what's slowing you down." },
              { step: '2', title: 'We build it for you', desc: 'No software to learn, no setup on your end. Everything is ready in 2–3 days.' },
              { step: '3', title: 'It runs in the background', desc: "Automations fire when they're supposed to. You approve, they send." },
              { step: '4', title: 'You stay in control', desc: 'Nothing reaches a customer until you have seen it and said yes.' },
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

        {/* Custom */}
        <div className="bg-slate-900/40 border border-white/8 rounded-2xl px-8 py-6">
          <p className="text-white font-bold text-base mb-2">Need something different?</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            Larger teams, unusual setups, or custom integrations — we can build it.
            Get in touch and we'll put together a quote.
          </p>
          <a
            href="#assessment"
            className="text-accent-400 hover:text-accent-300 underline text-sm font-semibold transition-colors"
          >
            Get a free assessment →
          </a>
        </div>

      </div>
    </Container>
  </div>
);
