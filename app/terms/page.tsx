import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Terms of Service - Anagram Solver',
  description:
    'Review our terms of service covering acceptable use, intellectual property, disclaimers, and changes. Using our free online word solver constitutes agreement.',
  alternates: { canonical: getCanonicalUrl('/terms') },
  openGraph: {
    title: 'Terms of Service - Anagram Solver',
    description:
      'Review our terms of service covering acceptable use, intellectual property, disclaimers, and changes. Using our free online word solver constitutes agreement.',
    url: getCanonicalUrl('/terms'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Anagram Solver',
    description:
      'Review our terms of service covering acceptable use, intellectual property, disclaimers, and changes. Using our free online word solver constitutes agreement.',
  },
};

export default function TermsPage() {
  const canonicalUrl = getCanonicalUrl('/terms');
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
        name: 'Terms of Service',
        item: canonicalUrl,
      },
    ],
  };

  return (
    <InnerPageShell
      eyebrow="Legal"
      title="Terms of Service"
      description="The standard terms and conditions governing your access to and use of our browser-based word tools."
    >
      <InnerContent>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="editorial-copy">
          <p>
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the Anagram Solver
            website (<code>https://anagram-solver.co</code>, the &ldquo;Service&rdquo;). By accessing, browsing,
            or utilizing any feature on this site, you acknowledge that you have read, understood, and agree to
            be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms,
            please do not use the Service.
          </p>

          <h2>1. Description of the Service</h2>
          <p>
            Anagram Solver provides web-based utilities engineered to help users discover anagrams, unscramble
            letter combinations, solve multi-word phrases, and calculate letter tile scores for word puzzle games.
            All solving operations execute on the user&apos;s device using client-side Web Workers and pre-bundled
            open English dictionaries. The Service is provided free of charge for personal, recreational, and
            educational purposes.
          </p>

          <h2>2. Dictionary Data &amp; Lexicon Limitations</h2>
          <p>
            Our solvers reference open-source English vocabulary databases compiled from public-domain sources
            (such as SCOWL - Spell Checking Oriented Word Lists):
          </p>
          <ul>
            <li>
              <strong>No Tournament Authority:</strong> Anagram Solver is an independent resource and is not
              affiliated with, sponsored by, or endorsed by Hasbro, Mattel, Zynga, the New York Times, NASPA,
              WESPA, or Scrabble. Our tools are not official arbiters of tournament gameplay.
            </li>
            <li>
              <strong>Linguistic Scope:</strong> English is constantly evolving. While our dictionaries are
              regularly reviewed, they may include archaic terms, colloquialisms, variant spellings, or omissions.
              We make no warranty that all generated words are acceptable in every competitive board game or app.
            </li>
            <li>
              <strong>Tile Scoring:</strong> Displayed scores reflect standard base tile values and rack sums.
              They do not calculate board premium squares (such as Double Letter or Triple Word scores) or game-specific
              bonus rules.
            </li>
          </ul>

          <h2>3. Acceptable Use Policy</h2>
          <p>You agree to use our Service only for lawful purposes. You shall not:</p>
          <ul>
            <li>
              Attempt to interfere with, disrupt, or compromise the integrity, bandwidth, or security of our
              hosting infrastructure or Cloudflare distribution network.
            </li>
            <li>
              Deploy automated scrapers, bots, or excessive automated requests designed to overwhelm our edge
              servers or degrade performance for other visitors.
            </li>
            <li>
              Circumvent, disable, or interfere with security-related features, ad units, or technical controls
              of the website.
            </li>
            <li>
              Use the Service in any manner that violates applicable local, national, or international laws or
              regulations.
            </li>
          </ul>

          <h2>4. Intellectual Property Rights</h2>
          <p>
            All original website design elements, source code, stylesheets, typography, logos, and editorial
            content are the intellectual property of Anagram Solver and are protected by applicable copyright,
            trademark, and intellectual property laws.
          </p>
          <ul>
            <li>
              <strong>Generated Results:</strong> You retain full ownership and freedom to use, publish, and
              incorporate any letter combinations, word lists, or solutions generated by the tools in your personal
              or commercial creative writing, puzzles, and game sessions.
            </li>
            <li>
              <strong>Open-Source Lexicons:</strong> Bundled dictionary word lists remain subject to their respective
              open-source and public-domain licenses.
            </li>
          </ul>

          <h2>5. Third-Party Services and Advertisements</h2>
          <p>
            The Service displays third-party advertisements served by Google AdSense and may include links to
            external websites or resources:
          </p>
          <ul>
            <li>
              We do not control, endorse, or assume responsibility for the content, privacy policies, products,
              or practices of third-party advertisers or external websites.
            </li>
            <li>
              Any dealings between you and advertisers found on or through the Service are solely between you
              and that advertiser.
            </li>
          </ul>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES
            OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, ANAGRAM
            SOLVER EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, error-free, timely, or completely secure,
            nor do we warrant that word results will meet your specific competitive or algorithmic requirements.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL ANAGRAM SOLVER, ITS OPERATORS, CONTRIBUTORS,
            OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
            INCLUDING LOSS OF DATA, GOODWILL, TIME, OR REPUTATION, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS
            TO, USE OF, OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>

          <h2>8. Modifications to Terms and Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect of the Service, or update these
            Terms at our sole discretion at any time. When updates are published, the revised date at the bottom
            of this page will be refreshed. Continued use of the Service following the posting of changes constitutes
            your binding acceptance of the revised Terms.
          </p>

          <h2>9. Severability</h2>
          <p>
            If any provision of these Terms is found to be unlawful, void, or for any reason unenforceable, that
            provision shall be deemed severable from these Terms and shall not affect the validity and enforceability
            of any remaining provisions.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions, comments, or concerns regarding these Terms of Service, please reach out via our{' '}
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
