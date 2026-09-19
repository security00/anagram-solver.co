import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Privacy Policy - Anagram Solver',
  description:
    'Read our privacy policy to understand how our browser-based word solver works. All anagram calculations run on your device with zero search queries transmitted.',
  alternates: { canonical: getCanonicalUrl('/privacy') },
  openGraph: {
    title: 'Privacy Policy - Anagram Solver',
    description:
      'Read our privacy policy to understand how our browser-based word solver works. All anagram calculations run on your device with zero search queries transmitted.',
    url: getCanonicalUrl('/privacy'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Anagram Solver',
    description:
      'Read our privacy policy to understand how our browser-based word solver works. All anagram calculations run on your device with zero search queries transmitted.',
  },
};

export default function PrivacyPage() {
  const canonicalUrl = getCanonicalUrl('/privacy');
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
        name: 'Privacy Policy',
        item: canonicalUrl,
      },
    ],
  };

  return (
    <InnerPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="How our client-side word tools, Cloudflare edge hosting, Google Ads, and analytics handle your data."
    >
      <InnerContent>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="editorial-copy">
          <p>
            Welcome to Anagram Solver (<code>https://anagram-solver.co</code>). We believe your privacy
            should never be compromised for puzzle solving. This Privacy Policy clearly outlines our
            data practices, explains how our in-browser computation architecture protects your input,
            and details the third-party services utilized to operate, protect, and monetize our free platform.
          </p>

          <h2>1. Fundamental Architecture: 100% Client-Side Processing</h2>
          <p>
            The hallmark of Anagram Solver is our local-execution design. When you enter letters,
            phrases, or puzzle clues into any of our tools (including Single-Word Solver, Multi-Word
            Solver, Rack Word Finder, or Word Finder):
          </p>
          <ul>
            <li>
              <strong>No Remote Computation:</strong> Your inputs are processed exclusively inside a
              background Web Worker running within your device&apos;s local browser session.
            </li>
            <li>
              <strong>Zero Query Transmission:</strong> We do not operate any server-side search API that
              receives, inspects, logs, or stores your puzzle letters, queries, or generated results.
            </li>
            <li>
              <strong>Ephemeral Memory:</strong> All letter calculations exist solely in your local browser
              memory and are instantly discarded when you close or refresh the browser tab.
            </li>
          </ul>

          <h2>2. Information We Do Not Collect</h2>
          <p>
            Because our service is entirely free and accessible without hurdles, we strictly avoid collecting
            personally identifiable information (PII):
          </p>
          <ul>
            <li>No user registration, passwords, social logins, or accounts are required or supported.</li>
            <li>We do not collect names, email addresses, phone numbers, or physical street addresses.</li>
            <li>We do not process credit cards, billing details, or financial payment information.</li>
          </ul>

          <h2>3. Hosting, Infrastructure, and Edge Security</h2>
          <p>
            Our website files (HTML, JavaScript, stylesheets, and open-source word lists) are distributed
            globally through Cloudflare Pages and Cloudflare Workers static infrastructure. When your browser
            requests our assets, Cloudflare may temporarily process standard web transmission metadata, including:
          </p>
          <ul>
            <li>Your public IP address and geographical region.</li>
            <li>Browser type, operating system version, and User-Agent headers.</li>
            <li>Referrer URLs, requested static file paths, and HTTP response codes.</li>
          </ul>
          <p>
            This operational data is processed strictly for content delivery network (CDN) caching, DDoS
            mitigation, threat filtering, and site availability. For additional details, please consult the{' '}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#008f9e] underline hover:text-[#061a38]"
            >
              Cloudflare Privacy Policy
            </a>.
          </p>

          <h2>4. Cookies, Local Storage, and Privacy Preferences</h2>
          <p>
            Anagram Solver does not set proprietary tracking cookies. We utilize browser{' '}
            <code>localStorage</code> solely for recording functional preferences:
          </p>
          <ul>
            <li>
              <code>anagram-analytics-consent</code>: Remembers whether you have selected <em>Allow</em> or{' '}
              <em>Decline</em> for optional performance analytics.
            </li>
          </ul>
          <p>
            We honor automated privacy signals: if your browser transmits a <strong>Global Privacy Control (GPC)</strong>{' '}
            or <strong>Do Not Track (DNT)</strong> header, analytics tracking defaults to permanently declined.
            You can modify or reset your consent at any time via your browser settings or by clearing your site cookies and local storage.
          </p>

          <h2>5. Third-Party Services: Analytics and Advertising</h2>
          <p>To sustain our free website and understand general usage trends, we partner with verified third parties:</p>

          <h3>Google Analytics 4 (GA4)</h3>
          <p>
            We use Google Analytics 4 to gather aggregated, anonymized traffic insights, such as page
            popularity, device categories, and general session duration. IP anonymization is enabled by
            default. If you decline analytics or enable GPC, an automated opt-out disable flag is engaged
            locally in your browser, suppressing measurement and event collection.
          </p>

          <h3>Google AdSense and Advertising Cookies</h3>
          <p>
            We display advertisements via Google AdSense to keep this service freely accessible to all users.
            Google, as a third-party vendor, uses cookies to serve ads on our site:
          </p>
          <ul>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit
              to this website and/or other websites on the Internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{' '}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#008f9e] underline hover:text-[#061a38]"
              >
                Google Ads Settings
              </a>.
            </li>
            <li>
              Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized
              advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#008f9e] underline hover:text-[#061a38]"
              >
                www.aboutads.info
              </a>.
            </li>
          </ul>

          <h2>6. International Privacy Rights (GDPR &amp; CCPA/CPRA)</h2>
          <p>
            Depending on your jurisdiction (such as the European Economic Area, United Kingdom, or California),
            you possess specific privacy rights:
          </p>
          <ul>
            <li>
              <strong>Right to Access &amp; Portability:</strong> You may inquire what data is held about you.
              Since we store no account or personal profiles, we hold no linked records.
            </li>
            <li>
              <strong>Right to Rectification &amp; Erasure:</strong> Because all solver calculations are client-side,
              clearing your browser cache and local storage immediately purges all site data stored on your device.
            </li>
            <li>
              <strong>Do Not Sell or Share My Personal Information:</strong> We do not sell your personal data for
              monetary consideration. Advertising cookie controls are provided through the links referenced above.
            </li>
          </ul>

          <h2>7. Children&apos;s Privacy (COPPA)</h2>
          <p>
            Our word and anagram tools are designed for general audiences and educational puzzle solving. We do not
            knowingly collect or solicit any personal information from children under the age of 13 (or under 16 in
            applicable jurisdictions). If you believe a child has provided us with personal information, please
            reach out so we can promptly address the situation.
          </p>

          <h2>8. Updates to This Privacy Policy</h2>
          <p>
            We may occasionally update this Privacy Policy to reflect enhancements in our tool architecture or changes
            in applicable legal standards. Any revisions will be published on this page with an updated revision date.
          </p>

          <h2>9. How to Contact Us</h2>
          <p>
            If you have questions, feedback, or concerns regarding this Privacy Policy, please visit our{' '}
            <Link href="/contact" className="font-semibold text-[#008f9e] underline hover:text-[#061a38]">
              Contact Page
            </Link>.
          </p>

          <p className="mt-8 text-sm text-[#687b91]">
            Last updated: September 19, 2026
          </p>
        </div>
      </InnerContent>
    </InnerPageShell>
  );
}
