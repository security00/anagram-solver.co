import {
  ArrowRightIcon,
  BoltIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import AnagramSolverTool from '@/components/AnagramSolverTool';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const dynamic = 'force-static';
export const revalidate = false;

const exampleSource = ['L', 'I', 'S', 'T', 'E', 'N'];
const exampleResult = ['S', 'I', 'L', 'E', 'N', 'T'];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfdfd]">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-[#09c4d8] bg-[#fcfdfd]">
          <div className="pointer-events-none absolute right-0 top-0 hidden h-[400px] w-[58%] lg:block" aria-hidden="true">
            <Image
              src="/design/blueprint-letters.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 0vw"
              className="object-cover object-left-top opacity-75"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-0 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-[70px]">
            <div className="max-w-[760px]">
              <h1 className="text-[2.65rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#061a38] sm:text-6xl lg:text-[4rem]">
                Find Every Word
                <br />
                Hidden in Your Letters
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#52657d] sm:text-xl">
                Rearrange every letter in a word or phrase to find exact English anagrams.
              </p>
            </div>

            <AnagramSolverTool />
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14" aria-labelledby="anagram-explainer-title">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-12">
            <div>
              <h2 id="anagram-explainer-title" className="text-3xl font-extrabold tracking-[-0.035em] text-[#061a38] sm:text-4xl">
                What is an Anagram?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#52657d]">
                An anagram transposes all the letters of another word or phrase. LISTEN and SILENT
                have the same six letters, each used exactly once. A shorter result belongs in Word
                Finder instead because it does not use every letter.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <LetterExample label="Your letters" letters={exampleSource} />
              <ArrowRightIcon className="mx-auto h-7 w-7 rotate-90 text-[#00aebf] sm:mb-3 sm:rotate-0" aria-hidden="true" />
              <LetterExample label="Anagram" letters={exampleResult} />
            </div>
          </div>
        </section>

        <section className="border-y border-[#d9e5ec] bg-[#f4f8fa] py-14 sm:py-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div>
                <BoltIcon className="h-8 w-8 text-[#00aebf]" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.025em] text-[#061a38]">Fast, local solving</h2>
                <p className="mt-4 max-w-lg leading-7 text-[#52657d]">
                  The dictionary downloads once and searches run in a background browser worker,
                  keeping the interface responsive and your letters in your browser.
                </p>
              </div>

              <div className="divide-y divide-[#cfdde5] border-y border-[#cfdde5]">
                <ToolLink
                  href="/tools/word-finder"
                  title="Word Finder"
                  description="Make shorter words from available letters or match a fixed-length pattern."
                  icon="search"
                />
                <ToolLink
                  href="/tools/scrabble-solver"
                  title="Rack Word Finder"
                  description="Explore words from a tile rack, including zero-point blank tiles."
                  icon="grid"
                />
                <ToolLink
                  href="/tools/multiple-words"
                  title="Multi-Word Anagrams"
                  description="Split all input letters into exact two- or three-word phrases."
                  icon="grid"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function LetterExample({ label, letters }: { label: string; letters: string[] }) {
  return (
    <div>
      <p className="mb-3 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-[#52657d]">{label}</p>
      <div className="grid grid-cols-6">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="flex aspect-square min-w-0 items-center justify-center border-y border-l border-[#8ed7e0] font-mono text-lg font-bold text-[#061a38] last:border-r sm:text-xl"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

function ToolLink({
  description,
  href,
  icon,
  title,
}: {
  description: string;
  href: string;
  icon: 'grid' | 'search';
  title: string;
}) {
  const Icon = icon === 'search' ? MagnifyingGlassIcon : Squares2X2Icon;

  return (
    <Link href={href} className="group grid gap-4 py-6 sm:grid-cols-[44px_1fr_auto] sm:items-center">
      <span className="flex h-11 w-11 items-center justify-center border border-cyan-200 text-[#00aebf]" aria-hidden="true">
        <Icon className="h-6 w-6" />
      </span>
      <span>
        <span className="block font-bold text-[#061a38] transition-colors group-hover:text-[#008f9e]">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-[#52657d]">{description}</span>
      </span>
      <ArrowRightIcon className="hidden h-5 w-5 text-[#00aebf] transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true" />
    </Link>
  );
}
