import type { Metadata } from 'next';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';

// Static generation
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Privacy Policy - Anagram Solver',
  description: 'How the browser-based solver, Cloudflare hosting, optional analytics, and privacy choices handle data.',
  alternates: { canonical: 'https://anagram-solver.co/privacy' },
};

export default function PrivacyPage() {
  return (
    <InnerPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="How local solving, Cloudflare hosting, and optional analytics handle information."
    >
      <InnerContent>
          <div className="editorial-copy">
            <p>
              The site does not require an account. Word searches run in a Web Worker in your
              browser and the application has no search API that receives the letters you enter.
              Your browser downloads the page, worker code, and selected dictionary from the host.
            </p>
            <h2>Hosting Data</h2>
            <ul>
              <li>Cloudflare may process request information such as IP address, user agent, requested path, and time to deliver and protect the site.</li>
              <li>The operator may use aggregated hosting metrics and security logs for reliability and abuse prevention.</li>
            </ul>
            <h2>Optional Analytics</h2>
            <p>
              Google Analytics is not downloaded until you select “Allow analytics.” If enabled,
              Google may process device, browser, approximate location, page, and interaction data
              under its own terms. The previous Microsoft Clarity session-recording integration has
              been removed. Declining analytics does not change any solver feature.
            </p>
            <h2>Your Choice</h2>
            <p>
              Your analytics choice is saved locally in your browser under
              <code> anagram-analytics-consent</code>. Use the “Privacy choices” button at the
              bottom of any page to change it. If analytics was already loaded, declining reloads
              the page to stop further analytics requests. A browser Do Not Track or Global Privacy
              Control signal defaults the choice to declined.
            </p>
            <h2>Third Parties and Retention</h2>
            <p>
              Cloudflare and, only with consent, Google apply their own retention and privacy
              policies. Avoid entering personal or confidential information into any public web
              page even though this solver performs its search locally.
            </p>
            <h2>Contact</h2>
            <p>If you have questions about this policy, contact us on the Contact page.</p>
            <p className="text-sm text-[#687b91]">Last updated: August 30, 2026</p>
          </div>
      </InnerContent>
    </InnerPageShell>
  );
}
