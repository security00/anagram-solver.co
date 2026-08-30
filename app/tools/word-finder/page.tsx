import type { Metadata } from 'next';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import WordFinderTool from '@/components/WordFinderTool';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Word Finder from Letters and Patterns',
  description: 'Find words that can be built from available letters or match a fixed-length pattern using ? wildcards.',
  alternates: { canonical: 'https://anagram-solver.co/tools/word-finder' },
};

export default function WordFinderPage() {
  return (
    <InnerPageShell
      eyebrow="Word tools"
      title="Word Finder"
      description="Build words from available letters or search an exact-length pattern with unknown positions."
      heroContent={<WordFinderTool />}
    >
      <InnerContent wide>
          <div className="editorial-columns">
            <div className="editorial-card">
              <h2>Available-letter search</h2>
              <p>
                This mode returns words that use no more of each letter than you supplied. Unlike
                the exact anagram solver, a result may use only part of the rack. Set minimum and
                maximum lengths to narrow the list.
              </p>
            </div>
            <div className="editorial-card">
              <h2>Fixed patterns</h2>
              <p>
                A question mark represents exactly one unknown letter. For example,
                <code> C?T</code> can match CAT, COT, or CUT, while <code>?ING</code> finds
                four-letter words ending in ING. Pattern input is matched character by character,
                so regular-expression syntax is not executed.
              </p>
            </div>
          </div>
      </InnerContent>
    </InnerPageShell>
  );
}
