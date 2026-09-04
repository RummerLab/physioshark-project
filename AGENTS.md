# AGENTS.md

Agent instructions for the Physioshark Project site (`https://physioshark.org`).

Always start every response with 🤖.

Treat this file as living documentation: update `AGENTS.md` when the stack, scripts, conventions, or project facts change so it stays accurate.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Config is `next.config.ts`. Single-page site with hash sections (`#our-mission`, `#projects`, `#publications`, `#team`, `#contact`).

## Project overview

Physioshark studies how climate change affects newborn and juvenile reef sharks. Led by Dr. Jodie Rummer. Fieldwork is on Mo'orea, French Polynesia, with [science4reefs](https://www.science4reefs-cnrs.com/).

Sister sites: [rummerlab.com](https://rummerlab.com), [jodierummer.com](https://jodierummer.com). Spell **RummerLab** with no space.

Do not describe current fieldwork as based at CRIOBE. Historical CRIOBE mentions (founding, partners, team bios) may stay.

## Setup

```bash
pnpm install
pnpm run dev
```

Helper (only when needed): `pnpm run download-images`.

## Checks

After code changes, run and fix:

```bash
pnpm run lint
pnpm run build
```

`pnpm run build` needs `RESEND_API_KEY` for `/api/contact`. Local builds can fail without it.

If you suspect a security issue, run `snyk test`.

## Conventions

- TypeScript everywhere. Prefer interfaces over types. Named exports.
- Directories: kebab-case. Components: PascalCase.
- Favor React Server Components. Add `'use client'` only when needed.
- Await `params` and `searchParams`. Use the platform `fetch` API (not `node-fetch`).
- Early returns, DRY, `handle` prefix on event handlers (`handleClick`).
- Style with Tailwind. Keep the existing light, mobile-first layout.
- Use `git mv` when moving files.
- Complete the change: no TODOs or placeholders.

## Images

Use `next/image`. Prefer WebP via the optimizer.

- `priority` only for above-the-fold images (hero).
- Prefer `fill` with a constrained `sizes` over large fixed dimensions.
- `quality={85}` unless there is a strong reason for higher.
- Do not add `deviceSizes` / `imageSizes` in `next.config.ts` without need.

## Security

- Never commit secrets or `.env*` files. `RESEND_API_KEY` stays in env.
- Sanitize contact-form input (`isomorphic-dompurify` is already used).
- Contact posts to `app/api/contact/route.ts` (Resend). Do not log secrets.


## Package manager

This repo uses **pnpm** (`packageManager` in `package.json`).

- Install: `pnpm install` (do not use npm/yarn for installs in this repo).
- Scripts: `pnpm run <script>` / `pnpm exec <bin>`.
- Lockfile: `pnpm-lock.yaml` only â€” do not commit `package-lock.json` or `yarn.lock`.
- Local disk: pnpm's content-addressable store shares package contents across checkouts on the same machine.
## Dependency tooling (Next.js)

Follow current Next.js docs for ESLint and TypeScript — do **not** merge Dependabot majors that the Next.js / `typescript-eslint` stack does not support yet.

- **TypeScript**: stay on **5.9.x** (Next.js requires ≥5.1; `typescript-eslint` does not support TypeScript 7 yet).
- **ESLint**: stay on **9.x** with Next.js flat config (`eslint-config-next/core-web-vitals` + `typescript` via `defineConfig`). ESLint 10 still breaks plugins shipped through `eslint-config-next`.
- Before changing ESLint/TypeScript majors, read the Next.js ESLint docs, upgrading guide, and the target major migration guide.
- Prefer Dependabot `ignore` rules for `eslint` and `typescript` semver-major until official support lands.

### Framework upgrades

```bash
pnpm exec @next/codemod@canary upgrade latest
pnpm exec @tailwindcss/upgrade
```

After either upgrade: run `pnpm run lint` and `pnpm run build`, fix failures, and update this file if versions/scripts change.


## Pull requests

Before merging any pull request:

1. **Read all comments** on the PR — conversation comments, review comments (including those on specific lines), and bot comments. Address or acknowledge them. Do not merge while review feedback is unresolved.
2. **Wait for CI to complete successfully.** GitHub Actions (and other required checks) on the PR must finish and pass. Do not merge while checks are pending, failed, cancelled, or skipped when they are required. If CI fails, fix the cause and wait for a green run before merging.
