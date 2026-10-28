import Link from 'next/link';

const links = [
  { href: '/', label: 'Anagram Solver' },
  { href: '/tools/word-finder', label: 'Word Finder' },
  { href: '/tools/word-finder?min=5&max=5', label: '5-letter unscramble' },
  { href: '/tools/scrabble-solver', label: 'Rack Word Finder' },
  { href: '/tools/words-with-friends-finder', label: 'Words With Friends Finder' },
  { href: '/tools/jumble-solver', label: 'Jumble Solver' },
  { href: '/tools/multiple-words', label: 'Multiple Words' },
];

export default function ToolCrossPromo({ hint }: { hint?: string }) {
  return (
    <aside className="tool-cross-promo" aria-label="Related word tools">
      {hint ? <p>{hint}</p> : <p>Try a related tool:</p>}
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
