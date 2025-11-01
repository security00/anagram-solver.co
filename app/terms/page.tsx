import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Terms of Service - Anagram Solver',
  description: 'Review our terms of service covering acceptable use, content, liability, and changes. Using our site means you agree to these terms.',
  alternates: { canonical: 'https://anagram-solver.co/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
          <div className="prose prose-lg mt-6 dark:prose-invert">
            <p>By accessing or using this website, you agree to these terms.</p>
            <h2>Use of the Service</h2>
            <p>The tools provided are for personal and educational use. Do not misuse or attempt to disrupt the service.</p>
            <h2>Content</h2>
            <p>The site content is provided "as is" without warranties. We may update or remove content at any time.</p>
            <h2>Limitation of Liability</h2>
            <p>We are not liable for any indirect or consequential damages arising from use of the site.</p>
            <h2>Changes</h2>
            <p>We may update these terms from time to time. Continued use constitutes acceptance of changes.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
