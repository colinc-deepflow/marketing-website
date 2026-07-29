import React, { useState } from 'react';
import {
  Receipt, MessageSquare, Bell, Star,
  LayoutDashboard, Calendar, TrendingUp, ShieldCheck,
  Users, Heart, PieChart, Megaphone, Calculator, Mail, Smartphone,
  ExternalLink, ChevronDown, ChevronUp, Clock, Zap, UserX, UserCheck,
  Briefcase, RefreshCw,
} from 'lucide-react';
import { Container, Section, SectionHeading, FadeIn } from './ui/Shared';

// ── Automation data ────────────────────────────────────────────────────────────

const AUTOMATION_DATA: Record<string, { title: string; desc: string; icon: React.ReactNode; iconBg: string }> = {
  // Timings kept directional rather than exact. The site previously quoted
  // precise figures here that contradicted the pricing page (24h vs "minutes"
  // for lead follow-up, 30min vs 24h for reviews) and didn't match the actual
  // escalation ladder in loopMonitor.js (24h → 48h → 72h).
  'lead-follow-up': {
    title: 'Lead Follow-Up Email',
    desc: 'Every new enquiry gets a personalised reply the same day, drafted and waiting for your approval. First to respond usually wins the job.',
    icon: <Mail className="h-5 w-5 text-cyan-400" />,
    iconBg: 'bg-cyan-500/10',
  },
  'quote-reminder': {
    title: 'Quote Reminder',
    desc: 'Quotes that go quiet get chased automatically, then escalated — so you stop losing work to whoever followed up first.',
    icon: <MessageSquare className="h-5 w-5 text-amber-400" />,
    iconBg: 'bg-amber-500/10',
  },
  'invoice-chaser': {
    title: 'Invoice Chaser',
    desc: 'Politely escalating payment reminders that keep going until you\'re paid. No awkward phone calls.',
    icon: <Receipt className="h-5 w-5 text-rose-400" />,
    iconBg: 'bg-rose-500/10',
  },
  'job-appointment-reminder': {
    title: 'Appointment Reminder',
    desc: 'Customers get reminded before the job, so far fewer of them forget you\'re coming.',
    icon: <Calendar className="h-5 w-5 text-emerald-400" />,
    iconBg: 'bg-emerald-500/10',
  },
  'job-completion-review': {
    title: 'Review Request',
    desc: 'A review request goes out shortly after the job\'s done, while the customer is still pleased with the work.',
    icon: <Star className="h-5 w-5 text-yellow-400" />,
    iconBg: 'bg-yellow-500/10',
  },
  'big-quote-nurture': {
    title: 'Big Quote Nurture',
    desc: 'For quotes over £1,000 — a 3-email sequence over 2 weeks keeps you front of mind while they decide.',
    icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
    iconBg: 'bg-blue-500/10',
  },
  'compliance-cert-reminder': {
    title: 'Compliance Cert Reminder',
    desc: 'Gas Safe, NICEIC, Part P — tracked and flagged 30 days before anything lapses.',
    icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
    iconBg: 'bg-emerald-500/10',
  },
  'annual-service-reminder': {
    title: 'Annual Service Reminder',
    desc: '11 months after a job, past customers get a reminder their annual service is due. Repeat revenue on autopilot.',
    icon: <RefreshCw className="h-5 w-5 text-teal-400" />,
    iconBg: 'bg-teal-500/10',
  },
  'seasonal-outreach': {
    title: 'Seasonal Outreach',
    desc: 'At your trade\'s peak season, your past customer database gets a targeted email campaign. Planned revenue with no ad spend.',
    icon: <Megaphone className="h-5 w-5 text-purple-400" />,
    iconBg: 'bg-purple-500/10',
  },
  'emergency-callout-response': {
    title: 'Emergency Callout Response',
    desc: 'An instant text to the customer the moment an emergency comes in — stops them calling competitors while you\'re on another job.',
    icon: <Zap className="h-5 w-5 text-yellow-400" />,
    iconBg: 'bg-yellow-500/10',
  },
  'insurance-membership-renewal': {
    title: 'Insurance & Membership Renewal',
    desc: 'Public liability, van insurance, trade memberships — all tracked and alerted 30 days before expiry.',
    icon: <Briefcase className="h-5 w-5 text-indigo-400" />,
    iconBg: 'bg-indigo-500/10',
  },
  'new-enquiry-sms': {
    // Previously claimed "78% of jobs go to whoever responds first" — an
    // unsourced statistic. Replaced with the same point made honestly.
    title: 'New Enquiry SMS Alert',
    desc: 'A text to your phone the moment a new enquiry lands, so you can react before anyone else gets back to them.',
    icon: <Smartphone className="h-5 w-5 text-violet-400" />,
    iconBg: 'bg-violet-500/10',
  },
  'no-show-follow-up': {
    title: 'No-Show Follow-Up',
    desc: 'When a customer misses an appointment, a "we missed you" message goes out within the hour to rebook.',
    icon: <UserX className="h-5 w-5 text-orange-400" />,
    iconBg: 'bg-orange-500/10',
  },
  'warranty-checkin': {
    title: 'Warranty Check-In',
    desc: 'A friendly check-in before your 12-month guarantee expires — catches issues early and generates follow-on work.',
    icon: <Heart className="h-5 w-5 text-rose-400" />,
    iconBg: 'bg-rose-500/10',
  },
  'referral-trigger': {
    title: 'Referral Trigger',
    desc: 'After a 5-star review, your happiest customers get a referral offer — turning satisfaction into new business.',
    icon: <Users className="h-5 w-5 text-pink-400" />,
    iconBg: 'bg-pink-500/10',
  },
  'lapsed-customer-winback': {
    title: 'Lapsed Customer Win-Back',
    desc: 'Customers gone quiet for 18+ months get a warm "we\'d love to hear from you" message every month.',
    icon: <UserCheck className="h-5 w-5 text-teal-400" />,
    iconBg: 'bg-teal-500/10',
  },
  'silent-customer-alert': {
    title: 'Silent Customer Alert',
    desc: 'If a customer goes quiet 10 days after a job with no review, you get an internal flag to check in first.',
    icon: <Bell className="h-5 w-5 text-orange-400" />,
    iconBg: 'bg-orange-500/10',
  },
  'weekly-timesheet-chaser': {
    title: 'Timesheet Chaser',
    desc: 'Every Friday at 4pm, staff and subbies get an automatic reminder to submit their timesheets.',
    icon: <Clock className="h-5 w-5 text-slate-400" />,
    iconBg: 'bg-slate-500/10',
  },
  'monthly-cashflow-digest': {
    title: 'Monthly Cash Flow Digest',
    desc: 'On the 1st of every month, a summary of income, outstanding quotes and pipeline lands in your inbox.',
    icon: <PieChart className="h-5 w-5 text-indigo-400" />,
    iconBg: 'bg-indigo-500/10',
  },
  'daily-briefing': {
    title: 'Daily Job Briefing',
    desc: 'Every morning before you leave for site — active jobs, overdue items and new leads in one email.',
    icon: <LayoutDashboard className="h-5 w-5 text-accent-400" />,
    iconBg: 'bg-accent-500/10',
  },
};

// ── What comes with it, beyond the automations ────────────────────────────────
// The site used to describe DeepflowAI purely as a list of email automations,
// which undersold it badly — the portal app, the AI assistant and Call Me were
// never mentioned anywhere. Only genuinely working features are listed here:
// push notifications, alerts posted into the portal chat, and a scheduled daily
// call are all designed but not yet built, so they are deliberately absent.
const PLATFORM_FEATURES = [
  {
    title: 'Your own app',
    icon: <Smartphone className="h-5 w-5 text-accent-400" />,
    iconBg: 'bg-accent-500/10',
    desc: 'Save the portal to your phone\'s home screen and it opens like any other app — no browser, no logging in every time. Approve a quote from the van in ten seconds.',
  },
  {
    title: 'An AI that knows your business',
    icon: <MessageSquare className="h-5 w-5 text-cyan-400" />,
    iconBg: 'bg-cyan-500/10',
    desc: 'Chat to it like you\'d text a mate. "Who still owes me money?" "What\'s on tomorrow?" "Did the Hendersons ever come back on that quote?" It knows every job, customer and message.',
  },
  {
    title: 'Call me',
    icon: <Smartphone className="h-5 w-5 text-violet-400" />,
    iconBg: 'bg-violet-500/10',
    desc: 'Tap one button and the AI rings your phone with a rundown of what needs your attention. Handy when you\'re driving and can\'t be reading a screen.',
  },
  {
    title: 'Nothing sends without you',
    icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
    iconBg: 'bg-emerald-500/10',
    desc: 'Every message the AI writes waits for your approval. Read it, change it, or bin it. Not one word reaches a customer until you\'ve said yes.',
  },
  {
    title: 'It chases for you',
    icon: <Bell className="h-5 w-5 text-amber-400" />,
    iconBg: 'bg-amber-500/10',
    desc: 'When a customer goes quiet on a quote or an invoice, the system keeps following up on its own — and tells you when it\'s time you stepped in personally.',
  },
  {
    title: 'Everything in one place',
    icon: <LayoutDashboard className="h-5 w-5 text-blue-400" />,
    iconBg: 'bg-blue-500/10',
    desc: 'Every job from first enquiry to paid invoice, on one screen. No spreadsheets, no scribbled notes, no wondering what stage anything is at.',
  },
];

// ── What you get, one plan ────────────────────────────────────────────────────
// Replaced the three-stage Starter/Core/Trade Pro journey (with its £79/£127/£197
// prices and "2 more unlocked with Core →" upgrade prompts) on 2026-07-27. It was
// the fourth place pricing was hardcoded and contradicted the new single plan.

function WhatYouGet() {
  return (
    <div className="mb-14">
      <div className="rounded-2xl bg-slate-950/80 border border-white/10 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">

          {/* Left: the pitch */}
          <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/8 flex flex-col">
            <div className="inline-flex self-start items-center gap-2 text-xs font-bold text-accent-400 uppercase tracking-widest mb-5 bg-accent-500/10 border border-accent-500/20 px-3 py-1.5 rounded-full">
              One plan
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-4 leading-tight">
              Everything, from the first enquiry to the paid invoice.
            </h3>
            <p className="text-slate-400 leading-relaxed mb-8 flex-1">
              No packages to compare and nothing held back for a higher tier. You get all five
              core automations, five more built specifically for your trade, the app on your
              phone, and an AI assistant that knows every job you've got on.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="bg-slate-800/60 border border-white/8 rounded-xl px-5 py-3 flex flex-col justify-center">
                <p className="text-white font-bold text-lg">
                  <span className="text-slate-500 text-sm font-normal line-through mr-1.5">£200</span>
                  £150<span className="text-slate-500 text-sm font-normal">/month</span>
                </p>
                <p className="text-amber-400/80 text-xs mt-0.5">Founding rate · first 5 businesses · locked for life</p>
              </div>
              <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-5 py-3 flex flex-col justify-center">
                <p className="text-emerald-400 font-bold text-lg">10</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug max-w-[130px]">automations, all included</p>
              </div>
            </div>

            <p className="text-slate-500 text-sm italic">
              Nothing is ever sent to a customer without your approval.
            </p>
          </div>

          {/* Right: the core five */}
          <div className="p-8 lg:p-10">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
              The 5 core automations
            </p>
            <div className="space-y-2.5">
              {CORE_SLUGS.map(slug => {
                const data = AUTOMATION_DATA[slug];
                if (!data) return null;
                return (
                  <div key={slug} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.03]">
                    <div className={`rounded-lg flex items-center justify-center w-8 h-8 flex-shrink-0 ${data.iconBg}`}>
                      {data.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-300 flex-1">{data.title}</span>
                  </div>
                );
              })}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-accent-500/30 bg-accent-500/6 mt-1">
                <span className="text-accent-300 font-bold text-sm flex-1">+ 5 built for your trade</span>
                <span className="text-slate-500 text-xs">pick yours below ↓</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Core 5 ─────────────────────────────────────────────────────────────────────

const CORE_SLUGS = [
  'lead-follow-up',
  'quote-reminder',
  'invoice-chaser',
  'job-appointment-reminder',
  'job-completion-review',
];

// ── Trade profiles ─────────────────────────────────────────────────────────────

const TRADE_PROFILES = [
  {
    id: 'gas-engineer',
    name: 'Gas Engineer',
    emoji: '🔥',
    tagline: 'Boiler installs, servicing & emergency callouts',
    extras: ['compliance-cert-reminder', 'annual-service-reminder', 'seasonal-outreach', 'emergency-callout-response', 'insurance-membership-renewal'],
  },
  {
    id: 'electrician',
    name: 'Electrician',
    emoji: '⚡',
    tagline: 'Domestic, commercial, EV chargers & consumer units',
    extras: ['compliance-cert-reminder', 'emergency-callout-response', 'big-quote-nurture', 'insurance-membership-renewal', 'new-enquiry-sms'],
  },
  {
    id: 'plumber',
    name: 'Plumber',
    emoji: '🔧',
    tagline: 'Bathrooms, leaks, boilers & landlord certificates',
    extras: ['emergency-callout-response', 'no-show-follow-up', 'annual-service-reminder', 'new-enquiry-sms', 'lapsed-customer-winback'],
  },
  {
    id: 'builder',
    name: 'Builder',
    emoji: '🏗️',
    tagline: 'Extensions, conversions, renovations & groundwork',
    extras: ['big-quote-nurture', 'no-show-follow-up', 'warranty-checkin', 'lapsed-customer-winback', 'weekly-timesheet-chaser'],
  },
  {
    id: 'joiner',
    name: 'Joiner',
    emoji: '🪚',
    tagline: 'Fitted furniture, staircases, doors & windows',
    extras: ['big-quote-nurture', 'warranty-checkin', 'referral-trigger', 'lapsed-customer-winback', 'silent-customer-alert'],
  },
  {
    id: 'painter-decorator',
    name: 'Painter & Decorator',
    emoji: '🎨',
    tagline: 'Interior, exterior, commercial & wallpapering',
    extras: ['seasonal-outreach', 'big-quote-nurture', 'referral-trigger', 'lapsed-customer-winback', 'silent-customer-alert'],
  },
  {
    id: 'roofer',
    name: 'Roofer',
    emoji: '🏠',
    tagline: 'New roofs, repairs, guttering & flat roofs',
    extras: ['seasonal-outreach', 'big-quote-nurture', 'emergency-callout-response', 'no-show-follow-up', 'warranty-checkin'],
  },
  {
    id: 'landscaper',
    name: 'Landscaper',
    emoji: '🌿',
    tagline: 'Garden design, driveways, patios & maintenance',
    extras: ['seasonal-outreach', 'annual-service-reminder', 'big-quote-nurture', 'referral-trigger', 'lapsed-customer-winback'],
  },
];

// ── Specialist services ────────────────────────────────────────────────────────

const specialistServices = [
  {
    title: 'Social Media Content Engine',
    icon: <Megaphone className="h-6 w-6 text-amber-400" />,
    tagline: 'A full month of social media content, written and scheduled for you.',
    description: 'DeepflowAI generates, schedules, and manages your social media presence across Instagram, Facebook, LinkedIn, and TikTok — using AI trained on your trade, your tone, and your local area. You review and approve before anything goes live. Nothing is posted without your sign-off.',
    whatIsIncluded: [
      'Full monthly content calendar tailored to your trade',
      'AI-written posts for Instagram, Facebook, LinkedIn, TikTok',
      'Image and media suggestions for each post',
      'Your approval before anything goes live',
      'Scheduled to optimal posting times for your audience',
    ],
    disclaimer: 'This is a managed specialist service — DeepflowAI runs this on your behalf. Before setup, we\'ll walk through exactly how your content is created, what platforms we access, and what you retain full control over. Get in touch to find out more.',
  },
  {
    title: 'ClearLedger AI Bookkeeping',
    icon: <Calculator className="h-6 w-6 text-cyan-400" />,
    tagline: 'Upload your bank statement — AI sorts every transaction for your tax return.',
    description: 'ClearLedger reads your bank statement CSV and uses AI to classify every transaction into the correct HMRC SA103 self-assessment category — Office costs, Travel, Materials, Staff costs, Capital expenditure, and more. You review, override anything the AI got wrong, and export a clean spreadsheet ready for your accountant.',
    whatIsIncluded: [
      'CSV bank statement upload (Starling, Monzo, Barclays, HSBC, Lloyds)',
      'AI classification into HMRC SA103 categories',
      'Business vs personal transaction separation',
      'Confidence scores — low-confidence items flagged for your review',
      'Clean CSV export ready for your accountant',
    ],
    disclaimer: 'ClearLedger is a data organisation tool, not financial or tax advice. Classifications are AI-generated and should be reviewed before submitting your tax return. Before we set this up for you, we\'ll walk through how your financial data is stored, processed, and protected under UK GDPR. Get in touch to find out more.',
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

const AutomationCard: React.FC<{ slug: string; small?: boolean }> = ({ slug, small }) => {
  const data = AUTOMATION_DATA[slug];
  if (!data) return null;
  return (
    <div className={`group relative rounded-2xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col hover:bg-slate-900 ${small ? 'p-4' : 'p-6'}`}>
      <div className={`rounded-xl ${data.iconBg} flex items-center justify-center flex-shrink-0 ${small ? 'h-8 w-8 mb-3' : 'h-10 w-10 mb-4'} transition-all duration-300 group-hover:scale-110`}>
        {data.icon}
      </div>
      <h3 className={`font-bold text-white mb-1.5 ${small ? 'text-xs' : 'text-sm'}`}>{data.title}</h3>
      <p className={`text-slate-400 leading-relaxed flex-1 ${small ? 'text-xs' : 'text-sm'}`}>{data.desc}</p>
    </div>
  );
};

const SpecialistServiceCard: React.FC<typeof specialistServices[0]> = ({
  title, icon, tagline, description, whatIsIncluded, disclaimer,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-slate-900/80 overflow-hidden">
      <div className="p-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                Specialist Service
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-amber-300/80 text-sm font-medium mt-0.5">{tagline}</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{description}</p>
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-5"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {expanded ? 'Hide details' : 'What\'s included'}
        </button>
        {expanded && (
          <ul className="space-y-2 mb-5">
            {whatIsIncluded.map(item => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
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
    </div>
  );
};

// ── Main export ────────────────────────────────────────────────────────────────

export const Features: React.FC = () => {
  const [activeTrade, setActiveTrade] = useState(TRADE_PROFILES[0].id);
  const activeProfile = TRADE_PROFILES.find(t => t.id === activeTrade)!;
  const totalForTrade = CORE_SLUGS.length + activeProfile.extras.length;

  return (
    <>
      {/* ── Package section ── */}
      <Section id="features" className="bg-slate-900">
        <Container>
          <SectionHeading
            title={<>What you <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-indigo-400">get</span></>}
            subtitle="One plan with everything in it. We set the whole lot up for you — there's no software to learn and nothing to configure yourself."
            center
            dark
          />

          {/* ── What you get ── */}
          <WhatYouGet />

          {/* ── Trade-specific extras ── */}
          <FadeIn delay={200}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3">
                Plus 5 more, built specifically for your trade
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
          </FadeIn>

          {/* Trade selector */}
          <FadeIn delay={240}>
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {TRADE_PROFILES.map(trade => (
                <button
                  key={trade.id}
                  onClick={() => setActiveTrade(trade.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    activeTrade === trade.id
                      ? 'bg-accent-500/15 border-accent-500/40 text-accent-300'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'
                  }`}
                >
                  <span>{trade.emoji}</span>
                  <span>{trade.name}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Trade profile panel */}
          <FadeIn delay={280}>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {activeProfile.emoji} {activeProfile.name}
                  </p>
                  <p className="text-slate-400 text-sm">{activeProfile.tagline}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-500/10 border border-accent-500/20">
                  <span className="text-accent-400 font-bold text-lg">{totalForTrade}</span>
                  <span className="text-slate-400 text-sm">automations, all included</span>
                </div>
              </div>

              {/* Core 5 summary */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider self-center mr-1">Core 5:</span>
                {CORE_SLUGS.map(slug => (
                  <span key={slug} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {AUTOMATION_DATA[slug]?.title}
                  </span>
                ))}
              </div>

              {/* Trade extras grid */}
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                + {activeProfile.extras.length} built for {activeProfile.name}s:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeProfile.extras.map(slug => (
                  <AutomationCard key={slug} slug={slug} small />
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── The platform itself ──
          Added 2026-07-27. The site previously described DeepflowAI purely as a
          set of email automations and never mentioned the portal, the phone app,
          the AI assistant or Call Me at all. */}
      <Section id="platform" className="bg-slate-950">
        <Container>
          <SectionHeading
            title={<>It's more than <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-indigo-400">automated emails</span></>}
            subtitle="The automations do the chasing. This is the bit you actually use — on your phone, in the van, between jobs."
            center
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORM_FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 p-6 flex flex-col">
                  <div className={`rounded-xl ${f.iconBg} flex items-center justify-center h-10 w-10 mb-4 flex-shrink-0`}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Specialist Services ── */}
      <Section id="specialist" className="bg-slate-900">
        <Container>
          <SectionHeading
            title={<>Specialist <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Services</span></>}
            subtitle="These are managed services that go beyond standard automations. DeepflowAI handles the setup and ongoing management — with full transparency about how they work and what data is involved."
            center
            dark
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {specialistServices.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <SpecialistServiceCard {...s} />
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <p className="text-center text-slate-600 text-xs mt-10 max-w-2xl mx-auto leading-relaxed">
              Specialist services are not available as self-install options. They require an onboarding conversation with DeepflowAI so we can understand your needs, walk you through any data handling considerations, and ensure the service is set up correctly for your business.
            </p>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
};
