import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Container } from './ui/Shared';

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
    <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
    <div className="text-slate-400 leading-relaxed text-sm space-y-3">{children}</div>
  </div>
);

const standardAutomations = [
  { name: 'Lead Follow-Up Email', desc: 'personalised follow-up goes out 24 hours after every new enquiry, automatically.' },
  { name: 'New Enquiry SMS Alert', desc: 'instant text the moment a new lead lands so you can call back first.' },
  { name: 'Job Appointment Reminder', desc: 'customers get 48-hour and 2-hour reminders before every appointment. No-shows drop.' },
  { name: 'Quote Reminder', desc: 'automatic follow-up on quiet quotes so you stop losing jobs to competitors.' },
  { name: 'Big Quote Nurture', desc: '3-email sequence for quotes over £1,000 — addresses objections over 2 weeks while they decide.' },
  { name: 'Invoice Chaser', desc: 'professionally escalating payment reminders at 7, 14, and 30 days. No awkward calls.' },
  { name: 'Job Completion Review Request', desc: 'review requests sent at the perfect moment after every completed job.' },
  { name: 'Referral Programme Trigger', desc: 'after a 5-star review, your happiest customers automatically receive a referral offer.' },
  { name: 'Annual Service Reminder', desc: '11 months after a job, past customers get a reminder their annual service is due.' },
  { name: 'Warranty Check-In', desc: 'friendly check-in before the 12-month guarantee expires — catches issues before complaints.' },
  { name: 'Unhappy Customer Detector', desc: 'if a customer goes quiet with no review after 10 days, you get an internal alert.' },
  { name: 'Seasonal Outreach Campaign', desc: 'targeted email campaign to your past customers every October and March.' },
  { name: 'Monthly Cash Flow Digest', desc: 'summary of income, outstanding quotes, and pipeline on the 1st of every month.' },
  { name: 'Compliance Certificate Reminder', desc: 'tracks Gas Safe, NICEIC, Part P expiry dates and alerts you 30 days before any lapse.' },
  { name: 'Daily Job Briefing', desc: 'weekday morning briefing — active jobs, overdue reminders, and new leads at a glance.' },
  { name: 'Creating Quotes', desc: 'draft professional quotes from your measurements, ready to review and send in minutes.' },
  { name: 'Sending Invoices', desc: 'automatically generated when a job is marked complete — nothing forgotten, cash in faster.' },
  { name: 'Tracking Job Status', desc: 'one clear view of every job — quoted, booked, invoiced, and paid.' },
];

const specialistServices = [
  {
    title: 'Social Media Content Engine',
    tagline: 'A full month of content, written and scheduled for you.',
    description: 'DeepflowAI generates, schedules, and manages your social media presence across Instagram, Facebook, LinkedIn, and TikTok — using AI trained on your trade, your tone, and your local area. You review and approve before anything goes live.',
    included: [
      'Full monthly content calendar tailored to your trade',
      'AI-written posts for Instagram, Facebook, LinkedIn, TikTok',
      'Image and media suggestions for each post',
      'Your approval before anything goes live',
      'Scheduled to optimal posting times for your audience',
    ],
    disclaimer: 'This is a managed specialist service — DeepflowAI runs this on your behalf. Before setup, we walk through exactly how your content is created, what platforms we access, and what you retain full control over.',
  },
  {
    title: 'ClearLedger AI Bookkeeping',
    tagline: 'Upload your bank statement — AI sorts every transaction for your tax return.',
    description: 'ClearLedger reads your bank statement and uses AI to classify every transaction into the correct HMRC SA103 self-assessment category. You review, override anything the AI got wrong, and export a clean spreadsheet ready for your accountant.',
    included: [
      'Bank statement upload (Starling, Monzo, Barclays, HSBC, Lloyds)',
      'AI classification into HMRC SA103 categories',
      'Business vs personal transaction separation',
      'Confidence scores — low-confidence items flagged for your review',
      'Clean CSV export ready for your accountant',
    ],
    disclaimer: 'ClearLedger is a data organisation tool, not financial or tax advice. AI classifications should be reviewed before submitting your tax return. Before setup, we walk through how your financial data is stored, processed, and protected under UK GDPR. This service is not available as a self-install option.',
  },
];

const SpecialistCard: React.FC<typeof specialistServices[0]> = ({
  title, tagline, description, included, disclaimer,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-slate-900/80 p-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
          Specialist Service
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-amber-300/80 text-sm font-medium mb-4">{tagline}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>

      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-4"
      >
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {open ? 'Hide details' : "What's included"}
      </button>

      {open && (
        <ul className="space-y-2 mb-4">
          {included.map(item => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-amber-400 mt-0.5 flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="bg-slate-950/60 border border-white/5 rounded-xl p-4 mb-6">
        <p className="text-[11px] text-slate-500 leading-relaxed italic">{disclaimer}</p>
      </div>

      <a
        href="mailto:hello@deepflowai.co.uk?subject=Specialist Service Enquiry"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all"
      >
        <ExternalLink className="w-4 h-4" />
        Contact DeepflowAI for more information
      </a>
    </div>
  );
};

export const ServicesPage: React.FC = () => (
  <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
    {/* Background orbs */}
    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-600/6 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

    <Container className="relative z-10">
      <div className="max-w-3xl">

        {/* Header */}
        <div className="mb-16">
          <div className="h-px w-14 bg-gradient-to-r from-accent-500 to-blue-500 mb-8" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            Our Services
          </h1>
          <p className="text-xl text-slate-300 font-light mb-4 leading-relaxed">
            DeepflowAI provides role-based AI agents that act like an extension of your team.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Our services are designed to help businesses reduce manual workload, improve consistency,
            and create capacity for growth. Rather than offering one generic assistant, we focus on
            AI agents built around specific business functions.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-5">

          <Card title="For microbusinesses">
            <p>
              Small businesses often need support across marketing, admin, finance, and customer
              communication, but cannot justify hiring a specialist for every area. Our AI agents
              help fill those gaps by providing affordable, always-available support that lets
              smaller firms operate more like larger, better-resourced businesses.
            </p>
          </Card>

          <Card title="For larger organisations">
            <p>
              Larger organisations face a different challenge: skilled staff spend too much time on
              repetitive, low-value work. Our AI agents help remove that friction by taking on routine
              tasks and supporting existing teams, allowing people to focus on higher-value,
              human-centred responsibilities.
            </p>
          </Card>

          {/* Automation library */}
          <Card title="Automation library">
            <p className="mb-4">
              Every client package includes access to our full library of trade-specific automations.
              These run in the background and are configured to your business — no changing how you work.
            </p>
            <ul className="space-y-2">
              {standardAutomations.map(({ name, desc }) => (
                <li key={name} className="flex gap-2">
                  <span className="text-white font-semibold shrink-0">{name}</span>
                  <span>— {desc}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Specialist Services */}
          <div>
            <div className="mb-5">
              <h3 className="text-lg font-bold text-white mb-2">Specialist Services</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                These go beyond standard automations and are managed directly by DeepflowAI on your
                behalf. They are <strong className="text-white">not available as self-install
                options</strong> — setup requires a conversation with us first so we can understand
                your needs and walk you through how the service works.
              </p>
            </div>
            <div className="space-y-5">
              {specialistServices.map(s => (
                <SpecialistCard key={s.title} {...s} />
              ))}
            </div>
          </div>

          <Card title="Why our approach is different">
            <p>
              We do not just provide access to raw AI models. We build packaged, role-specific agents
              that are easier to understand, easier to adopt, and more closely aligned with real
              business needs.
            </p>
            <p>
              We also keep people in the loop, so businesses maintain trust, oversight, and control
              over what the system does.
            </p>
          </Card>

        </div>
      </div>
    </Container>
  </div>
);
