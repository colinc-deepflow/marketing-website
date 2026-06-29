import React, { useState } from 'react';
import {
  Receipt, MessageSquare, Bell, Star,
  LayoutDashboard, Calendar, TrendingUp, ShieldCheck,
  Users, Heart, PieChart, Megaphone, Calculator, Mail, Smartphone,
  ExternalLink, ChevronDown, ChevronUp, Clock, Zap, UserX, UserCheck,
  Briefcase, RefreshCw, Check,
} from 'lucide-react';
import { Container, Section, SectionHeading, FadeIn } from './ui/Shared';

// ── Automation data ────────────────────────────────────────────────────────────

const AUTOMATION_DATA: Record<string, { title: string; desc: string; icon: React.ReactNode; iconBg: string }> = {
  'lead-follow-up': {
    title: 'Lead Follow-Up Email',
    desc: 'A personalised follow-up goes out 24 hours after every new enquiry. First to respond wins the job.',
    icon: <Mail className="h-5 w-5 text-cyan-400" />,
    iconBg: 'bg-cyan-500/10',
  },
  'quote-reminder': {
    title: 'Quote Reminder',
    desc: 'Quotes that go quiet after 3 days get an automatic follow-up — no more losing jobs to a slow chase.',
    icon: <MessageSquare className="h-5 w-5 text-amber-400" />,
    iconBg: 'bg-amber-500/10',
  },
  'invoice-chaser': {
    title: 'Invoice Chaser',
    desc: 'Professionally escalating payment reminders at 7, 14 and 30 days — no awkward conversations needed.',
    icon: <Receipt className="h-5 w-5 text-rose-400" />,
    iconBg: 'bg-rose-500/10',
  },
  'job-appointment-reminder': {
    title: 'Appointment Reminder',
    desc: 'Customers get automatic reminders 48 hours and 2 hours before every job. No-shows drop significantly.',
    icon: <Calendar className="h-5 w-5 text-emerald-400" />,
    iconBg: 'bg-emerald-500/10',
  },
  'job-completion-review': {
    title: 'Review Request',
    desc: 'A review request goes out automatically within 30 minutes of a completed job — when it\'s freshest.',
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
    title: 'New Enquiry SMS Alert',
    desc: 'A text to your phone the moment a new enquiry lands — 78% of jobs go to whoever responds first.',
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

// ── Journey stage data ─────────────────────────────────────────────────────────

const STARTER_SLUGS = ['lead-follow-up', 'quote-reminder', 'invoice-chaser'];
const CORE_ADD_SLUGS = ['job-appointment-reminder', 'job-completion-review'];

const JOURNEY_STAGES = [
  {
    id:          'starter',
    step:        '01',
    label:       'Starter',
    headline:    'Stop losing jobs before you even know about them.',
    sub:         'Three automations that fix the three biggest money leaks in any trades business — leads going cold, quotes going silent, and invoices going unpaid.',
    impact:      '7+',
    impactLabel: 'hours saved every week from day one',
    price:       '£79/mo',
    setup:       '+ £149 setup',
    hook:        'Most clients cover the cost in the first week.',
    slugs:       STARTER_SLUGS,
    newSlugs:    STARTER_SLUGS,
  },
  {
    id:          'core',
    step:        '02',
    label:       'Core',
    headline:    'Add the two that keep customers coming back.',
    sub:         'Appointment reminders cut no-shows overnight. Review requests build your Google reputation while you sleep. Add them to your Starter and the whole system clicks into place.',
    impact:      '10+',
    impactLabel: 'hours back in your week',
    price:       '£127/mo',
    setup:       '+ £299 setup',
    hook:        'Most clients add these within the first couple of months.',
    slugs:       [...STARTER_SLUGS, ...CORE_ADD_SLUGS],
    newSlugs:    CORE_ADD_SLUGS,
  },
  {
    id:          'trade',
    step:        '03',
    label:       'Trade Pro',
    headline:    'Five more automations built for how your trade actually works.',
    sub:         "Emergency callouts, compliance reminders, seasonal campaigns, big quote nurture — the automations your competitors don't have. Pre-configured for your specific trade, ready to run.",
    impact:      '15+',
    impactLabel: 'hours saved — the full package',
    price:       '£197/mo',
    setup:       '+ £499 setup',
    hook:        'Select your trade below to see exactly what\'s included.',
    slugs:       [...STARTER_SLUGS, ...CORE_ADD_SLUGS],
    newSlugs:    [],
  },
];

// ── Interactive package journey ────────────────────────────────────────────────

function PackageJourney() {
  const [active, setActive] = useState(JOURNEY_STAGES[0].id);
  const stageIdx = JOURNEY_STAGES.findIndex(s => s.id === active);
  const stage    = JOURNEY_STAGES[stageIdx];

  return (
    <div className="mb-14">

      {/* ── Step track ── */}
      <div className="flex items-start gap-0 mb-10">
        {JOURNEY_STAGES.map((s, i) => {
          const isActive = s.id === active;
          const isPast   = i < stageIdx;
          const isLast   = i === JOURNEY_STAGES.length - 1;
          return (
            <React.Fragment key={s.id}>
              <button
                onClick={() => setActive(s.id)}
                className="flex flex-col items-center gap-2 group flex-shrink-0 min-w-0"
              >
                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-black text-xs transition-all duration-300 ${
                  isActive
                    ? 'bg-accent-500 border-accent-500 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                    : isPast
                    ? 'bg-accent-500/20 border-accent-500/50 text-accent-400'
                    : 'bg-slate-900 border-white/15 text-slate-500 group-hover:border-white/30 group-hover:text-slate-300'
                }`}>
                  {isPast ? <Check className="w-3.5 h-3.5" /> : s.step}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider text-center transition-colors ${
                  isActive ? 'text-white' : isPast ? 'text-accent-400/60' : 'text-slate-500 group-hover:text-slate-300'
                }`}>
                  {s.label}
                </span>
              </button>

              {/* connector line between nodes */}
              {!isLast && (
                <div className="flex-1 h-px mt-5 mx-2 transition-colors duration-500">
                  <div className={`h-full transition-colors duration-500 ${
                    stageIdx > i ? 'bg-accent-500' : 'bg-white/8'
                  }`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Content panel ── */}
      <div className="rounded-2xl bg-slate-950/80 border border-white/10 overflow-hidden transition-all duration-300">
        <div className="grid lg:grid-cols-2 gap-0">

          {/* Left: pitch */}
          <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/8 flex flex-col">
            <div className="inline-flex self-start items-center gap-2 text-xs font-bold text-accent-400 uppercase tracking-widest mb-5 bg-accent-500/10 border border-accent-500/20 px-3 py-1.5 rounded-full">
              {stage.label}
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-4 leading-tight">
              {stage.headline}
            </h3>
            <p className="text-slate-400 leading-relaxed mb-8 flex-1">{stage.sub}</p>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-5 py-3">
                <p className="text-2xl font-black text-emerald-400 leading-none">{stage.impact}</p>
                <p className="text-xs text-slate-500 mt-1 leading-snug max-w-[130px]">{stage.impactLabel}</p>
              </div>
              <div className="bg-slate-800/60 border border-white/8 rounded-xl px-5 py-3 flex flex-col justify-center">
                <p className="text-white font-bold">{stage.price}</p>
                <p className="text-slate-600 text-xs mt-0.5">{stage.setup} · 2 months free annually</p>
              </div>
            </div>

            <p className="text-slate-500 text-sm italic">{stage.hook}</p>
          </div>

          {/* Right: automation list */}
          <div className="p-8 lg:p-10">
            {stage.id !== 'trade' ? (
              <>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
                  {stage.id === 'starter' ? 'Your 3 automations' : 'All 5 automations'}
                </p>
                <div className="space-y-2.5">
                  {stage.slugs.map(slug => {
                    const data  = AUTOMATION_DATA[slug];
                    const isNew = stage.newSlugs.includes(slug);
                    if (!data) return null;
                    return (
                      <div key={slug} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
                        isNew
                          ? 'bg-emerald-500/6 border-emerald-500/25'
                          : 'bg-white/[0.03] border-white/8'
                      }`}>
                        <div className={`rounded-lg flex items-center justify-center w-8 h-8 flex-shrink-0 ${data.iconBg}`}>
                          {data.icon}
                        </div>
                        <span className={`text-sm font-medium flex-1 ${isNew ? 'text-white' : 'text-slate-400'}`}>
                          {data.title}
                        </span>
                        {isNew && stage.id === 'core' && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
                            + Added
                          </span>
                        )}
                      </div>
                    );
                  })}
                  {stage.id === 'starter' && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-white/10 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 italic">2 more unlocked with Core →</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
                  Everything in Core, plus 5 trade-specific
                </p>
                <div className="space-y-2.5 mb-4">
                  {[...STARTER_SLUGS, ...CORE_ADD_SLUGS].map(slug => {
                    const data = AUTOMATION_DATA[slug];
                    if (!data) return null;
                    return (
                      <div key={slug} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.03]">
                        <div className={`rounded-lg flex items-center justify-center w-7 h-7 flex-shrink-0 ${data.iconBg}`}>
                          {data.icon}
                        </div>
                        <span className="text-sm text-slate-400">{data.title}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-accent-500/30 bg-accent-500/6 mt-4">
                  <span className="text-accent-300 font-bold text-sm">+ 5 built for your trade</span>
                  <span className="text-slate-500 text-xs">↓ pick your trade below</span>
                </div>
              </>
            )}
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
            title={<>What's in your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-indigo-400">package</span></>}
            subtitle="Start with 3 core automations — the ones that make the biggest difference on day one. Add more as your business grows. We configure everything for you, no software to learn."
            center
            dark
          />

          {/* ── Package journey ── */}
          <PackageJourney />

          {/* ── Trade-specific extras ── */}
          <FadeIn delay={200}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3">
                Trade Pro adds 5 more — built specifically for your trade
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
                  <span className="text-slate-400 text-sm">automations in Trade Pro</span>
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

      {/* ── Specialist Services ── */}
      <Section id="specialist" className="bg-slate-950">
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
