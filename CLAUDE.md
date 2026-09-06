# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

KwaToystore: an Angular 21 single-page toy-store demo (university semester project). Standalone components, signals, lazy-loaded routes, Tailwind v4 + Angular Material. There is no backend: all data lives in TypeScript arrays under `src/db/` and in `localStorage`. UI text, form field names, and many identifiers are in Serbian (e.g. `trenutniKorisnik` = current user, `ime`/`prezime` = first/last name, `omiljeneVrsteIgracaka` = favourite toy types). Keep new user-facing strings in Serbian.

## Commands

```bash
npm start                                   # ng serve, dev config, http://localhost:4200
npm run build                               # ng build, production config (default), output in dist/
npm run watch                               # ng build --watch --configuration development
npm test                                    # ng test (Vitest via @angular/build:unit-test, jsdom, watch in TTY)
npx ng test --watch=false                   # single run
npx ng test --include src/app/app.spec.ts   # run one spec file (glob, relative to project root)
npx prettier --write "src/**/*.{ts,html}"   # formatting (printWidth 100, single quotes, angular html parser)
```

There is no lint script or ESLint config. Note that `src/app/app.spec.ts` is the only spec and it is stale (it expects an `<h1>` with "Hello, kwa-toystore" that no longer exists), so `npm test` currently fails on that assertion.

## Architecture

**Bootstrap and routing.** `src/main.ts` calls `bootstrapApplication(App, appConfig)`. `src/app/app.config.ts` provides the router and `provideHttpClient()` (HttpClient is currently unused). All routes in `src/app/app.routes.ts` use `loadComponent` for lazy loading. `/profile` and `/cart` are protected by `authGuard` (`src/app/guards/auth.guard.ts`), which simply returns `false` when no user is logged in (no redirect). `/profile` reuses `RegisterComponent`, which switches to edit mode in `ngOnInit` when a user is logged in.

**Root shell.** `src/app/app.ts` + `app.html` render the sticky header (login/register links or user name, cart badge, logout) and `<router-outlet>`. The header reads `AuthService.trenutniKorisnik()` and `CartService.totalItems()` signals directly.

**Data layer (`src/db/`).** `toys.db.ts` exports the `Toy`, `ToyType`, `AgeGroup`, `Review` interfaces plus the `toys`, `toyTypes`, `ageGroups` arrays (~880 lines of seed data). `users.db.ts` exports `User` and a `users` array with plaintext passwords. Toys are addressed by `permalink` in routes (`/toy/:permalink`) and by `toyId` in the cart. `Review.authorId` references `User.id`; `ToyDetailComponent` resolves author names by importing `users` directly.

**Services (all `providedIn: 'root'`, signal-based).**
- `ToyService`: thin read-only accessors over the `toys` array.
- `AuthService`: `trenutniKorisnik` signal. Login/register/updateProfile mutate the in-memory `users` array; only the current user is persisted to `localStorage` under `currentUser`. Newly registered users and profile edits are therefore lost on page reload unless they are the logged-in user.
- `CartService`: `cartItems` signal with `items`/`totalItems`/`totalPrice` computed signals, persisted to `localStorage` under `cart`. Cart entries embed the full `Toy` object.

**Pages (`src/app/pages/`).** Each page is a standalone component with a co-located `.html` template and no component stylesheet (styling is Tailwind utility classes in templates). `HomeComponent` holds all catalog filter state as signals and derives `filteredToys` / `paginatedToys` via `computed` (page size 10). Forms in login/register use `ReactiveFormsModule`; favourite toy types are a `FormArray` driven by checkbox change handlers.

**Styling.** Global styles are `src/material-theme.scss` (Material 3 theme via `mat.theme()`, azure/blue palettes, light color-scheme) followed by `src/styles.css` (`@import 'tailwindcss'`), wired through `.postcssrc.json`. Material Icons and Roboto are loaded from Google Fonts in `src/index.html`. Angular Material is used mainly for `MatIconModule`. Production build has a 4 kB warning / 8 kB error budget per component stylesheet.

**TypeScript.** `strict` plus `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `strictTemplates`. Specs use Vitest globals (`tsconfig.spec.json`).
