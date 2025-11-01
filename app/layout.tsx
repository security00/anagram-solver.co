import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Free Anagram Solver - Generate Word Anagrams Online',
  description: 'Use our fast anagram solver to instantly find valid words from any letters. Perfect for Scrabble, crosswords, and word games with accurate scoring.',
  keywords: ['anagram', 'anagram solver', 'word anagram', 'free anagram tool', 'anagram generator'],
  metadataBase: new URL('https://anagram-solver.co'),
  openGraph: {
    title: 'Free Anagram Solver - Generate Word Anagrams Online',
    description: 'Solve anagrams instantly with our free online tool. Find all possible words from your letters, perfect for Scrabble and word games.',
    url: 'https://anagram-solver.co',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Anagram Solver - Generate Word Anagrams Online',
    description: 'Solve anagrams instantly with our free online tool. Find all possible words from your letters, perfect for Scrabble and word games.',
  },
  alternates: {
    canonical: 'https://anagram-solver.co',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5G76PLCMD6"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5G76PLCMD6');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tz8djbf3v8");
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
