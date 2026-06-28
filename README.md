# Streamify — Enhancement Notes

This pass fixed real bugs and brought the login/signup/dashboard pages in
line with the polished design system that `style.css` already had (but the
original HTML never used).

## Bugs fixed

- **Broken sign-up link**: `login.html` linked to `signup.html` (lowercase),
  but the file was `signUp.html`. Now both pages link to the right place.
- **Broken FAQ accordion**: `script.js` looked for `.faq-question` /
  `.active`, but the markup in `index.html` uses `.faq-q` / `.faq-a` /
  `.open`. The FAQ never opened. Rewrote `script.js` to match the real
  class names.
- **Script crash on the homepage**: the old `script.js` unconditionally
  called `searchInput.addEventListener(...)`, but `index.html` has no
  search box — `searchInput` was `null`, so the whole script threw and
  stopped running for every visitor. All listeners are now guarded.
- **Every dashboard row showed the same nine titles.** "Your Next Watch,"
  "Anime," "Made in India," etc. were all identical. Added a small shared
  catalog (`catalog.js`) and curated, genuinely different filters per row.
- **Dead nav links**: the dashboard linked to `home.html`, `series.html`,
  `movies.html`, none of which existed. Replaced with working in-page
  anchors to sections that are actually there.
- **Logout didn't log out**: it just navigated to `index.html` without
  clearing the session, so `dashboard.html` was still reachable
  afterwards. Logout now clears the stored session.
- **No route protection**: anyone could open `dashboard.html` or a profile
  page directly without signing in. Added `Auth.requireAuth()`, which
  redirects to `login.html` if no one is signed in.
- **Hardcoded user info**: the dashboard always showed "Aditi Yadav," even
  for a different logged-in account. It now reads the real signed-in
  user's name and email.
- **Missing profile page**: the dashboard linked to `profile.html`, which
  didn't exist. Added one.

## Structural changes

- **`auth.js`** — one shared module for sign up, log in, log out, and
  `requireAuth()`. Used by every page that needs it, so the logic lives in
  one place instead of being duplicated (and drifting) across files.
- **`catalog.js`** — a single list of titles/images/tags, plus a list of
  curated row definitions. `dashboard.js` renders rows from this list, so
  the rows are simple data to edit rather than repeated HTML blocks.
- **`login.html` / `signUp.html` / `profile.html`** — rebuilt using the
  `.auth-page / .auth-box / .auth-field / .btn-auth` classes that
  `style.css` already defined but the old pages never used. Inline error
  messages replace `alert()` popups.
- **`dashboard.html` / `dashboard.js`** — rebuilt using the
  `.dashboard-nav / .dash-banner / .dash-section / .dash-card` classes,
  with a working live search (filters cards and hides empty rows) and a
  working account dropdown.

## Known limitations (by design, for a front-end-only demo)

- There's no backend — accounts and sessions live in the browser's
  `localStorage`. Passwords are stored in plain text. This is fine for a
  learning project but isn't how real authentication should work; a real
  version would hash passwords server-side and use proper sessions/tokens.
- "Play" and movie-card clicks show a placeholder alert — there's no
  actual video playback.
- Search only matches on title text within the data already in
  `catalog.js`; it doesn't hit any external API.
