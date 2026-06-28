import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, Mail, Clock, CheckCircle2, AlertCircle, Database,
  Send, Calendar, FileText, DollarSign, Star, MessageSquare,
  Bell, Sparkles, Check, Search, Phone,
} from 'lucide-react';
import { Container, Section, FadeIn, SectionHeading } from './ui/Shared';

type StepState = 'pending' | 'active' | 'complete';

interface Step {
  icon: React.ElementType;
  label: string;
  detail: string;
  iconColor: string;
  iconBg: string;
}

interface OutputPreview {
  type: 'email' | 'message';
  channel: string;
  to: string;
  subject?: string;
  fullBody: string;
}

interface Scenario {
  id: string;
  label: string;
  icon: React.ElementType;
  triggerIcon: React.ElementType;
  trigger: string;
  triggerDetail: string;
  steps: Step[];
  output: OutputPreview;
}

const scenarios: Scenario[] = [
  {
    id: 'quote',
    label: 'New Quote Request',
    icon: FileText,
    triggerIcon: Zap,
    trigger: 'Enquiry received via website form',
    triggerDetail: 'Webhook fired · Customer data extracted · Job type identified',
    steps: [
      {
        icon: Database,
        label: 'Log & Acknowledge',
        detail: 'Contact saved to CRM, auto-reply sent to customer within 60 seconds',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
      },
      {
        icon: FileText,
        label: 'Qualify the Job',
        detail: 'AI drafts follow-up questions tailored to the job type',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
      },
      {
        icon: Clock,
        label: 'Schedule Follow-Up',
        detail: '24hr chaser queued automatically if no customer response detected',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: '[Customer Name]',
      subject: "Re: Your Enquiry — We'll Be in Touch",
      fullBody: `Hi [Customer Name],

Thanks for getting in touch. I've received your enquiry and will put together a detailed quote for you shortly.

To make sure I give you an accurate price, could you quickly confirm:
  • The scope and location of the job
  • Your preferred materials or specifications
  • Your ideal timeline

I'll have your quote ready within 48 hours of receiving those details.

Best,
[Your Name]`,
    },
  },
  {
    id: 'silent',
    label: 'Silent Client',
    icon: MessageSquare,
    triggerIcon: Clock,
    trigger: 'No client response detected for 5+ days',
    triggerDetail: 'Scheduled scan · 9am daily · Status: Quote Sent, no reply',
    steps: [
      {
        icon: Search,
        label: 'Detect Silence',
        detail: 'System scans all open jobs with status "Quote Sent" and no reply',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
      },
      {
        icon: Mail,
        label: 'Send Chaser',
        detail: 'Friendly, personalised follow-up email sent automatically on Day 5',
        iconColor: 'text-accent-400',
        iconBg: 'bg-accent-500/10',
      },
      {
        icon: AlertCircle,
        label: 'Escalate if Needed',
        detail: 'Day 14: job flagged for your manual review if still no response',
        iconColor: 'text-rose-400',
        iconBg: 'bg-rose-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: '[Customer Name]',
      subject: 'Quick Check-In — Your Quote',
      fullBody: `Hi [Customer Name],

Just checking in on the quote I sent over on [date]. Wanted to make sure it reached you and that everything looked clear.

No pressure at all — just let me know either way so I can keep my schedule updated.

Happy to talk through anything or adjust the quote if needed.

Cheers,
[Your Name]`,
    },
  },
  {
    id: 'reminder',
    label: 'Job Reminder',
    icon: Bell,
    triggerIcon: Calendar,
    trigger: 'Job scheduled within 7 days detected',
    triggerDetail: 'Morning calendar scan · Prep sequence triggered',
    steps: [
      {
        icon: Calendar,
        label: 'Detect Upcoming Job',
        detail: 'Daily calendar scan flags all jobs due within 7 days',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
      },
      {
        icon: Mail,
        label: 'Email Reminder (Day −3)',
        detail: 'Reminder email with prep checklist sent 3 days before the job',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
      },
      {
        icon: MessageSquare,
        label: 'WhatsApp / SMS (Day −1)',
        detail: '24hr reminder via customer\'s preferred channel, awaits confirmation',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
      },
    ],
    output: {
      type: 'message',
      channel: 'WhatsApp',
      to: '[Customer Name]',
      fullBody: `Hi [Customer Name] 👋

Just a reminder your job is scheduled for tomorrow at [Time].

Before we arrive, please make sure:
  ✓ The area is clear and accessible
  ✓ Parking is available for our van
  ✓ Any fragile items nearby are moved

I'll give you a quick call 30 minutes before arrival.

See you tomorrow!
[Your Name]`,
    },
  },
  {
    id: 'invoice',
    label: 'Invoice & Payment',
    icon: DollarSign,
    triggerIcon: CheckCircle2,
    trigger: 'Job marked as "Complete" in dashboard',
    triggerDetail: 'Status change trigger · Invoice auto-generated from job record',
    steps: [
      {
        icon: FileText,
        label: 'Generate Invoice',
        detail: 'Pulls agreed quote amount, materials & labour into invoice template',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
      },
      {
        icon: Send,
        label: 'Send with Payment Link',
        detail: 'Invoice emailed instantly with a Stripe / GoCardless payment link',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
      },
      {
        icon: Clock,
        label: 'Chase if Unpaid',
        detail: 'Reminders sent automatically at Day 7, 14 & 21 — stops on payment',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: '[Customer Name]',
      subject: 'Invoice #INV-042 — Payment Due',
      fullBody: `Hi [Customer Name],

Great working with you — please find invoice #INV-042 for £[Amount] below.

Pay instantly online:
  → [Payment Link]

Or by bank transfer:
  Sort Code: XX-XX-XX
  Account:   XXXXXXXX
  Reference: INV-042

Payment is due within 14 days. Any questions, just shout.

Thanks,
[Your Name]`,
    },
  },
  {
    id: 'booking',
    label: 'Booking Confirmation',
    icon: Calendar,
    triggerIcon: Phone,
    trigger: 'Customer requests a site visit',
    triggerDetail: 'Form submission · WhatsApp message · Availability check triggered',
    steps: [
      {
        icon: Calendar,
        label: 'Check Availability',
        detail: 'Calendar scanned, 3 available slots identified and sent to customer',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
      },
      {
        icon: CheckCircle2,
        label: 'Confirm Booking',
        detail: 'Customer selects a slot — auto-added to your calendar with notes',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
      },
      {
        icon: Bell,
        label: 'Send Reminders',
        detail: '24hr reminder to customer + job briefing sent to you',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: '[Customer Name]',
      subject: 'Visit Confirmed — [Day, Date] at [Time]',
      fullBody: `Hi [Customer Name],

Your visit is confirmed:

  📅 Date:    [Day, Date]
  🕐 Time:    [Time]
  📍 Address: [Your Address]

I'll assess the job, talk through your requirements, and give you a clear idea of cost. Usually around 30–45 minutes.

Please have ready if possible:
  ✓ Any reference photos or ideas
  ✓ Access to all relevant areas

See you then!
[Your Name]`,
    },
  },
  {
    id: 'review',
    label: 'Review Request',
    icon: Star,
    triggerIcon: Star,
    trigger: 'Job marked complete — 3-day timer starts',
    triggerDetail: 'Delayed trigger · Personalised message queued',
    steps: [
      {
        icon: Clock,
        label: '3-Day Wait',
        detail: 'Timer starts on job completion — gives the customer time to settle in',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
      },
      {
        icon: Star,
        label: 'Send Review Request',
        detail: 'Personalised email with a direct Google review link sent automatically',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
      },
      {
        icon: AlertCircle,
        label: 'Monitor & Flag',
        detail: 'New reviews trigger instant alerts — negatives escalated to you first',
        iconColor: 'text-rose-400',
        iconBg: 'bg-rose-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: '[Customer Name]',
      subject: 'How Did We Do? Quick Favour 🙏',
      fullBody: `Hi [Customer Name],

Hope everything is looking great after we finished your [project] — it was a pleasure working with you.

If you're happy with the result, a quick Google review would mean the world to us:

  ⭐ Leave a Review → [Google Review Link]

Just a sentence or two makes a huge difference to other homeowners finding quality tradespeople.

If anything isn't quite right, please reply to this email first — I'll sort it straight away.

Thanks so much,
[Your Name]`,
    },
  },
];

export const InteractiveDemo: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [stepStates, setStepStates] = useState<StepState[]>([]);
  const [showOutput, setShowOutput] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const runScenario = (scenario: Scenario) => {
    clearTimeouts();
    setActiveScenario(scenario);
    setStepStates(scenario.steps.map(() => 'pending'));
    setShowOutput(false);
    setIsAnimating(true);

    scenario.steps.forEach((_, i) => {
      const t1 = setTimeout(() => {
        setStepStates(prev => prev.map((s, idx) => idx === i ? 'active' : s));
      }, i * 900);

      const t2 = setTimeout(() => {
        setStepStates(prev => prev.map((s, idx) => idx === i ? 'complete' : s));
        if (i === scenario.steps.length - 1) {
          const t3 = setTimeout(() => {
            setShowOutput(true);
            setIsAnimating(false);
          }, 400);
          timeoutsRef.current.push(t3);
        }
      }, i * 900 + 650);

      timeoutsRef.current.push(t1, t2);
    });
  };

  useEffect(() => {
    const t = setTimeout(() => runScenario(scenarios[0]), 400);
    return () => {
      clearTimeout(t);
      clearTimeouts();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section id="demo" className="bg-slate-950 overflow-hidden">
      <Container>
        <SectionHeading
          title={<>See the <span className="text-accent-400">System</span> in Action</>}
          subtitle="Select a scenario to watch the automation run in real time — exactly how it works in production."
          center
          dark
        />

        {/* Scenario selector */}
        <FadeIn>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => !isAnimating && runScenario(s)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95 ${
                  activeScenario?.id === s.id
                    ? 'bg-accent-500/15 border-accent-500/40 text-accent-300 shadow-[0_0_16px_rgba(6,182,212,0.1)]'
                    : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                } ${isAnimating && activeScenario?.id !== s.id ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <s.icon className="w-3.5 h-3.5" />
                {s.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Main panel */}
        {activeScenario && (
          <div className="grid lg:grid-cols-2 gap-6 items-start">

            {/* Left: Trigger + Steps */}
            <div className="space-y-3">

              {/* Trigger card */}
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-accent-500/10 border border-accent-500/20 rounded-xl p-2.5 flex-shrink-0">
                  <activeScenario.triggerIcon className="w-4 h-4 text-accent-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-accent-400 uppercase tracking-widest">Trigger</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
                  </div>
                  <p className="text-white font-semibold text-sm">{activeScenario.trigger}</p>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">{activeScenario.triggerDetail}</p>
                </div>
              </div>

              {/* Step pipeline */}
              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-[19px] top-6 bottom-6 w-px bg-white/5 z-0" />

                <div className="space-y-2.5 relative z-10">
                  {activeScenario.steps.map((step, i) => {
                    const state = stepStates[i] ?? 'pending';
                    return (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-4 rounded-2xl border transition-all duration-500 ${
                          state === 'complete'
                            ? 'bg-slate-900/80 border-white/15'
                            : state === 'active'
                            ? 'bg-slate-900/60 border-accent-500/30 shadow-[0_0_24px_rgba(6,182,212,0.06)]'
                            : 'bg-slate-900/20 border-white/5 opacity-40'
                        }`}
                      >
                        {/* Status dot */}
                        <div className="flex-shrink-0 mt-0.5">
                          {state === 'complete' ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                              <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
                            </div>
                          ) : state === 'active' ? (
                            <div className="w-6 h-6 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-slate-700" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className={`${step.iconBg} p-1.5 rounded-lg flex-shrink-0`}>
                                <step.icon className={`w-3.5 h-3.5 ${step.iconColor}`} />
                              </div>
                              <span className={`text-sm font-bold leading-tight ${
                                state === 'pending' ? 'text-slate-600' : 'text-white'
                              }`}>
                                {step.label}
                              </span>
                            </div>
                            <div className="flex-shrink-0">
                              {state === 'active' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-accent-500/15 text-accent-400 rounded-full border border-accent-500/20 animate-pulse">
                                  Running…
                                </span>
                              )}
                              {state === 'complete' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                                  Done
                                </span>
                              )}
                            </div>
                          </div>
                          <p className={`text-xs leading-relaxed ${
                            state === 'pending' ? 'text-slate-700' : 'text-slate-400'
                          }`}>
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Output preview */}
            <div className="lg:sticky lg:top-24">
              {showOutput ? (
                <div className="animate-fade-in-up bg-slate-900/60 rounded-2xl border border-white/15 overflow-hidden">

                  {/* Preview header — fake browser/email chrome */}
                  <div className="bg-slate-900 px-5 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                      </div>
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        {activeScenario.output.channel} · Draft
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                      Ready to Review
                    </span>
                  </div>

                  {/* Email meta */}
                  {activeScenario.output.type === 'email' && (
                    <div className="px-5 py-3.5 border-b border-white/5 space-y-1.5">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[10px] text-slate-600 font-bold uppercase w-12 text-right flex-shrink-0">To</span>
                        <span className="text-sm text-slate-300">{activeScenario.output.to}</span>
                      </div>
                      {activeScenario.output.subject && (
                        <div className="flex items-baseline gap-3">
                          <span className="text-[10px] text-slate-600 font-bold uppercase w-12 text-right flex-shrink-0">Subject</span>
                          <span className="text-sm text-white font-semibold">{activeScenario.output.subject}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message preview */}
                  <div className="p-5">
                    {activeScenario.output.type === 'message' ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            To: {activeScenario.output.to}
                          </span>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl rounded-tl-sm p-4">
                          <pre className="text-[12px] text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                            {activeScenario.output.fullBody}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <pre className="text-[12px] text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                        {activeScenario.output.fullBody}
                      </pre>
                    )}

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-slate-600">
                        Generated automatically · awaiting your review
                      </span>
                      <button className="text-[11px] font-bold text-accent-400 hover:text-accent-300 transition-colors">
                        Approve & Send →
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="min-h-[360px] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 text-slate-700">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Sparkles size={20} />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-bold text-slate-600">Draft preparing…</p>
                    <p className="text-xs text-slate-700">Appears once the workflow completes</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Footer note */}
        <FadeIn delay={200}>
          <div className="mt-8 flex items-start gap-4 p-5 bg-slate-900/40 rounded-2xl border border-white/5">
            <div className="p-2 bg-accent-500/10 rounded-xl text-accent-400 flex-shrink-0 mt-0.5">
              <Sparkles size={15} />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              These workflows show the exact logic your system will run — built once, running continuously.
              Every message is held for your review before it sends, so you stay in control at every step.
              Click any scenario to replay the sequence.
            </p>
          </div>
        </FadeIn>

      </Container>
    </Section>
  );
};
