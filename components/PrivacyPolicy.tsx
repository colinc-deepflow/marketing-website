import React from 'react';
import { Container } from './ui/Shared';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/10">{title}</h2>
    <div className="space-y-3 text-slate-400 leading-relaxed text-sm">{children}</div>
  </div>
);

export const PrivacyPolicy: React.FC = () => (
  <div className="pt-32 pb-24 min-h-screen">
    <Container>
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="h-px w-14 bg-gradient-to-r from-accent-500 to-blue-500 mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: 9 June 2026</p>
        </div>

        <Section title="1. Who We Are">
          <p>
            DeepflowAI is operated by <strong className="text-slate-300">Colin Campbell, trading as DeepFlowAI</strong>,
            based in Belfast, Northern Ireland, United Kingdom (referred to in this policy as
            "DeepflowAI", "we", "us", or "our").
          </p>
          <p>
            We are the Data Controller for the personal data we collect through this website. If you have any
            questions about this policy or how we handle your data, please contact us at{' '}
            <a href="mailto:privacy@deepflowai.co.uk" className="text-accent-400 hover:text-accent-300 underline">
              privacy@deepflowai.co.uk
            </a>.
            A postal address is available on written request.
          </p>
        </Section>

        <Section title="2. What Personal Data We Collect">
          <p>We collect the following categories of personal data through this website:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong className="text-slate-300">Identity data:</strong> your name</li>
            <li><strong className="text-slate-300">Contact data:</strong> email address, mobile number</li>
            <li><strong className="text-slate-300">Business data:</strong> business name, team size</li>
            <li>
              <strong className="text-slate-300">Preferences data:</strong> the administrative pain points you select
              in our assessment form
            </li>
            <li>
              <strong className="text-slate-300">Communication preferences:</strong> whether you opt in to receive an
              AI demo callback call
            </li>
            <li>
              <strong className="text-slate-300">Technical data:</strong> IP address, browser type, device information,
              and pages visited, collected automatically when you use our site
            </li>
            <li>
              <strong className="text-slate-300">Usage data:</strong> how you interact with our interactive demo and
              pricing calculator
            </li>
          </ul>
          <p>
            We do not knowingly collect data from anyone under the age of 18. Our services are intended for
            business owners and operators in the UK trades sector.
          </p>
        </Section>

        <Section title="3. How We Collect Your Data">
          <p>We collect data in the following ways:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-slate-300">Assessment form:</strong> when you complete and submit our Free
              Assessment form on this website
            </li>
            <li>
              <strong className="text-slate-300">Interactive demo:</strong> queries entered into our AI workflow demo
              are processed to generate example automation outputs
            </li>
            <li>
              <strong className="text-slate-300">Cookies and tracking technologies:</strong> see Section 9 below
            </li>
          </ul>
        </Section>

        <Section title="4. Why We Use Your Data & Our Legal Basis">
          <p>
            Under UK GDPR, we must have a lawful basis for processing your personal data. The table below explains
            how and why we use your data:
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-slate-300 font-semibold">Purpose</th>
                  <th className="text-left py-3 pr-4 text-slate-300 font-semibold">Data Used</th>
                  <th className="text-left py-3 text-slate-300 font-semibold">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 pr-4">Delivering your free assessment and responding to your enquiry</td>
                  <td className="py-3 pr-4">Name, email, phone, business info, pain points</td>
                  <td className="py-3">Pre-contractual steps at your request (Art. 6(1)(b))</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Following up on your assessment by email or phone</td>
                  <td className="py-3 pr-4">Name, email, phone</td>
                  <td className="py-3">Legitimate interests — B2B follow-up on a service you requested (Art. 6(1)(f))</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Delivering an AI demo callback call (if opted in)</td>
                  <td className="py-3 pr-4">Mobile number, consent record</td>
                  <td className="py-3">Your explicit consent (Art. 6(1)(a) + PECR)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Improving our website and services</td>
                  <td className="py-3 pr-4">Technical and usage data</td>
                  <td className="py-3">Legitimate interests (Art. 6(1)(f))</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Complying with legal obligations</td>
                  <td className="py-3 pr-4">Any data required by law</td>
                  <td className="py-3">Legal obligation (Art. 6(1)(c))</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            <strong className="text-slate-300">A note on automated calls (PECR):</strong> When you tick the box to
            receive an AI callback call, you are giving your explicit consent under the Privacy and Electronic
            Communications Regulations 2003. You can withdraw this consent at any time by contacting us before the
            call is made.
          </p>
          <p>
            <strong className="text-slate-300">Legitimate interests assessment:</strong> Where we rely on legitimate
            interests, we have balanced our interests against yours and concluded that, in the context of a B2B
            enquiry you initiated, our follow-up does not override your rights. You may object to this processing
            at any time (see Section 7).
          </p>
        </Section>

        <Section title="5. Who We Share Your Data With">
          <p>We do not sell your personal data. We may share it with the following parties:</p>
          <ul className="list-disc list-inside space-y-3 pl-2">
            <li>
              <strong className="text-slate-300">Google LLC (Gemini API):</strong> When you use our interactive demo,
              your query text is sent to Google's Gemini AI API, operated by Google LLC in the United States.
              This is an international transfer outside the UK. Google processes this data under Standard
              Contractual Clauses (SCCs) approved by the UK ICO. See Google's privacy policy at{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-accent-400 hover:text-accent-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies.google.com/privacy
              </a>.
            </li>
            <li>
              <strong className="text-slate-300">Our backend infrastructure:</strong> Assessment form submissions are
              sent to our secure backend server for processing and storage. This server is hosted by{' '}
              Amazon Web Services (AWS), with data stored in AWS European regions (EU-West).
            </li>
            <li>
              <strong className="text-slate-300">Professional advisers:</strong> Lawyers, accountants, and insurers
              where necessary, bound by confidentiality.
            </li>
            <li>
              <strong className="text-slate-300">Regulatory authorities:</strong> The ICO or other authorities where
              required by law.
            </li>
          </ul>
        </Section>

        <Section title="6. How Long We Keep Your Data">
          <p>
            We retain your personal data only for as long as necessary for the purposes set out in this policy:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-slate-300">Assessment enquiries:</strong> up to 24 months from the date of
              submission, unless you become a client (in which case our client data retention policy applies).
            </li>
            <li>
              <strong className="text-slate-300">AI call consent records:</strong> retained for the duration of any
              active consent plus 12 months for compliance purposes.
            </li>
            <li>
              <strong className="text-slate-300">Technical/usage data:</strong> up to 12 months.
            </li>
          </ul>
          <p>
            After these periods your data is securely deleted or anonymised. You can request earlier deletion at
            any time (see Section 7).
          </p>
        </Section>

        <Section title="7. Your Rights Under UK GDPR">
          <p>You have the following rights regarding your personal data:</p>
          <ul className="space-y-3 pl-2">
            <li><strong className="text-slate-300">Right of access</strong> — request a copy of the personal data we hold about you.</li>
            <li><strong className="text-slate-300">Right to rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
            <li><strong className="text-slate-300">Right to erasure</strong> — ask us to delete your data (the "right to be forgotten") where there is no compelling reason for us to keep it.</li>
            <li><strong className="text-slate-300">Right to restrict processing</strong> — ask us to pause processing of your data in certain circumstances.</li>
            <li><strong className="text-slate-300">Right to data portability</strong> — receive your data in a structured, machine-readable format.</li>
            <li><strong className="text-slate-300">Right to object</strong> — object to processing based on legitimate interests, including for direct marketing. We will stop unless we have compelling legitimate grounds.</li>
            <li><strong className="text-slate-300">Rights related to automated decision-making</strong> — we do not make solely automated decisions that have a legal or similarly significant effect on you.</li>
            <li><strong className="text-slate-300">Right to withdraw consent</strong> — where we rely on consent (e.g. AI call opt-in), you may withdraw it at any time without affecting the lawfulness of prior processing.</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a href="mailto:privacy@deepflowai.co.uk" className="text-accent-400 hover:text-accent-300 underline">
              privacy@deepflowai.co.uk
            </a>. We will respond within one month. There is no charge for most requests.
          </p>
          <p>
            If you are unhappy with how we have handled your data, you have the right to lodge a complaint with the
            ICO at{' '}
            <a
              href="https://ico.org.uk/make-a-complaint"
              className="text-accent-400 hover:text-accent-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk/make-a-complaint
            </a>{' '}
            or by calling 0303 123 1113.
          </p>
        </Section>

        <Section title="8. Data Security">
          <p>
            We take the security of your personal data seriously and have implemented appropriate technical and
            organisational measures to protect it against unauthorised access, loss, or disclosure. These include
            encrypted data transmission (HTTPS), access controls on our systems, and regular security reviews.
          </p>
          <p>
            While we take all reasonable steps to protect your data, no internet transmission is completely
            secure. If you have reason to believe your data has been compromised, please contact us immediately.
          </p>
        </Section>

        <Section title="9. Cookies">
          <p>
            This website may use cookies and similar tracking technologies. Cookies are small text files placed on
            your device that help us understand how you use the site.
          </p>
          <p>We currently use the following types of cookies:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-slate-300">Strictly necessary cookies:</strong> required for the website to
              function correctly. These cannot be disabled.
            </li>
            <li>
              <strong className="text-slate-300">Analytics cookies:</strong> if we add analytics tools (e.g. Google
              Analytics), these will be set only with your prior consent, in line with PECR.
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling certain cookies may affect site
            functionality.
          </p>
        </Section>

        <Section title="10. Third-Party Links">
          <p>
            This website may contain links to third-party websites. We are not responsible for their privacy
            practices and encourage you to read their privacy policies before providing any personal data.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page
            will reflect any changes. We encourage you to review this policy periodically. For significant changes,
            we will take reasonable steps to notify you.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            For any questions, requests, or concerns about this Privacy Policy or our data practices:
          </p>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 mt-4 space-y-1">
            <p className="text-slate-300 font-semibold">DeepFlowAI</p>
            <p>Colin Campbell, trading as DeepFlowAI</p>
            <p>Belfast, Northern Ireland, United Kingdom</p>
            <p>
              Email:{' '}
              <a href="mailto:privacy@deepflowai.co.uk" className="text-accent-400 hover:text-accent-300 underline">
                privacy@deepflowai.co.uk
              </a>
            </p>
          </div>
        </Section>
      </div>
    </Container>
  </div>
);
