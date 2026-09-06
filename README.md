# KwaToystore

KwaToystore is a toy store catalog written in Angular 21. It has 30 toys that you can search and filter, a detail page for each one with customer reviews, and, once you register and log in, a cart and a profile page. Everything runs in the browser. The toys and the users are TypeScript arrays shipped with the app, and the session and the cart are kept in `localStorage`. The interface is in Serbian.

## What it does

The catalog page has eleven filters that can be combined: text search on the name and on the description, toy type, age group, target group, a production date range, a price range and an average rating range. Results are paged ten at a time.

Each toy has a detail page with the formatted price and production date and a list of reviews, each with the author's name and a star rating. The button on that page adds the toy to the cart, or sends you to the login page if you are not logged in.

Registration asks for name, contact details, a password and a set of favourite toy types (a checkbox group). A new user is logged in straight away. Login and logout work as you would expect, and the session survives a page reload. The profile page is the same form in edit mode: the email field is read only and the password is only changed if you type a new one.

The cart shows each line with quantity controls and a line total, plus the overall total. It is stored in `localStorage`, so it is still there after a reload. The header shows a badge with the number of items. The profile and cart routes are behind a route guard.

Some things are deliberately left simple, because this was a course assignment:

- There is no backend. New accounts and profile edits are held in memory and disappear on reload, apart from the logged-in user, whose session is saved.
- Checkout shows a browser alert and empties the cart. Nothing is recorded.
- Reviews are seed data and cannot be written from the app.
- Toy images come from an external host.

## Tech stack

| Package | Version |
|---|---|
| Angular (core, router, forms, common) | ^21.2.0 |
| Angular Material and CDK | ^21.2.8 |
| TypeScript | ~5.9.2 |
| Tailwind CSS (via PostCSS) | ^4.1.12 |
| Vitest (through `@angular/build`) | ^4.0.8 |
| RxJS | ~7.8.0 |

## Angular features used

- Standalone components and lazy loaded routes with `loadComponent`
- Signals for all application state. The catalog filters and the pagination are a chain of `computed` signals.
- `inject()` and services provided in root: `AuthService`, `CartService` and `ToyService`
- A functional `CanActivateFn` guard on the profile and cart routes
- Reactive forms with `FormBuilder`, `Validators` and a `FormArray` for the checkbox group. The password validators differ between register and edit mode.
- `ngModel` bound to signals for the catalog filters
- A route parameter (`/toy/:permalink`) read through `ActivatedRoute`
- The `@if` and `@for` control flow and the `date`, `number` and `titlecase` pipes
- Angular Material 3 theming with `mat.theme()` and Material Icons, next to Tailwind utility classes
- Unit tests with Vitest and `TestBed` for the services, the guard and the main components

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

## Running it

You need Node.js 20 or newer and npm.

```bash
npm install
npm start
```

Then open `http://localhost:4200/`. The app reloads when you change a file.

The seed accounts are in `src/db/users.db.ts`. One of them is `petar@petrovic.com` with the password `petar123`.

Other commands:

```bash
npm run build            # production build into dist/kwa-toystore/browser
npm test                 # run unit tests with Vitest
npx ng test --watch=false
```

## Deployment

The production build is a static site. The repo includes a `vercel.json` with the build command, the output directory and a rewrite that sends every path to `index.html`, so a deep link like `/toy/drvena-slagalica-zivotinje` still loads.

## Background

Semester project for the course Klijentske veb aplikacije (client-side web applications).
