import React from 'react';
import { Check } from 'lucide-react';
import { Container } from './ui/Shared';

// Rewritten 11 Oct 2026. The old page sold "role-based AI agents" to
// "larger organisations" and listed 18 automations, most of which were
// switched off on 20 Sept 2026. This version describes the two things we
// actually sell, in plain English. See claude/feature-audit-2026-10.md.

const Card: React.FC<{ title: string; tag?: string; children: React.ReactNode }> = ({ title, tag, children }) => (
  <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      {tag && <span className="text-sm font-bold text-accent-400">{tag}</span>}
    </div>
    <div className="text-slate-400 leading-relaxed text-sm space-y-3">{children}</div>
  </div>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2">
    {items.map(i => (
      <li key={i} className="flex items-start gap-2.5">
        <Check className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
        <span>{i}</span>
      </li>
    ))}
  </ul>
);

export const ServicesPage: React.FC = () => (
  <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-600/6 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

    <Container className="relative z-10">
      <div className="max-w-3xl">
        <div className="mb-16">
          <div className="h-px w-14 bg-gradient-to-r from-accent-500 to-blue-500 mb-8" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            What we do
          </h1>
          <p className="text-xl text-slate-300 font-light mb-4 leading-relaxed">
            We take the paperwork off tradespeople, so the evenings are yours again.
          </p>
          <p className="text-slate-400 leading-relaxed">
            There are two ways we do it: a ready-made plan that handles the everyday admin every trade has,
            and custom work for the job that's unique to you.
          </p>
        </div>

        <div className="space-y-5">
          <Card title="The DeepFlow plan" tag="£69/month + £100 setup">
            <p>
              Your own office manager on your phone. It writes the replies, quotes, booking reminders, invoices and
              payment chasers — in your words — and waits for you to tap OK.
            </p>
            <List items={[
              'Every enquiry gets a reply written within seconds',
              'Quotes and invoices followed up until you get an answer — or get paid',
              'Reads customer replies and writes your answer',
              'An AI PA you can chat to, or that rings you with what needs doing',
              'A text every Friday with your week in numbers',
              'Monthly, cancel anytime',
            ]} />
          </Card>

          <Card title="Custom work" tag="Priced per job">
            <p>
              Some jobs no app will ever fix — because they're about the way <em>your</em> contractor, supplier or
              customer works. Job cards that arrive by email, a spreadsheet you fill in every month, a portal you
              type everything into twice. We build the fix.
            </p>
            <p className="text-white font-semibold pt-2">How it works</p>
            <List items={[
              'You tell us the job you hate, in your own words',
              'You send us a photo or copy of the real paperwork — the email, the job sheet, the invoice, the spreadsheet',
              'We write down how we think you do it now, and you correct anything we got wrong',
              'We show you the fix in plain English: what it does, what you still do, and the price',
              'We build it in small steps, testing each one on your real paperwork',
              'For the first month it runs alongside your old way, until you\'re happy to switch',
              'You get a simple guide, and you know who to call',
            ]} />
            <p className="text-white font-semibold pt-2">The kind of thing we build</p>
            <List items={[
              'Contractor job cards → jobs on your lads\' phones → invoices → the contractor\'s spreadsheet',
              'Supplier invoices read from your email into a spreadsheet',
              'Job sheets turned into invoices on your own template, with VAT, reverse charge and CIS done right',
              'Your bank statement sorted into tax-return categories for your accountant',
              'A month of social media posts, written for you to approve',
            ]} />
          </Card>

          <Card title="Real example: D&M Fixing & Joinery">
            <p>
              Robert's jobs came in by email from his main contractor. Every one was typed into a spreadsheet, priced,
              invoiced, and then typed again into the contractor's online system. We built him a system that picks up
              the job cards — even photos of them — puts the jobs on his joiners' phones, prices them, makes the invoices
              on his own template and fills in the contractor's month-end spreadsheet.
            </p>
            <p className="text-white font-semibold">It gives him about an hour and a half back every night.</p>
          </Card>

          <Card title="What never changes">
            <List items={[
              'You approve anything that goes to a customer or involves money',
              'Your files stay yours — we fill in your spreadsheets and templates rather than replacing them',
              'Plain English, no jargon, and straight answers about what can and can\'t be done',
            ]} />
          </Card>
        </div>

        <div className="mt-10">
          <a href="/#assessment" className="text-accent-400 hover:text-accent-300 font-semibold text-sm">
            Tell us the job that eats your evenings →
          </a>
        </div>
      </div>
    </Container>
  </div>
);
