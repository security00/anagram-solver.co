import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Contact - Anagram Solver',
  description: 'Contact the Anagram Solver team with questions, feedback, or partnership ideas. We usually reply within a few business days via email.',
  alternates: { canonical: 'https://anagram-solver.co/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
          <div className="prose prose-lg mt-6 dark:prose-invert">
            <p>Have a question or suggestion? We'd love to hear from you.</p>
            <ul>
              <li>Email: support@anagram-solver.co</li>
            </ul>
            <p>We typically respond within a few business days.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
