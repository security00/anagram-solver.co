import type { Metadata } from 'next';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Contact - Anagram Solver',
  description: 'Contact the Anagram Solver team with questions, feedback, or partnership ideas. We usually reply within a few business days via email.',
  alternates: { canonical: 'https://anagram-solver.co/contact' },
};

export default function ContactPage() {
  return (
    <InnerPageShell
      eyebrow="Contact"
      title="Contact Us"
      description="Questions, feedback, and suggestions are welcome."
    >
      <InnerContent>
          <div className="editorial-copy">
            <p>Have a question or suggestion? We'd love to hear from you.</p>
            <ul>
              <li>Email: support@anagram-solver.co</li>
            </ul>
            <p>We typically respond within a few business days.</p>
          </div>
      </InnerContent>
    </InnerPageShell>
  );
}
