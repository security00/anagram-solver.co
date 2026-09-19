# CODEX.md

## Project Purpose

`anagram-solver.co` is an English word-tool SEO site focused on anagram solving, word finder flows, and multi-word anagram search intent.

## Current Priority

Track the latest revival work around multi-word, two-word, and three-word anagram pages. Wait for GSC 7/14/28 day signals before another major content change.

## Main Query Families

- anagram solver multiple words
- multiple word anagram solver
- multi word anagram solver
- anagram solver 2 words
- two word anagram solver
- three word anagram solver

## Important Paths

- `app/tools/multiple-words/page.tsx`
- `app/tools/two-word-anagram-solver/page.tsx`
- `app/tools/three-word-anagram-solver/page.tsx`
- `components/MultipleWordsAnagramTool.tsx`
- `lib/anagramSolver.ts`
- `public/sitemap.xml`
- `doc/PRD.md`

## Commands

- `npm run lint`
- `npm run build`
- `npm run dev`

## Deploy Flow

GitHub push to `main` triggers the Cloudflare Pages workflow. Check workflow status and production URLs after push.

## Do Not Touch Without Intent

- Avoid another broad rewrite until GSC data arrives.
- Keep tool pages focused on exact user tasks, not generic SEO text.
- Exclude `node_modules`, `.next`, and `out` from scans.

## Standard Final Report

- Target query cluster
- Tool/page changes
- Validation commands
- Production URL checks
- GSC review dates
