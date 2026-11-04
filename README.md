# Vishal Kushwaha — Portfolio

A responsive, editorial portfolio in blush pink, warm white, and charcoal. Built with vanilla JavaScript, CSS, and Vite; no runtime framework or paid services.

## Run locally

Requires Node.js 20.19+ or 22.12+ (Node 24 is supported).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```sh
npm run build
npm run preview
```

## Deploy

### GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on pushes to `main`. In the repository's **Settings → Pages**, select **GitHub Actions** as the source. After deployment, the site is available at https://vishalsnghkush.github.io/termpp_port/.

The workflow sets Vite's base path to `/termpp_port/`; public screenshot URLs use the same base so they work on the repository subpath.

### Other hosts

Deploy this folder with Vercel or Netlify: build command `npm run build`, output directory `dist`. Alternatively, upload the contents of `dist` to any static host. No environment variables or API keys are needed.

## Content & customization

- `projects.js`: all ten projects, original source repositories, live links, stacks, and card colors.
- `main.js`: biography, education, internship, skills, courses, contact details, navigation, and interactions.
- `style.css`: design tokens, responsive layouts, interface illustrations, and animation.
- `index.html`: title, description, social metadata, and font loading.

Project and contact links come from the supplied Google document and user-provided details. Education, internship, DSA achievements, and course titles come from Vishal's public GitHub profile README, checked in November 2026. They are self-reported, not independently certified. Project descriptions and stacks were checked against repository documentation/manifests. Collaborative projects link to the repositories in the supplied document; this site does not claim exclusive authorship. The retinal-health project is explicitly presented as experimental research, not a validated medical device.

**Before publishing:** review all personal information and project descriptions, confirm the current internship/CGPA, and decide whether to publish the phone number. An updated résumé, exact contribution descriptions, and original screenshots can be added later. Certificate links are intentionally omitted until actual certificate files are supplied. The résumé action currently opens an email request rather than a nonexistent download.

### Navigation & layout

Home displays only the introduction, original artwork, and “Explore my work” action. Each navbar destination opens a separate hash-based view inside a rounded, dashed-outline frame, rather than scrolling through every section on Home. Direct links such as `/#projects`, refresh, and browser Back/Forward are supported on static hosting. Only the active view is visible or keyboard-accessible. Non-home views retain the footer.

### Project animation

On desktop, scrolling advances a sticky, layered project-card deck. On narrow screens or when reduced motion is requested, all cards become a normal accessible grid. Filters work in both layouts. Illustrations are original CSS/SVG interface studies, clearly labeled as such; they are **not screenshots** of the deployed applications.

### Contact & data

The contact form sends name, email, and message to the owner-provided Formspree endpoint `https://formspree.io/f/meaavkyo`, without API keys or a custom backend. The form action and JavaScript submission use the same endpoint, configured in `contact.js`. **Before publishing:** confirm in the Formspree dashboard that the recipient is `vishalsnghkush31@gmail.com` and complete any recipient verification required there. After deployment, submit a test message and check both the Formspree submissions dashboard and your inbox. An accepted API response alone does not prove email delivery. Automated tests mock the service and never send real messages.

The form has browser validation, Formspree's `_gotcha` honeypot field, duplicate-submit protection, a 15-second timeout, an accessible status message, and retry-safe failure handling that preserves the draft. Formspree's error messages (or the HTTP status if none are provided) are displayed when a submission is rejected. Visitor details pass through Formspree. Formspree availability, plan submission limits, spam filtering, and service policies apply. Email and phone links remain available as alternatives, and the copy-email button handles unavailable clipboard access.

GitHub public profile/repository data loads directly from `api.github.com` without a token, with a seven-second timeout and a linked November 2026 snapshot on failure or rate limits. The past-year contribution calendar is a public image from `ghchart.rshah.org` (GHChart), with a GitHub activity link if loading fails. It counts contributions, not exclusively commits. Requests expose the visitor's IP to GitHub and GHChart; font loading similarly contacts Google Fonts. There is no analytics, tracking, database, or secret storage. External project hosting may sleep or be unavailable independently of the portfolio.

## Browser tests

```sh
npx playwright install chromium
npm test
```

The tests start and stop their own local Vite server, stub GitHub responses for repeatability, and cover desktop/mobile layout, independent views, direct links and browser history, filtering, project scrolling, reduced motion, clipboard failure, and offline GitHub fallback. Test screenshots are saved to the ignored `test-results` directory.

## Design direction

Inspired by the supplied references: Palak's pink/neutral palette and editorial typography, Damilare's scroll-driven project stack, and Shambhavi Goel's fixed, section-based navigation. All implementation and decorative artwork here are original; no reference site's production assets are bundled.
