import React from 'react';
import { Container } from './ui/Shared';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/10">{title}</h2>
    <div className="space-y-3 text-slate-400 leading-relaxed text-sm">{children}</div>
  </div>
);

export const TermsAndConditions: React.FC = () => (
  <div className="pt-32 pb-24 min-h-screen">
    <Container>
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="h-px w-14 bg-gradient-to-r from-accent-500 to-blue-500 mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Terms &amp; Conditions</h1>
          <p className="text-slate-500 text-sm">Last updated: 9 June 2026</p>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 mb-10 text-sm text-slate-400">
          Please read these Terms and Conditions carefully before using this website or requesting our services.
          By submitting an assessment form or engaging with DeepflowAI, you agree to be bound by these terms.
        </div>

        <Section title="1. About Us">
          <p>
            DeepflowAI is operated by <strong className="text-slate-300">Colin Campbell, trading as DeepFlowAI</strong>,
            based in Belfast, Northern Ireland, United Kingdom ("DeepflowAI", "we", "us", "our").
            A postal address is available on written request.
          </p>
          <p>
            You can contact us at{' '}
            <a href="mailto:hello@deepflowai.co.uk" className="text-accent-400 hover:text-accent-300 underline">
              hello@deepflowai.co.uk
            </a>.
          </p>
        </Section>

        <Section title="2. What We Offer">
          <p>
            DeepflowAI provides custom-built AI automation and workflow systems designed for UK trades
            businesses. Our services include:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>A free business assessment to identify automation opportunities</li>
            <li>Custom-built automation workflows (quote generation, invoicing, follow-ups, customer updates, review requests, job tracking)</li>
            <li>Deployment, configuration, and initial support of those workflows</li>
            <li>Ongoing maintenance where agreed in a separate service agreement</li>
          </ul>
          <p>
            The specific scope, price, and delivery terms for any paid engagement will be set out in a separate
            proposal or service agreement, which will take precedence over these general terms.
          </p>
        </Section>

        <Section title="3. The Free Assessment">
          <p>
            Our free assessment is a no-obligation consultation to understand your business needs. Submitting the
            form on this website:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Does not constitute a contract for services</li>
            <li>Does not guarantee that we will be able to deliver a solution suited to your needs</li>
            <li>May result in us contacting you by email or phone to discuss your requirements</li>
            <li>
              If you opted in, may result in an automated AI agent calling you within approximately 30 minutes to
              conduct a brief discovery call
            </li>
          </ul>
          <p>
            We reserve the right to decline to provide services to any business at our discretion, without
            providing a reason.
          </p>
        </Section>

        <Section title="4. Indicative Timelines & Estimates">
          <p>
            References on this website to timelines (such as "live in 72 hours") are indicative estimates for
            straightforward implementations under normal circumstances. They are not contractual guarantees.
            Actual delivery times depend on the complexity of your requirements, your availability to provide
            information, and access to the necessary tools and systems.
          </p>
          <p>
            Similarly, the savings figures produced by our pricing calculator are illustrative estimates based on
            general assumptions (e.g. 70% reduction in admin time). They do not constitute a guarantee of
            financial outcomes. Actual results will vary based on your specific business operations.
          </p>
        </Section>

        <Section title="5. Pricing & Payment">
          <p>
            The free assessment carries no charge. Any paid services will be quoted separately. Unless a written
            proposal or service agreement states otherwise:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>All prices are in GBP and exclusive of VAT (where applicable)</li>
            <li>Payment terms will be specified in the relevant proposal</li>
            <li>We reserve the right to suspend or withhold services if invoices are not paid by the agreed due date</li>
            <li>Late payments may incur interest under the Late Payment of Commercial Debts (Interest) Act 1998</li>
          </ul>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            <strong className="text-slate-300">Our materials:</strong> All content on this website — including text,
            graphics, logos, the DeepflowAI name, and the interactive demo — is owned by or licensed to DeepflowAI
            and is protected by UK and international copyright and intellectual property law. You may not reproduce,
            distribute, or create derivative works without our written consent.
          </p>
          <p>
            <strong className="text-slate-300">Custom workflows:</strong> Unless expressly agreed otherwise in writing,
            the automation workflows we build for you will be owned by you upon full payment of all agreed fees.
            Any underlying tools, templates, frameworks, or proprietary methodologies we use to build those workflows
            remain our intellectual property.
          </p>
          <p>
            <strong className="text-slate-300">Your data:</strong> You retain ownership of all business data, customer
            data, and content you provide to us. You grant us a limited licence to use that data solely to deliver
            the agreed services.
          </p>
        </Section>

        <Section title="7. Your Responsibilities">
          <p>By using this website and our services, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Provide accurate and complete information in the assessment form and any subsequent communications</li>
            <li>Ensure you have the authority to engage our services on behalf of your business</li>
            <li>Not use our website or services for any unlawful purpose or in any way that violates these terms</li>
            <li>
              Not use our automation systems to send unsolicited communications, spam, or content that violates
              applicable law (including PECR and the Spam Act)
            </li>
            <li>Cooperate reasonably with us during the delivery of services, including providing timely access to necessary systems and information</li>
          </ul>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            To the fullest extent permitted by applicable law:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              DeepflowAI shall not be liable for any indirect, incidental, special, or consequential losses,
              including loss of profit, loss of revenue, loss of data, or loss of business opportunity, even if
              we have been advised of the possibility of such losses.
            </li>
            <li>
              Our total aggregate liability to you in connection with these terms or the services shall not exceed
              the greater of (a) the total fees paid by you to us in the 12 months preceding the claim, or (b) £500.
            </li>
            <li>
              Nothing in these terms limits or excludes liability for death or personal injury caused by negligence,
              fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law.
            </li>
          </ul>
          <p>
            We do not warrant that this website will be continuously available or free from errors or viruses.
          </p>
        </Section>

        <Section title="9. Third-Party Services & AI Tools">
          <p>
            Our services may use third-party tools and AI platforms (including Google Gemini) to power certain
            features. We are not responsible for the availability, accuracy, or output of third-party services.
            AI-generated content — including workflow previews shown in our demo — is illustrative and may not
            reflect the exact solution we build for your business.
          </p>
          <p>
            By using the interactive demo on this website, you acknowledge that your inputs are processed by
            third-party AI providers as described in our Privacy Policy.
          </p>
        </Section>

        <Section title="10. Acceptable Use">
          <p>You must not use this website or our services to:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Violate any applicable law or regulation</li>
            <li>Transmit any material that is defamatory, offensive, or otherwise objectionable</li>
            <li>Introduce malware, viruses, or other harmful code</li>
            <li>Attempt to gain unauthorised access to any part of our systems</li>
            <li>Impersonate any person or entity</li>
          </ul>
          <p>
            We reserve the right to terminate access to our services immediately for any breach of this section,
            without notice or liability.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We may update these Terms and Conditions at any time. The "Last updated" date at the top of this page
            will be revised accordingly. Continued use of this website after changes are published constitutes
            acceptance of the revised terms. For active service agreements, we will notify you of material changes.
          </p>
        </Section>

        <Section title="12. Governing Law & Disputes">
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of Northern
            Ireland and the wider United Kingdom. Any disputes arising in connection with these terms shall be
            subject to the exclusive jurisdiction of the courts of Northern Ireland.
          </p>
          <p>
            If a dispute arises, we encourage you to contact us first to resolve it informally. We will always
            try to find a fair solution before either party pursues formal proceedings.
          </p>
        </Section>

        <Section title="13. Severability">
          <p>
            If any provision of these terms is found to be unenforceable or invalid by a court of competent
            jurisdiction, that provision will be limited or eliminated to the minimum extent necessary, and the
            remaining provisions will continue in full force and effect.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>For any questions about these Terms and Conditions:</p>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 mt-4 space-y-1">
            <p className="text-slate-300 font-semibold">DeepFlowAI</p>
            <p>Colin Campbell, trading as DeepFlowAI</p>
            <p>Belfast, Northern Ireland, United Kingdom</p>
            <p>
              Email:{' '}
              <a href="mailto:hello@deepflowai.co.uk" className="text-accent-400 hover:text-accent-300 underline">
                hello@deepflowai.co.uk
              </a>
            </p>
          </div>
        </Section>
      </div>
    </Container>
  </div>
);
