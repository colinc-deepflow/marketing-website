import React from 'react';
import { Container } from './ui/Shared';

const Card: React.FC<{ title?: string; children: React.ReactNode; italic?: boolean }> = ({ title, children, italic }) => (
  <div className={`bg-slate-900/60 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 ${italic ? 'border-accent-500/20 bg-accent-500/5' : ''}`}>
    {title && <h3 className="text-lg font-bold text-white mb-4">{title}</h3>}
    <div className={`leading-relaxed text-sm space-y-3 ${italic ? 'text-slate-300 italic' : 'text-slate-400'}`}>
      {children}
    </div>
  </div>
);

export const AboutPage: React.FC = () => (
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
            About DeepflowAI
          </h1>
          <p className="text-xl text-slate-300 font-light mb-5 leading-relaxed">
            DeepflowAI is an AI technology company based in Northern Ireland, focused on building
            multi-agent AI systems that support microbusinesses and strengthen teams in larger organisations.
          </p>
          <p className="text-slate-300 font-semibold leading-relaxed">
            We create practical AI solutions that help businesses reduce administrative burden,
            improve productivity, and unlock room for growth.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-5">

          <Card title="Our mission">
            <p>
              Our mission is to democratise access to business support by delivering affordable,
              trustworthy AI solutions that augment human capability. We want businesses of every
              size to benefit from better tools, better support, and more time to focus on the work
              that matters most.
            </p>
          </Card>

          <Card title="Our vision">
            <p>
              We believe every small business should be able to access the kind of support that was
              once available only to much larger organisations. Our vision is to become a leading
              provider of AI agent teams that help small businesses thrive and help employees focus
              on meaningful, high-value work.
            </p>
          </Card>

          <Card title="What we stand for">
            <ul className="space-y-2.5">
              {[
                { value: 'Empowerment, not replacement', desc: 'our systems are designed to support people, not displace them.' },
                { value: 'Accessibility', desc: 'simple, affordable solutions for businesses that need practical support.' },
                { value: 'Transparency and trust', desc: 'human oversight remains central to responsible AI use.' },
                { value: 'Growth', desc: 'helping businesses create capacity, confidence, and opportunity.' },
                { value: 'Innovation with integrity', desc: 'building technology that improves business without losing sight of people.' },
              ].map(({ value, desc }) => (
                <li key={value} className="flex gap-2">
                  <span className="text-white font-bold shrink-0">{value}</span>
                  <span>— {desc}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card italic>
            <p>
              DeepflowAI sits at the intersection of practical business support and responsible AI.
              We are not just building tools. We are building systems that help people do better work,
              make better decisions, and grow with confidence.
            </p>
          </Card>

        </div>
      </div>
    </Container>
  </div>
);
