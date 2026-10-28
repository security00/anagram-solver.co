import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import PuzzleMissHandoff from '@/components/PuzzleMissHandoff';

export default function NotFound() {
  return (
    <InnerPageShell
      eyebrow="Missing page"
      title="Page not found"
      description="That address is not a page on this site. Puzzle scrambles that are not in the curated list can still be solved on the homepage."
    >
      <InnerContent>
        <PuzzleMissHandoff />
      </InnerContent>
    </InnerPageShell>
  );
}
