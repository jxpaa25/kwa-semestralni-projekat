# KwaToystore

KwaToystore is a single-page toy-store catalog built with Angular 21. Visitors can browse a catalog of 30 toys, filter it by name, description, type, age group, target group, production date, price and average rating, open a detail page with customer reviews, and, once registered and logged in, add toys to a cart, adjust quantities and edit their profile. The app is fully client-side: the toy and user data are TypeScript arrays bundled with the app, and the session and cart are persisted in `localStorage`. The user interface is in Serbian.

## Features

- Catalog with 11 combinable filters (text search on name and description, toy type, age group, target group, production date range, price range, average rating range) and pagination, 10 items per page
- Toy detail page with price and date formatting, and a list of customer reviews with author name and star rating
- Registration with a favourite-toy-types checkbox group, and automatic login after registering
- Login and logout, with the session restored on reload
- Profile page that reuses the registration form in edit mode (email is read-only, password change is optional)
- Cart with quantity controls, per-line and total price, persisted across reloads
- `/profile` and `/cart` are protected by a route guard
- Header with cart badge showing the number of items

Known limitations, by design of the assignment:

- There is no backend. New registrations and profile edits live in memory and are lost on reload, except for the currently logged-in user, whose session is stored in `localStorage`.
- Checkout only confirms the order with a browser alert and empties the cart. No order is recorded.
- Reviews are read-only seed data.
- Toy images are served from an external host.

## Tech stack

| Package | Version |
|---|---|
| Angular (core, router, forms, common) | ^21.2.0 |
| Angular Material and CDK | ^21.2.8 |
| TypeScript | ~5.9.2 |
| Tailwind CSS (via PostCSS) | ^4.1.12 |
| Vitest (through `@angular/build`) | ^4.0.8 |
| RxJS | ~7.8.0 |

## Angular concepts used

- **Standalone components** with lazy-loaded routes (`loadComponent`)
- **Signals** for all application state: `signal`, `computed` and `update`. The catalog filters and pagination are a chain of computed signals.
- **Dependency injection** with `inject()` and root-provided services (`AuthService`, `CartService`, `ToyService`)
- **Functional route guard** (`CanActivateFn`) on the profile and cart routes
- **Reactive forms** with `FormBuilder`, `Validators`, a `FormArray` for the checkbox group, and validators that change between register and edit mode
- **Template-driven binding** with `ngModel` wired to signals for the catalog filters
- **Route parameters** (`/toy/:permalink`) read through `ActivatedRoute`
- **Built-in control flow** (`@if`, `@for`) and **built-in pipes** (`date`, `number`, `titlecase`)
- **Angular Material 3 theming** with `mat.theme()` and Material Icons, alongside Tailwind utility classes
- **Unit tests** with Vitest and `TestBed` for the services, the guard and the main components

## Project structure

```
src/
  app/
    app.ts, app.html        root shell: header and router outlet
    app.routes.ts           lazy routes and guards
    guards/auth.guard.ts    functional CanActivateFn
    services/               AuthService, CartService, ToyService
    pages/                  home, toy-detail, login, register (also used for profile), cart
  db/
    toys.db.ts              Toy, ToyType, AgeGroup, Review types and seed data
    users.db.ts             User type and seed users
```

## Getting started

Requires Node.js 20 or newer and npm.

```bash
npm install
npm start
```

Open `http://localhost:4200/`. The app reloads on file changes.

Seed accounts for logging in are listed in `src/db/users.db.ts`, for example `petar@petrovic.com` / `petar123`.

### Other commands

```bash
npm run build            # production build into dist/kwa-toystore/browser
npm test                 # run unit tests with Vitest
npx ng test --watch=false
```

## Deployment

The production build is a static site. A `vercel.json` is included with the build command, output directory and a single-page-app rewrite so that deep links such as `/toy/drvena-slagalica-zivotinje` resolve to `index.html`.

## Licence

Semester project for the Klijentske veb aplikacije (Client-side web applications) course.
