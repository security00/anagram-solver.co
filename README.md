# anagram-solver.co

A static Next.js site with four distinct browser-side search modes:

- exact single-word anagrams using every input letter once;
- words made from some or all available letters;
- fixed-length `?` pattern matching and rack blanks;
- exact two- and three-word phrase anagrams with bounded search.

The dictionaries and solver run inside a Web Worker. There is no application
search API, so CPU-heavy searches do not block the page or require a server.

## Local development

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Quality checks:

```bash
npm test
npm run lint
npm run build
```

Preview the production export through Cloudflare's local Workers runtime:

```bash
npm run preview
```

## Cloudflare Workers deployment

`next.config.ts` statically exports the site to `out/`. `wrangler.jsonc` publishes
that directory with Workers Static Assets; it does not use Cloudflare Pages or a
Node.js Worker runtime.

Manual deployment after authenticating Wrangler:

```bash
npm run deploy
```

The GitHub Actions workflow tests, lints, builds, and runs `wrangler deploy` on
pushes to `main` or `master`. Configure these repository secrets:

- `CLOUDFLARE_API_TOKEN`: token with Workers Scripts edit permissions
- `CLOUDFLARE_ACCOUNT_ID`: the target Cloudflare account ID

After the first Workers deployment, attach `anagram-solver.co` as a custom domain
to the `anagram-solver-co` Worker in Cloudflare. Remove the old Pages custom-domain
mapping only after the Workers hostname has been verified.

## Dictionary provenance

The Common and Extended lists are generated from ESDB/SCOWL data. See
[`public/dictionaries/README.md`](public/dictionaries/README.md) for sizes,
provenance, limitations, and the required license notice.
