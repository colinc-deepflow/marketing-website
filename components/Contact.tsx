import React, { useState } from 'react';
import { Check, ArrowRight, User, Building } from 'lucide-react';
import { Container, Section, Button, FadeIn } from './ui/Shared';

// ── Types ──────────────────────────────────────────────────────────────────────

type TeamSize = 'Just me' | '2–3 people' | '4–10 people' | '10+ people';

type PackageTier = 'starter' | 'core' | 'trade';

interface FormData {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  teamSize: TeamSize;
  trade: string;
  painPoints: string[];
  specialistSlug: string;
  notes: string;
  callConsent: boolean;
  packageTier: PackageTier;
}

// ── Trade profiles (must match server/config/tradeProfiles.js) ────────────────

const TRADES = [
  { id: 'gas-engineer',      name: 'Gas Engineer',        emoji: '🔥' },
  { id: 'electrician',       name: 'Electrician',         emoji: '⚡' },
  { id: 'plumber',           name: 'Plumber',             emoji: '🔧' },
  { id: 'builder',           name: 'Builder',             emoji: '🏗️' },
  { id: 'joiner',            name: 'Joiner',              emoji: '🪚' },
  { id: 'painter-decorator', name: 'Painter & Decorator', emoji: '🎨' },
  { id: 'roofer',            name: 'Roofer',              emoji: '🏠' },
  { id: 'landscaper',        name: 'Landscaper',          emoji: '🌿' },
];

// Trade-specific pain points shown in Step 2 (core 5 are automatic — not shown here)
const TRADE_PAIN_POINTS: Record<string, { slug: string; label: string; desc: string }[]> = {
  'gas-engineer': [
    { slug: 'compliance-cert-reminder',       label: 'Gas Safe registration lapsing',      desc: 'Missing a renewal shuts your business down overnight' },
    { slug: 'annual-service-reminder',        label: 'Losing annual boiler service customers', desc: 'Past customers book someone else because you didn\'t remind them' },
    { slug: 'seasonal-outreach',              label: 'Missing the October boiler rush',     desc: 'Competitors who plan ahead win all the pre-winter service calls' },
    { slug: 'emergency-callout-response',     label: 'Emergency customers not hearing back', desc: 'They call three numbers in five minutes — first to respond wins' },
    { slug: 'insurance-membership-renewal',   label: 'Insurance or membership expiring',    desc: 'PL insurance, Gas Safe fee — easy to miss until it\'s too late' },
  ],
  'electrician': [
    { slug: 'compliance-cert-reminder',       label: 'NICEIC / NAPIT registration lapsing',  desc: 'A lapsed registration means you can\'t legally certify jobs' },
    { slug: 'emergency-callout-response',     label: 'Emergency customers not hearing back',  desc: 'They call three numbers in five minutes — first to respond wins' },
    { slug: 'big-quote-nurture',              label: 'Big jobs (rewires, EV chargers) going cold', desc: 'High-value quotes need more chasing than a standard job' },
    { slug: 'insurance-membership-renewal',   label: 'Insurance or membership expiring',      desc: 'PL insurance, NICEIC fee — easy to miss until it\'s too late' },
    { slug: 'new-enquiry-sms',                label: 'Missing enquiries while on site',        desc: '78% of jobs go to whoever responds first — you need an instant alert' },
  ],
  'plumber': [
    { slug: 'emergency-callout-response',     label: 'Emergency customers not hearing back',  desc: 'They call three numbers in five minutes — first to respond wins' },
    { slug: 'no-show-follow-up',              label: 'No-shows wasting a full day',            desc: 'Drove out, no one answered — an automated follow-up gets them rebooked' },
    { slug: 'annual-service-reminder',        label: 'Losing landlord annual check customers', desc: 'Landlords need annual checks every year — remind them before they book someone else' },
    { slug: 'new-enquiry-sms',                label: 'Missing enquiries while on site',        desc: '78% of jobs go to whoever responds first — you need an instant alert' },
    { slug: 'lapsed-customer-winback',        label: 'Past customers going to competitors',    desc: 'Customers from 18+ months ago have forgotten you — a simple message brings them back' },
  ],
  'builder': [
    { slug: 'big-quote-nurture',              label: 'Big jobs (extensions, conversions) going cold', desc: 'Large quotes need multiple touchpoints — one email isn\'t enough' },
    { slug: 'no-show-follow-up',              label: 'No-shows wasting a full day',            desc: 'Drove out, no one answered — an automated follow-up gets them rebooked' },
    { slug: 'warranty-checkin',               label: 'Never following up on guarantees',       desc: 'A check-in before your guarantee expires builds loyalty and generates repeat work' },
    { slug: 'lapsed-customer-winback',        label: 'Past customers going to competitors',    desc: 'Customers from 18+ months ago have forgotten you — a simple message brings them back' },
    { slug: 'weekly-timesheet-chaser',        label: 'Chasing subbies for timesheets',         desc: 'Late timesheets delay payroll and waste Monday mornings' },
  ],
  'joiner': [
    { slug: 'big-quote-nurture',              label: 'Fitted jobs (£1k+) going cold',          desc: 'Large quotes need more than one follow-up to convert' },
    { slug: 'warranty-checkin',               label: 'Never following up on guarantees',       desc: 'A check-in before your guarantee expires builds loyalty and generates repeat work' },
    { slug: 'referral-trigger',               label: 'Happy customers never refer anyone',     desc: 'Word-of-mouth is your best channel — but only if you remember to ask' },
    { slug: 'lapsed-customer-winback',        label: 'Past customers going to competitors',    desc: 'Customers from 18+ months ago have forgotten you — a simple message brings them back' },
    { slug: 'silent-customer-alert',          label: 'Silent customers turning into bad reviews', desc: 'No warning when a customer is unhappy — you only find out when they post online' },
  ],
  'painter-decorator': [
    { slug: 'seasonal-outreach',              label: 'Missing peak season bookings',           desc: 'Spring refresh and pre-Christmas slots go to competitors who plan ahead' },
    { slug: 'big-quote-nurture',              label: 'Full house jobs going cold',             desc: 'Large redecorations need more chasing — one quote rarely converts alone' },
    { slug: 'referral-trigger',               label: 'Happy customers never refer anyone',     desc: 'Word-of-mouth is your best channel — but only if you remember to ask' },
    { slug: 'lapsed-customer-winback',        label: 'Past customers going to competitors',    desc: 'Customers from 18+ months ago have forgotten you — a simple message brings them back' },
    { slug: 'silent-customer-alert',          label: 'Silent customers turning into bad reviews', desc: 'No warning when a customer is unhappy — you only find out when they post online' },
  ],
  'roofer': [
    { slug: 'seasonal-outreach',              label: 'Missing the pre-winter rush',            desc: 'September is your peak — customers who plan ahead book before you even advertise' },
    { slug: 'big-quote-nurture',              label: 'New roof quotes going cold',             desc: 'A £5k+ quote needs nurturing — one email won\'t close it' },
    { slug: 'emergency-callout-response',     label: 'Storm damage callouts not getting a fast response', desc: 'Emergency customers call three people in five minutes' },
    { slug: 'no-show-follow-up',              label: 'No-shows wasting a full day',            desc: 'Drove out, no one answered — an automated follow-up gets them rebooked' },
    { slug: 'warranty-checkin',               label: 'Never following up on guarantees',       desc: 'A check-in before your guarantee expires builds loyalty and generates repeat work' },
  ],
  'landscaper': [
    { slug: 'seasonal-outreach',              label: 'Missing the spring booking rush',        desc: 'Customers who get in touch in April are already planning — be the one who reaches out first' },
    { slug: 'annual-service-reminder',        label: 'Losing maintenance contract customers',  desc: 'Annual garden maintenance customers drift if you don\'t remind them at the right time' },
    { slug: 'big-quote-nurture',              label: 'Driveway and garden design jobs going cold', desc: 'Large projects need multiple touchpoints before the customer commits' },
    { slug: 'referral-trigger',               label: 'Happy customers never refer anyone',     desc: 'Word-of-mouth is your best channel — but only if you remember to ask' },
    { slug: 'lapsed-customer-winback',        label: 'Past customers going to competitors',    desc: 'Customers from 18+ months ago have forgotten you — a simple message brings them back' },
  ],
};

// Fallback pain points if no trade selected
const DEFAULT_PAIN_POINTS = [
  { slug: 'lead-follow-up',          label: 'Leads going cold',                    desc: 'Too slow to follow up while out on site — competitor gets there first' },
  { slug: 'quote-reminder',          label: 'Quotes going unanswered',             desc: 'Sending quotes then losing track — losing jobs to competitors' },
  { slug: 'invoice-chaser',          label: 'Chasing unpaid invoices',             desc: 'Awkward follow-ups and late payments hurting cashflow' },
  { slug: 'job-appointment-reminder', label: 'Customers forgetting appointments',  desc: 'No-shows cost you a full paid day' },
  { slug: 'job-completion-review',   label: 'Forgetting to ask for reviews',       desc: 'Great work going unrecognised — missed reviews hurt your ranking' },
];

// ── Constants ──────────────────────────────────────────────────────────────────

const teamSizes: TeamSize[] = ['Just me', '2–3 people', '4–10 people', '10+ people'];

const inputClass = "w-full bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 outline-none transition-all placeholder:text-slate-700 hover:bg-white/[0.08] text-sm";
const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 group-focus-within:text-accent-400 transition-colors";

// ── Component ──────────────────────────────────────────────────────────────────

export const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    name: '',
    email: '',
    phone: '',
    teamSize: 'Just me',
    trade: '',
    painPoints: [],
    specialistSlug: '',
    notes: '',
    callConsent: false,
    packageTier: 'core',
  });
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
          businessName: formData.businessName,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          teamSize: formData.teamSize,
          trade: formData.trade || null,
          painPoints: formData.painPoints,
          specialistSlug: formData.specialistSlug || null,
          notes: formData.notes,
          callConsent: formData.callConsent,
          packageTier: formData.packageTier,
          submittedAt: new Date().toISOString(),
          source: 'website_contact_form',
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const step2Points = formData.trade
    ? (TRADE_PAIN_POINTS[formData.trade] ?? DEFAULT_PAIN_POINTS)
    : DEFAULT_PAIN_POINTS;

  const selectedTrade = TRADES.find(t => t.id === formData.trade);
  const canProceedStep1 = formData.businessName && formData.name && formData.email && formData.phone;

  return (
    <Section id="assessment" className="bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-600/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <FadeIn>
              <div className="inline-block px-3 py-1 mb-5 text-xs font-bold tracking-widest text-accent-400 uppercase bg-accent-500/10 rounded-full border border-accent-500/20">
                Free Assessment
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                Design Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-blue-400">
                  Automation
                </span>
              </h2>
              <p className="text-slate-400 text-lg font-light max-w-xl mx-auto leading-relaxed">
                Tell us about your trade. We'll build the right automation package for your business — no guesswork.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={150}>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent rounded-t-3xl" />

              {/* Progress */}
              {!submitted && (
                <div className="flex items-center gap-3 mb-8">
                  {[1, 2].map(s => (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                        step >= s
                          ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                          : 'bg-white/10 text-slate-600'
                      }`}>
                        {step > s ? <Check size={13} strokeWidth={3} /> : s}
                      </div>
                      {s < 2 && (
                        <div className={`h-px w-12 rounded-full transition-all duration-500 ${
                          step > s ? 'bg-accent-500' : 'bg-white/10'
                        }`} />
                      )}
                    </div>
                  ))}
                  <span className="ml-1 text-slate-600 text-xs font-medium">Step {step} of 2</span>
                </div>
              )}

              {submitted ? (
                <div className="py-14 flex flex-col items-center justify-center text-center">
                  <div className="h-20 w-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">You're All Set!</h3>
                  <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
                    {formData.callConsent
                      ? "Check your inbox for your cost breakdown. Our AI agent will call you shortly — it's worth picking up."
                      : "Check your inbox — we've sent a breakdown of what your admin is costing you and exactly how we can help."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">

                  {/* ── Step 1: Business details + trade ── */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-accent-500 rounded-lg flex items-center justify-center font-black text-sm shadow-lg shadow-accent-500/20 flex-shrink-0">1</div>
                        <h3 className="text-xl font-bold text-white">About Your Business</h3>
                      </div>

                      {/* Name + business */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { label: 'Business Name', key: 'businessName', icon: Building, placeholder: 'e.g. Smith Plumbing & Heating', type: 'text' },
                          { label: 'Your Name',     key: 'name',         icon: User,     placeholder: 'e.g. James Smith',             type: 'text' },
                        ].map((field) => (
                          <div key={field.key} className="space-y-1.5 group">
                            <label className={labelClass}>{field.label}</label>
                            <div className="relative">
                              <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-focus-within:text-accent-500 transition-colors" />
                              <input
                                type={field.type}
                                required
                                value={(formData as any)[field.key]}
                                onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                                className={`${inputClass} pl-11`}
                                placeholder={field.placeholder}
                              />
                            </div>
                          </div>
                        ))}
                        <div className="space-y-1.5 group">
                          <label className={labelClass}>Email Address</label>
                          <input type="email" required value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className={inputClass} placeholder="james@yourbusiness.com" />
                        </div>
                        <div className="space-y-1.5 group">
                          <label className={labelClass}>Mobile Number</label>
                          <input type="tel" required value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className={inputClass} placeholder="07123 456789" />
                        </div>
                      </div>

                      {/* Team size */}
                      <div className="space-y-2">
                        <label className={labelClass}>Team Size</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                          {teamSizes.map(size => (
                            <button key={size} type="button"
                              onClick={() => setFormData({ ...formData, teamSize: size })}
                              className={`p-3 rounded-xl border transition-all duration-200 text-sm font-bold active:scale-95 ${
                                formData.teamSize === size
                                  ? 'bg-accent-500/15 border-accent-500/50 text-accent-300'
                                  : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10 hover:text-slate-300'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Trade selector */}
                      <div className="space-y-2">
                        <label className={labelClass}>
                          What trade are you in?{' '}
                          <span className="normal-case font-normal text-slate-700">(helps us pick the right automations)</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TRADES.map(trade => (
                            <button key={trade.id} type="button"
                              onClick={() => setFormData({ ...formData, trade: trade.id, painPoints: [], specialistSlug: '' })}
                              className={`flex items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 text-xs font-semibold active:scale-95 min-h-[44px] ${
                                formData.trade === trade.id
                                  ? 'bg-accent-500/15 border-accent-500/50 text-accent-300'
                                  : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10 hover:text-slate-300'
                              }`}
                            >
                              <span>{trade.emoji}</span>
                              <span className="text-left leading-tight">{trade.name}</span>
                            </button>
                          ))}
                        </div>
                        {formData.trade && (
                          <p className="text-xs text-accent-400 pt-1">
                            ✓ We'll pre-configure your package for {selectedTrade?.name}s
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end pt-2">
                        <Button type="button" variant="vibrant"
                          onClick={() => setStep(2)}
                          disabled={!canProceedStep1}
                        >
                          Next Step <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* ── Step 2: Trade-specific problems ── */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 bg-accent-500 rounded-lg flex items-center justify-center font-black text-sm shadow-lg shadow-accent-500/20 flex-shrink-0">2</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            What's slowing you down?
                            {selectedTrade && (
                              <span className="ml-2 text-sm font-normal text-slate-500">
                                {selectedTrade.emoji} {selectedTrade.name}
                              </span>
                            )}
                          </h3>
                          <p className="text-slate-500 text-sm mt-0.5">
                            {formData.packageTier === 'starter'
                              ? 'Your 3 core automations are included and ready to go.'
                              : formData.packageTier === 'core'
                              ? 'Your 5 core automations are included. Pick your specialist automation below.'
                              : 'All core and trade automations are included. Select the ones that matter most.'}
                          </p>
                        </div>
                      </div>

                      {/* Package tier selector */}
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                          Which package are you interested in?
                        </p>
                        <div className="space-y-2">
                          {([
                            {
                              id: 'starter' as PackageTier,
                              label: 'Starter',
                              price: '£79/mo',
                              desc: 'Lead follow-up, quote reminder & invoice chaser — the 3 biggest money leaks fixed.',
                              count: '3 automations',
                            },
                            {
                              id: 'core' as PackageTier,
                              label: 'Core',
                              price: '£127/mo',
                              desc: 'All 5 core automations + 1 specialist trade automation. Most popular.',
                              count: '6 automations',
                              popular: true,
                            },
                            {
                              id: 'trade' as PackageTier,
                              label: 'Trade Pro',
                              price: '£197/mo',
                              desc: 'Every automation in the library — the full suite built for your specific trade.',
                              count: '10 automations',
                            },
                          ] as const).map(pkg => (
                            <button
                              key={pkg.id}
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                packageTier: pkg.id,
                                specialistSlug: pkg.id === 'starter' ? '' : prev.specialistSlug,
                                painPoints: pkg.id === 'starter' ? [] : prev.painPoints,
                              }))}
                              className={`w-full p-4 rounded-xl border transition-all duration-200 text-left active:scale-[0.99] relative ${
                                formData.packageTier === pkg.id
                                  ? 'bg-accent-500/15 border-accent-500/40'
                                  : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                              }`}
                            >
                              {'popular' in pkg && pkg.popular && (
                                <span className="absolute top-3 right-3 text-[10px] font-bold text-accent-400 bg-accent-500/10 border border-accent-500/20 px-2 py-0.5 rounded-full">
                                  Most popular
                                </span>
                              )}
                              <div className="flex items-center gap-3">
                                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                  formData.packageTier === pkg.id
                                    ? 'border-accent-500 bg-accent-500'
                                    : 'border-white/20'
                                }`}>
                                  {formData.packageTier === pkg.id && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-baseline gap-2">
                                    <span className={`text-sm font-bold ${formData.packageTier === pkg.id ? 'text-white' : 'text-slate-300'}`}>
                                      {pkg.label}
                                    </span>
                                    <span className="text-xs text-accent-400 font-semibold">{pkg.price}</span>
                                    <span className="text-xs text-slate-600">{pkg.count}</span>
                                  </div>
                                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{pkg.desc}</p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-700 mt-2">Not sure? Core is a great starting point — you can always add more later.</p>
                      </div>

                      {/* Core automations — shown as already included in chosen package */}
                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2.5">
                          {formData.packageTier === 'starter'
                            ? 'Included in Starter:'
                            : formData.packageTier === 'core'
                            ? 'Included in Core:'
                            : 'Included in Trade Pro:'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(formData.packageTier === 'starter'
                            ? ['Lead Follow-Up', 'Quote Reminder', 'Invoice Chaser']
                            : ['Lead Follow-Up', 'Quote Reminder', 'Invoice Chaser', 'Appointment Reminder', 'Review Request']
                          ).map(label => (
                            <span key={label} className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                              ✓ {label}
                            </span>
                          ))}
                          {formData.packageTier === 'trade' && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 font-medium">
                              + 5 trade automations
                            </span>
                          )}
                          {formData.packageTier === 'core' && formData.specialistSlug && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 font-medium">
                              ✓ {step2Points.find(p => p.slug === formData.specialistSlug)?.label || '1 specialist automation'}
                            </span>
                          )}
                          {formData.packageTier === 'core' && !formData.specialistSlug && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-dashed border-white/20 text-slate-500 font-medium">
                              + pick 1 specialist below
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Specialist automation picker — hidden for Starter, radio for Core, checkbox for Trade Pro */}
                      {formData.packageTier !== 'starter' && formData.trade && step2Points.length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            {formData.packageTier === 'core'
                              ? 'Choose your specialist automation'
                              : 'Which matter most to you?'}
                          </p>
                          <p className="text-xs text-slate-600 mb-3">
                            {formData.packageTier === 'core'
                              ? 'Your Core package includes 1 specialist automation — pick the one that fits best.'
                              : 'All five are included in Trade Pro. Select the ones most relevant to your business.'}
                          </p>
                          <div className="space-y-2">
                            {step2Points.map(item => {
                              const isSelected = formData.packageTier === 'core'
                                ? formData.specialistSlug === item.slug
                                : formData.painPoints.includes(item.label);
                              return (
                                <button key={item.slug} type="button"
                                  onClick={() => {
                                    if (formData.packageTier === 'core') {
                                      const selecting = formData.specialistSlug !== item.slug;
                                      setFormData(prev => ({
                                        ...prev,
                                        specialistSlug: selecting ? item.slug : '',
                                        painPoints: selecting ? [item.label] : [],
                                      }));
                                    } else {
                                      setFormData(prev => ({
                                        ...prev,
                                        painPoints: prev.painPoints.includes(item.label)
                                          ? prev.painPoints.filter(p => p !== item.label)
                                          : [...prev.painPoints, item.label],
                                      }));
                                    }
                                  }}
                                  className={`w-full p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 text-left active:scale-[0.99] ${
                                    isSelected
                                      ? 'bg-accent-500/15 border-accent-500/40 text-white'
                                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/[0.08] hover:border-white/20'
                                  }`}
                                >
                                  {formData.packageTier === 'core' ? (
                                    <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                      isSelected ? 'border-accent-500 bg-accent-500' : 'border-white/20'
                                    }`}>
                                      {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                    </div>
                                  ) : (
                                    <div className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                                      isSelected ? 'bg-accent-500 text-white' : 'bg-white/10'
                                    }`}>
                                      {isSelected && <Check size={10} strokeWidth={3.5} />}
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm font-bold">{item.label}</div>
                                    <div className="text-xs text-slate-600 mt-0.5">{item.desc}</div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          {formData.packageTier === 'core' && !formData.specialistSlug && (
                            <p className="text-xs text-slate-600 pt-2">← Select one to add to your Core package</p>
                          )}
                          {formData.packageTier === 'core' && formData.specialistSlug && (
                            <p className="text-xs text-accent-400 pt-2">
                              ✓ {step2Points.find(p => p.slug === formData.specialistSlug)?.label} added to your Core package
                            </p>
                          )}
                        </div>
                      )}

                      {/* Notes */}
                      <div className="space-y-1.5">
                        <label className={labelClass}>
                          Anything else?{' '}
                          <span className="normal-case font-normal text-slate-700">(optional)</span>
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={e => setFormData({ ...formData, notes: e.target.value })}
                          className={`${inputClass} resize-none h-24`}
                          placeholder="Any specific problems or things you'd like help with..."
                        />
                      </div>

                      {/* AI call opt-in */}
                      <div
                        onClick={() => setFormData(prev => ({ ...prev, callConsent: !prev.callConsent }))}
                        className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          formData.callConsent
                            ? 'bg-accent-500/10 border-accent-500/40'
                            : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
                        }`}
                      >
                        <div className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                          formData.callConsent ? 'bg-accent-500' : 'bg-white/10'
                        }`}>
                          {formData.callConsent && <Check size={10} strokeWidth={3.5} className="text-white" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Call me back with a live AI demo</p>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                            Our AI agent will call you within 30 minutes to walk through your numbers. A real conversation — and a live preview of what AI can do for your business.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <button type="button" onClick={() => setStep(1)}
                          className="text-slate-600 text-sm font-semibold hover:text-white transition-colors">
                          ← Back
                        </button>
                        <Button type="submit" variant="vibrant" className="px-8" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            "Show Me What It's Costing Me"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
};
