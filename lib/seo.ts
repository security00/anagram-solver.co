/**
 * SEO Configuration and Meta Tags
 * Manages SEO metadata for all pages
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
}

const BASE_URL = 'https://anagram-solver.co';
const SITE_NAME = 'Anagram Solver';

export const seoConfig = {
  home: {
    title: 'Free Anagram Solver - Generate Word Anagrams Online',
    description: 'Solve anagrams instantly with our free online tool. Find all possible words from your letters, perfect for Scrabble and word games.',
    keywords: ['anagram', 'anagram solver', 'word anagram', 'free anagram tool', 'anagram generator'],
    canonical: `${BASE_URL}/`,
  },
  scrabble: {
    title: 'Scrabble Solver - Find High-Scoring Words for Scrabble',
    description: 'Advanced Scrabble solver to find the highest-scoring words from your tiles. Optimize your Scrabble game with our powerful tool.',
    keywords: ['scrabble solver', 'scrabble word finder', 'scrabble helper', 'scrabble cheater'],
    canonical: `${BASE_URL}/tools/scrabble-solver`,
  },
  wordFinder: {
    title: 'Word Finder Tool - Create Words From Letters Online',
    description: 'Powerful word finder tool to create words from any letters. Perfect for puzzles, games, and word challenges.',
    keywords: ['word finder', 'word maker', 'create words', 'letter combination'],
    canonical: `${BASE_URL}/tools/word-finder`,
  },
  multipleWords: {
    title: 'Multiple Word Anagram Solver - Find Word Combinations',
    description: 'Find multi-word anagrams and word combinations. Discover all possible phrase anagrams from your letters.',
    keywords: ['multiple word anagram', 'phrase anagram', 'anagram combinations', 'multi word solver'],
    canonical: `${BASE_URL}/tools/multiple-words`,
  },
  about: {
    title: 'About Anagram Solver - Free Online Word Tool',
    description: 'Learn about our anagram solver tool, how it works, and why it\'s the best free online resource for word games.',
    keywords: ['about anagram solver', 'word game tools', 'online word utilities'],
    canonical: `${BASE_URL}/about`,
  },
  faq: {
    title: 'FAQ - Anagram Solver Frequently Asked Questions',
    description: 'Find answers to common questions about our anagram solver, Scrabble tips, and word game strategies.',
    keywords: ['faq', 'frequently asked questions', 'anagram tips', 'word game tips'],
    canonical: `${BASE_URL}/faq`,
  },
};

// Verify SEO requirements
export function verifySEOCompliance(content: string, keywordDensity: string[]): {
  isCompliant: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  const wordCount = content.trim().split(/\s+/).length;

  // Check word count (minimum 800)
  if (wordCount < 800) {
    issues.push(`Word count is ${wordCount}, should be at least 800`);
  }

  // Check keyword density (3-5%)
  for (const keyword of keywordDensity) {
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    const mainKeyword = keywordWords[0];
    const count = (content.toLowerCase().match(new RegExp(`\\b${mainKeyword}\\b`, 'g')) || [])
      .length;
    const density = (count / wordCount) * 100;

    if (density < 3 || density > 5) {
      issues.push(
        `Keyword "${keyword}" density is ${density.toFixed(2)}%, should be 3-5%`
      );
    }
  }

  return {
    isCompliant: issues.length === 0,
    issues,
  };
}

// Generate structured data for JSON-LD
export function generateJSONLD(type: 'WebPage' | 'FAQPage' | 'Article', data: any) {
  const baseLD = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'WebPage':
      return {
        ...baseLD,
        name: data.title,
        description: data.description,
        url: data.canonical,
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: BASE_URL,
        },
      };

    case 'FAQPage':
      return {
        ...baseLD,
        mainEntity: data.faqs.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };

    case 'Article':
      return {
        ...baseLD,
        headline: data.title,
        description: data.description,
        url: data.canonical,
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
        datePublished: data.datePublished || new Date().toISOString(),
      };

    default:
      return baseLD;
  }
}

// Title length validation (40-60 characters)
export function validateTitle(title: string): { valid: boolean; length: number; warning?: string } {
  const length = title.length;
  if (length < 40) {
    return { valid: false, length, warning: `Title too short (${length}/40-60)` };
  }
  if (length > 60) {
    return { valid: false, length, warning: `Title too long (${length}/40-60)` };
  }
  return { valid: true, length };
}

// Description length validation (140-160 characters)
export function validateDescription(desc: string): {
  valid: boolean;
  length: number;
  warning?: string;
} {
  const length = desc.length;
  if (length < 140) {
    return { valid: false, length, warning: `Description too short (${length}/140-160)` };
  }
  if (length > 160) {
    return { valid: false, length, warning: `Description too long (${length}/140-160)` };
  }
  return { valid: true, length };
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /_next/
Disallow: /api/

Sitemap: ${BASE_URL}/sitemap.xml

# Google-specific rules
User-agent: Googlebot
Allow: /

# Bing-specific rules
User-agent: Bingbot
Allow: /

# Block bad bots
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

# Crawl delay
Crawl-delay: 1
`;
}

// Generate sitemap.xml content
export function generateSitemapXml(pages: Array<{ path: string; priority?: number; changefreq?: string }>): string {
  const urlEntries = pages
    .map(
      page => `
  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <changefreq>${page.changefreq || 'weekly'}</changefreq>
    <priority>${page.priority || 0.8}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// All pages for sitemap
export const sitemapPages = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/tools/scrabble-solver', priority: 0.9, changefreq: 'weekly' },
  { path: '/tools/word-finder', priority: 0.9, changefreq: 'weekly' },
  { path: '/tools/multiple-words', priority: 0.8, changefreq: 'weekly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/faq', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog/anagram-tips', priority: 0.6, changefreq: 'monthly' },
  { path: '/blog/scrabble-strategy', priority: 0.6, changefreq: 'monthly' },
];
