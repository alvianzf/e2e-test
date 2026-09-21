# E2E Testing Demo — Task List App

A tiny, self-contained app built for the "Practice & Demo" section of the
End-to-End Testing deck. No database, no external services — just Express
and an in-memory list, so it starts in under a second and can't break from
something outside your control.

## Setup (do this BEFORE class, not during it)

```bash
npm install
```

The Playwright browser binary (`npx playwright install --with-deps chromium`)
is deliberately **not** listed here — installing it live, in front of the
class, is part of the lesson. See `TEACHING_SCRIPT.md` for that segment.

## Verify everything works, once, ahead of time

```bash
npm run test:unit      # Jest + Supertest — backend, ~1 second
npm run test:e2e       # Playwright — spins the app up itself, ~5 seconds
```

Both suites should report all tests passing. If they don't, fix it now —
not during the demo. (Running `test:e2e` here also warms the local
Playwright browser cache, so the live "install it in class" demo doesn't
stall on a slow download — the install command itself still prints and
runs the same either way, it just resolves instantly.)

## Running the live demo

```bash
npm start
```

Then open http://localhost:3000 in a browser to show the app working
manually first (type a task, hit Add — or just press Enter).

To run the automated tests live:

```bash
npm run test:unit                # backend
npm run test:e2e -- --headed     # E2E, with a visible browser window
```

`--headed` is the one to use in front of a class — it shows the browser
literally typing, clicking, and asserting in real time, which is the whole
point of the demo.

## Project layout

```
server.js          Express app: GET/POST /tasks, static file serving
public/index.html  The UI — task input, Add button, error message, list
tests/app.test.js  Jest + Supertest: backend answer key
e2e/tasks.spec.js  Playwright: E2E answer key
playwright.config.js
TEACHING_SCRIPT.md Live teaching script + answer cheat sheet
```

## If you want to break it on purpose (for the "how I break my own tests" bit)

- Rename `data-testid="task-input"` in `public/index.html` to something else
  → the Playwright test fails with a clear "element not found."
- Change the 400 status in `server.js` to 422 → the Jest test fails on the
  status code assertion, not the message.
- Comment out the `if (!title)` check in `server.js` → the "rejects an
  empty task" test fails because the server now happily accepts blanks.

Each one is a clean, single-cause failure — good for showing students what
a red test actually tells you.
