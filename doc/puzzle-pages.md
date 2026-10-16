# Puzzle anagram pages (/anagram/<letters>)

Source of truth: `data/puzzle-words.json`. Pages, the `/anagram` hub and their content are generated at build time (`lib/puzzleWords.ts`).

## Adding a word
1. Take it from the GSC query export (28 days). Require **≥100 impressions**. Put the exact figure in `gscImpressions28d`; never estimate. If only a relayed range is known, leave `null` and explain in `gscImpressionsNote`.
2. Set `addedOn` (YYYY-MM-DD), `clicks: null`, `noindex: false`.
3. Add `/anagram/<letters>` to `public/sitemap.xml`.
4. `npm test` checks it qualifies: ≥1 exact anagram in the common dictionary and ≥5 shorter common words (3+ letters), and that the list has **≤50 entries** (hard cap).

## Retiring pages (60-day rule)
- After a GSC check, write the clicks since `addedOn` into `clicks` and the date into `clicksCheckedOn`.
- `isIndexable()` returns false when `noindex` is true, or when the page is more than 60 days old **and** `clicks === 0`. Such pages get `<meta name="robots" content="noindex, follow">` and drop off the hub on the next build.
- Remove noindexed pages from `public/sitemap.xml` (the test fails until you do).
