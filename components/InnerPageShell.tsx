import Image from 'next/image';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

type InnerPageShellProps = {
  children?: ReactNode;
  description: string;
  eyebrow: string;
  heroContent?: ReactNode;
  title: string;
};

export default function InnerPageShell({
  children,
  description,
  eyebrow,
  heroContent,
  title,
}: InnerPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfdfd]">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-[#09c4d8] bg-[#f8fbfc]">
          <div
            className="pointer-events-none absolute right-0 top-0 hidden h-[330px] w-[52%] lg:block"
            aria-hidden="true"
          >
            <Image
              src="/design/blueprint-letters.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 0vw"
              className="object-cover object-left-top opacity-45"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1320px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
            <div className="max-w-[850px]">
              <p className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#008f9e]">
                <span className="h-px w-8 bg-[#09c4d8]" aria-hidden="true" />
                {eyebrow}
              </p>
              <h1 className="mt-5 text-[2.55rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#061a38] sm:text-5xl lg:text-[3.5rem]">
                {title}
              </h1>
              <p className="mt-5 max-w-[760px] text-lg leading-8 text-[#52657d] sm:text-xl">
                {description}
              </p>
            </div>

            {heroContent}
          </div>
        </section>

        {children}
      </main>
      <Footer />
    </div>
  );
}

export function InnerContent({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <section className="border-b border-[#d9e5ec] bg-white py-14 sm:py-16">
      <div
        className={`mx-auto px-5 sm:px-8 lg:px-12 ${wide ? 'max-w-[1320px]' : 'max-w-[1080px]'}`}
      >
        {children}
      </div>
    </section>
  );
}

export function RelatedLinkGrid({ children }: { children: ReactNode }) {
  return <div className="related-link-grid">{children}</div>;
}
