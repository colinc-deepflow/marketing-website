import React from 'react';
import {
  Inbox, FileText, CalendarCheck, Receipt, Star,
  MessageSquare, Phone, Moon, Eye, ShieldCheck, Smartphone,
  Zap, UserX, Users, Heart, BadgeCheck, TrendingUp, Check,
} from 'lucide-react';
import { Container, Section, SectionHeading, FadeIn } from './ui/Shared';

// ============================================================================
// What the £69 plan does — rewritten 11 Oct 2026 from a code audit of the
// command centre (see the project doc claude/feature-audit-2026-10.md).
//
// RULE: only list what the platform does TODAY. On 20 Sept 2026 the old
// "20 trade-specific automations" (annual service, seasonal outreach, cert
// tracking, insurance renewal, SMS alerts, timesheets, cash-flow digest, daily
// briefing) were switched off in automationRunner.js, so they are gone from
// here. Quotes and invoices go out as EMAILS (no PDFs). Customers are never
// texted by the system. The WhatsApp PA is built but not live — leave it off
// until it is.
// ============================================================================

// ── A job, start to finish ───────────────────────────────────────────────────
const JOURNEY = [
  {
    stage: 'Someone gets in touch',
    icon: Inbox,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    points: [
      'You get your own enquiry page — put it on Facebook, your van, your email footer.',
      'A reply is written for them within seconds, ready for you to send.',
      'Someone rings you instead? Log it in 20 seconds and the reply is written for you.',
    ],
  },
  {
    stage: 'You price the job',
    icon: FileText,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    points: [
      'Put the price on the job and the quote email is written for you.',
      'No answer? They get a friendly follow-up — then you get told it\'s time to ring them.',
      'It shows you which size of job you win and lose, and why — once there\'s enough to go on.',
    ],
  },
  {
    stage: 'The job is booked',
    icon: CalendarCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    points: [
      'A booking confirmation is ready the moment they say yes.',
      'Reminders lined up for two days and two hours before you arrive — fewer wasted trips.',
      'Before you quote a returning customer, it tells you how long they took to pay last time.',
    ],
  },
  {
    stage: 'The work is done',
    icon: Receipt,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    points: [
      'Mark it finished and the invoice email is written — with your bank details on it.',
      'Every £ figure and your bank details are checked against the job before it can go.',
      'Not paid? Polite reminders at 7, 14, 30 and 45 days. No awkward phone calls.',
    ],
  },
  {
    stage: 'You\'ve been paid',
    icon: Star,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    points: [
      'Two days later, a review request with your Google, Checkatrade or Trustpilot link.',
      'Eleven months on, a friendly "we\'re still here" note to bring them back.',
    ],
  },
];

// ── The AI PA ────────────────────────────────────────────────────────────────
const PA = [
  {
    title: 'Ask it anything',
    icon: MessageSquare,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    desc: 'Chat to it like you\'d text a mate. It knows every job, customer and message — and it can add a job or move one along for you.',
    examples: ['"Who still owes me money?"', '"What did I quote the Kellys?"', '"How many jobs did I finish last month?"'],
  },
  {
    title: 'Call Me',
    icon: Phone,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    desc: 'Hands dirty or driving? Tap one button and it rings your phone. Tell it what happened and it updates the jobs — and writes the next message for you.',
    examples: ['"Sarah Smith\'s bathroom is finished, invoice is £850."', '"Started the Davies job today."', '"Read me what\'s waiting for me."'],
  },
  {
    title: 'The 5 o\'clock call',
    icon: Moon,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    desc: 'If you want it, it rings you at five on weekdays so you can clear the day\'s jobs on the drive home. Miss it and it tries again at six.',
    examples: ['Switch it on or off any time.'],
  },
];

// ── What it watches ──────────────────────────────────────────────────────────
const WATCHERS = [
  'Every message it sends, it watches for a reply. When the customer answers, it reads what they want and writes your reply.',
  'A quote that\'s gone quiet gets followed up — and if they still don\'t answer, you\'re told it\'s time to pick up the phone.',
  'An invoice that\'s overdue gets chased — and you\'re told when it needs you to step in.',
  'Every morning it checks for jobs that are probably finished but not marked, and old customers who\'ve gone quiet.',
];

// ── One-tap messages ─────────────────────────────────────────────────────────
const TOOLS = [
  { label: 'Emergency reply', desc: 'Someone needs you now — a reply in seconds.', icon: Zap, color: 'text-yellow-400' },
  { label: 'No-show rebook', desc: 'Nobody home? Rebook without the awkward call.', icon: UserX, color: 'text-orange-400' },
  { label: 'Ask for a referral', desc: 'Happy customer? Ask them to pass your name on.', icon: Users, color: 'text-pink-400' },
  { label: 'Warranty check-in', desc: 'A check-in a few months after a big job.', icon: Heart, color: 'text-rose-400' },
  { label: 'Your cert reminder', desc: 'Keep track of your own certificates.', icon: BadgeCheck, color: 'text-emerald-400' },
  { label: 'Big quote follow-up', desc: 'A big price sitting quiet? A friendly nudge, not a hard sell.', icon: TrendingUp, color: 'text-blue-400' },
];

// ── Promises ─────────────────────────────────────────────────────────────────
const PROMISES = [
  'It never sends a message you haven\'t read and approved.',
  'It never sends a price you haven\'t seen — every figure is checked against the job.',
  'It never rings your customers. It only rings you.',
  'It never makes up a number. If it can\'t count it from your jobs, it doesn\'t show it.',
  'Every message sent and every job moved is in your activity list.',
];

export const Features: React.FC = () => (
  <>
    {/* ── A job, start to finish ── */}
    <Section id="features" className="bg-slate-900">
      <Container>
        <SectionHeading
          title={<>What it does for you, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-indigo-400">job by job</span></>}
          subtitle="From the first message to the money in your account — and the review after. All for £69 a month, all on your phone."
          center
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {JOURNEY.map((j, i) => (
            <FadeIn key={j.stage} delay={i * 80}>
              <div className="h-full rounded-2xl bg-slate-950/60 border border-white/10 hover:border-white/20 transition-all duration-300 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`rounded-xl ${j.bg} flex items-center justify-center h-10 w-10 flex-shrink-0`}>
                    <j.icon className={`h-5 w-5 ${j.color}`} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step {i + 1}</span>
                </div>
                <h3 className="font-bold text-white mb-3">{j.stage}</h3>
                <ul className="space-y-2.5 flex-1">
                  {j.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-400 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-accent-500 flex-shrink-0 mt-1" strokeWidth={2.5} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <p className="text-center text-slate-500 text-sm mt-10 max-w-2xl mx-auto">
            Every message is written in your words, signed off the way you sign off — and waits for your OK.
          </p>
        </FadeIn>
      </Container>
    </Section>

    {/* ── The AI PA ── */}
    <Section id="pa" className="bg-slate-950">
      <Container>
        <SectionHeading
          title={<>Your own <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-indigo-400">AI PA</span></>}
          subtitle="It knows your whole business. Ask it, ring it, or let it ring you."
          center
          dark
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PA.map((f, i) => (
            <FadeIn key={f.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 p-7 flex flex-col">
                <div className={`rounded-xl ${f.bg} flex items-center justify-center h-11 w-11 mb-5`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{f.desc}</p>
                <div className="space-y-2 mt-auto">
                  {f.examples.map(e => (
                    <div key={e} className="text-xs text-slate-300 bg-white/[0.04] border border-white/10 rounded-xl rounded-tl-sm px-3.5 py-2.5">
                      {e}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={300}>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 text-center">
            <Smartphone className="w-4 h-4 text-accent-500 flex-shrink-0" />
            <span>It lives on your phone's home screen like any other app. No app store, no logging in every time.</span>
          </div>
        </FadeIn>
      </Container>
    </Section>

    {/* ── The watchers + Friday text ── */}
    <Section id="watchers" className="bg-slate-900">
      <Container>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading
              title={<>It keeps an <span className="text-accent-400">eye on everything</span></>}
              subtitle="You don't have to remember who you're waiting on. It does."
              dark
            />
            <div className="space-y-3">
              {WATCHERS.map((w, i) => (
                <FadeIn key={w} delay={i * 75}>
                  <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/10">
                    <div className="p-2 bg-accent-500/10 rounded-lg text-accent-400 flex-shrink-0">
                      <Eye size={16} />
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed">{w}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={200}>
            <div className="max-w-sm mx-auto w-full">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">
                Every Friday at 5pm, a text like this
              </p>
              <div className="rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                  <div className="w-8 h-8 rounded-full bg-accent-500/15 flex items-center justify-center text-accent-400 text-xs font-bold">DF</div>
                  <span className="text-sm text-white font-semibold">DeepFlow</span>
                </div>
                <div className="bg-slate-800/70 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-200 leading-relaxed space-y-2">
                  <p>This week at Smith Joinery:</p>
                  <p>6 enquiries answered — 4 inside a minute.<br />
                    4 quotes out, worth £3,100.<br />
                    £2,300 chased.<br />
                    £1,150 landed in your account.<br />
                    You approved 11 messages — about four minutes of your time.</p>
                </div>
                <p className="text-[11px] text-slate-600 mt-3 text-center">
                  Example. Every figure is counted from your own jobs — never guessed. Quiet week? No text.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>

    {/* ── One-tap messages ── */}
    <Section id="tools" className="bg-slate-950">
      <Container>
        <SectionHeading
          title={<>One tap for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-indigo-400">awkward ones</span></>}
          subtitle="The messages nobody likes writing. Tap, fill in a line or two, and it's written for you."
          center
          dark
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((t, i) => (
            <FadeIn key={t.label} delay={i * 60}>
              <div className="h-full flex items-start gap-4 rounded-2xl bg-slate-900/60 border border-white/10 p-5">
                <div className="rounded-xl bg-white/5 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <t.icon className={`h-5 w-5 ${t.color}`} />
                </div>
                <div>
                  <p className="font-bold text-white text-sm mb-1">{t.label}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Promises */}
        <FadeIn delay={200}>
          <div className="mt-14 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">You're always the boss</h3>
            </div>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
              {PROMISES.map(p => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </Section>
  </>
);
