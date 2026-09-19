import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Contact Anagram Solver Support & Editorial Team',
  description:
    'Get in touch with the Anagram Solver team. Submit dictionary updates, feature requests, bug reports, or general inquiries. We reply within 1-2 business days.',
  alternates: { canonical: getCanonicalUrl('/contact') },
  openGraph: {
    title: 'Contact Anagram Solver Support & Editorial Team',
    description:
      'Get in touch with the Anagram Solver team. Submit dictionary updates, feature requests, bug reports, or general inquiries. We reply within 1-2 business days.',
    url: getCanonicalUrl('/contact'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Anagram Solver Support & Editorial Team',
    description:
      'Get in touch with the Anagram Solver team. Submit dictionary updates, feature requests, bug reports, or general inquiries. We reply within 1-2 business days.',
  },
};

export default function ContactPage() {
  const canonicalUrl = getCanonicalUrl('/contact');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getCanonicalUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: canonicalUrl,
      },
    ],
  };

  return (
    <InnerPageShell
      eyebrow="Contact &amp; Support"
      title="Contact Our Team"
      description="Have a question, feedback, or a word dictionary suggestion? We are here to help."
    >
      <InnerContent>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="editorial-copy">
          <p>
            Thank you for using Anagram Solver. We actively maintain and refine our word tools to ensure
            maximum speed, accuracy, and ease of use. Whether you spotted a missing word in our dictionary,
            have an idea for a new puzzle utility, or encountered a display issue, we welcome your feedback.
          </p>

          <div className="mt-8 rounded border border-[#8ed7e0] bg-[#f4fbfc] p-6 sm:p-8">
            <h2 className="!mt-0 text-xl font-extrabold text-[#061a38]">Primary Email Contact</h2>
            <p className="mt-2 text-base text-[#52657d]">
              For all support tickets, feedback, and editorial inquiries, please email:
            </p>
            <div className="mt-4 inline-flex items-center rounded border border-[#00aebf] bg-white px-4 py-2 text-lg font-mono font-bold text-[#008f9e]">
              support@anagram-solver.co
            </div>
            <p className="mt-3 text-xs text-[#687b91]">
              Average response time: Within 24 to 48 hours on business days (Monday &ndash; Friday).
            </p>
          </div>

          <h2>How We Can Help: Inquiry Categories</h2>
          <p>
            To help us route your request to the right team member, please mention one of the following topics
            in your email subject line:
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded border border-[#d9e5ec] bg-white p-5">
              <h3 className="text-base font-bold text-[#061a38]">1. Dictionary &amp; Lexicon Suggestions</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                Notice a valid English word missing from our Common or Extended dictionaries? Or a slang term
                that should be omitted? Send us the word and its authoritative source reference.
              </p>
            </div>

            <div className="rounded border border-[#d9e5ec] bg-white p-5">
              <h3 className="text-base font-bold text-[#061a38]">2. Feature Requests &amp; Ideas</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                Have a great idea for a new anagram filter, crossword solver helper, or board game scoring option?
                We continuously prioritize user-requested features for upcoming releases.
              </p>
            </div>

            <div className="rounded border border-[#d9e5ec] bg-white p-5">
              <h3 className="text-base font-bold text-[#061a38]">3. Bug Reports &amp; Technical Issues</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                Encountered unexpected behavior, styling glitches on mobile, or slow performance on a specific
                browser? Please include your device type, browser name, and the letters you tested.
              </p>
            </div>

            <div className="rounded border border-[#d9e5ec] bg-white p-5">
              <h3 className="text-base font-bold text-[#061a38]">4. Partnerships &amp; Advertising</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                Interested in advertising partnerships, educational collaborations, or API licensing queries?
                Please reach out with details about your organization and proposal.
              </p>
            </div>
          </div>

          <h2>Tips for Faster Support Resolution</h2>
          <p>
            When emailing our technical team regarding an anagram result or tool behavior, including the following
            details helps us troubleshoot and update dictionary files swiftly:
          </p>
          <ul>
            <li><strong>Input letters:</strong> The exact sequence of letters or wildcard symbols you entered.</li>
            <li><strong>Dictionary mode:</strong> Whether the search was conducted in &ldquo;Common Words&rdquo; or &ldquo;Extended Dictionary&rdquo;.</li>
            <li><strong>Tool used:</strong> Homepage Anagram Solver, Multi-Word Solver, or Rack Word Finder.</li>
            <li><strong>Browser &amp; OS:</strong> For example, Chrome 128 on macOS, Safari on iOS, or Edge on Windows 11.</li>
          </ul>

          <h2>Frequently Asked Quick Answers</h2>
          <p>Before emailing, you might find an instant answer in our guides:</p>
          <ul>
            <li>
              Looking for common troubleshooting steps? Check our comprehensive{' '}
              <Link href="/faq" className="font-semibold text-[#008f9e] underline hover:text-[#061a38]">
                Frequently Asked Questions (FAQ)
              </Link>.
            </li>
            <li>
              Curious about how your data is handled? Review our detailed{' '}
              <Link href="/privacy" className="font-semibold text-[#008f9e] underline hover:text-[#061a38]">
                Privacy Policy
              </Link>.
            </li>
            <li>
              Want to learn advanced board game tactics? Read our{' '}
              <Link href="/blog/scrabble-strategy" className="font-semibold text-[#008f9e] underline hover:text-[#061a38]">
                Scrabble Strategy Guide
              </Link>.
            </li>
          </ul>
        </div>
      </InnerContent>
    </InnerPageShell>
  );
}
