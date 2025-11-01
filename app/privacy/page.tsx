import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Static generation
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Privacy Policy - Anagram Solver',
  description: 'Read our privacy policy to understand what we collect, how we use it, and how we protect your data. We keep analytics minimal and respect your privacy.',
  alternates: { canonical: 'https://anagram-solver.co/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          <div className="prose prose-lg mt-6 dark:prose-invert">
            <p>We take your privacy seriously. This website does not require account registration and processes inputs in your browser where possible.</p>
            <h2>Information We Collect</h2>
            <ul>
              <li>Basic server logs for reliability and security (IP, user-agent, timestamps).</li>
              <li>Anonymous usage analytics to improve the product (no personal information).</li>
            </ul>
            <h2>Cookies</h2>
            <p>We may use strictly necessary cookies for basic functionality. Optional analytics cookies can be disabled via your browser settings.</p>
            <h2>Data Retention</h2>
            <p>Server logs are retained for a limited time for security and troubleshooting, then deleted. We do not sell or share your data.</p>
            <h2>Contact</h2>
            <p>If you have questions about this policy, contact us on the Contact page.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().getFullYear()}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
