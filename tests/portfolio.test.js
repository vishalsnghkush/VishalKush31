import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { createServer } from "vite";
import { mkdir } from "node:fs/promises";

let server;
let browser;
const url = "http://127.0.0.1:4175";
before(async () => {
  await mkdir("test-results", { recursive: true });
  server = await createServer({ server: { host: "127.0.0.1", port: 4175, strictPort: true } });
  await server.listen();
  browser = await chromium.launch({ headless: true });
});
after(async () => {
  await browser?.close();
  await server?.close();
});
async function openPage(options = {}, offline = false, hash = "") {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.route("https://api.github.com/**", async route => {
    if (offline) return route.abort();
    const body = route.request().url().includes("/repos?")
      ? [{ name: "AgriVerse", html_url: "https://github.com/vishalsnghkush/AgriVerse", language: "JavaScript" }, { name: "FDA", html_url: "https://github.com/vishalsnghkush/FDA", language: "Jupyter Notebook" }, { name: "OS_CPU_Scheduler", html_url: "https://github.com/vishalsnghkush/OS_CPU_Scheduler", language: "JavaScript" }]
      : { public_repos: 23 };
    return route.fulfill({ json: body });
  });
  await page.route("https://ghchart.rshah.org/**", route => offline
    ? route.abort()
    : route.fulfill({ contentType: "image/svg+xml", body: '<svg xmlns="http://www.w3.org/2000/svg" width="722" height="112"><rect width="722" height="112" fill="#94556d"/></svg>' }));
  await page.goto(url + hash);
  await page.locator("main > section:visible").waitFor();
  return { context, page };
}
async function goView(page, id) {
  const menu = page.locator(".menu-toggle");
  if (await menu.isVisible() && await menu.getAttribute("aria-expanded") !== "true") await menu.click();
  await page.locator(`#navigation a[href="#${id}"]`).click();
  await page.locator(`#${id}:visible`).waitFor();
}
async function noOverflow(page) {
  const sizes = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }));
  assert.ok(sizes.page <= sizes.viewport, `Horizontal overflow: ${JSON.stringify(sizes)}`);
}

test("AgriVerse displays original screenshots and switches between them", async () => {
  for (const width of [1440, 390]) {
    const { context, page } = await openPage({ viewport: { width, height: 1000 } }, false, "#projects");
    const card = page.locator('[data-project="agriverse-web"]');
    const image = card.locator(".project-screenshot");
    const loaded = () => image.evaluate(el => el.complete && el.naturalWidth > 0);
    await image.waitFor();
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-project="agriverse-web"] .project-screenshot');
      return el.complete && el.naturalWidth > 0;
    });
    assert.ok(await loaded());
    assert.match(await image.getAttribute("src"), /dashboard\.png$/);
    assert.match(await card.locator(".art-disclaimer").textContent(), /Original project screenshots/);
    await card.getByRole("button", { name: "Disease analysis", exact: true }).click();
    assert.match(await image.getAttribute("alt"), /apple black rot/);
    assert.equal(await card.getByRole("button", { name: "Disease analysis", exact: true }).getAttribute("aria-pressed"), "true");
    await page.waitForFunction(() => {
      const el = document.querySelector('[data-project="agriverse-web"] .project-screenshot');
      return el.complete && el.naturalWidth > 0;
    });
    assert.ok(await loaded());
    assert.equal(await card.locator(".project-screenshot-link").getAttribute("href"), await image.getAttribute("src"));
    await card.getByRole("button", { name: "Dashboard", exact: true }).click();
    assert.match(await image.getAttribute("src"), /dashboard\.png$/);
    await noOverflow(page);
    await page.screenshot({ path: `test-results/agriverse-${width}.png` });
    await page.locator('[data-filter="Web"]').click();
    await page.locator('[data-project="agriverse-web"]').getByRole("button", { name: "Disease analysis", exact: true }).click();
    assert.match(await page.locator('[data-project="agriverse-web"] .project-screenshot').getAttribute("alt"), /apple black rot/);
    assert.equal(await page.locator('[data-project="precisionprep"] .project-screenshot').count(), 0);
    await context.close();
  }
});

test("education, project-based skills, and DSA links reflect the updated profile", async () => {
  for (const width of [1440, 390]) {
    const { context, page } = await openPage({ viewport: { width, height: 1000 } }, false, "#academics");
    assert.equal(await page.locator(".education-score > strong").textContent(), "8.45/10");
    await noOverflow(page);
    await goView(page, "skills");
    const cards = page.locator(".skill-card");
    assert.equal(await cards.count(), 4);
    const expectedSkills = [
      ["Python", "JavaScript", "TypeScript", "C", "C++", "HTML & CSS"],
      ["React", "Next.js", "React Native", "Expo", "Capacitor", "Tailwind CSS", "Redux Toolkit", "React Native SVG", "Chart.js", "Vite"],
      ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "Computer Vision", "SciPy", "scikit-image", "NetworkX", "RapidFuzz", "LightGBM", "XGBoost", "Matplotlib"],
      ["Flask", "FastAPI", "PostgreSQL", "MySQL", "Turso", "Firebase", "Drizzle ORM", "Git & GitHub", "Docker"],
    ];
    for (const [index, skills] of expectedSkills.entries()) {
      assert.deepEqual(await cards.nth(index).locator(".skill-tags > span").allTextContents(), skills);
    }
    await noOverflow(page);
    await goView(page, "dsa");
    assert.equal(await page.locator(".dsa-profile-links a").count(), 1);
    assert.equal(await page.locator(".dsa-profile-links a").getAttribute("href"), "https://leetcode.com/u/Vishalsnghkush31/");
    assert.equal(await page.getByRole("link", { name: "DSA practice on GitHub" }).count(), 0);
    await noOverflow(page);
    await context.close();
  }
});

test("past-year GitHub activity loads with an offline fallback and certificates have no pending wording", async () => {
  for (const width of [1440, 390]) {
    const { context, page } = await openPage({ viewport: { width, height: 1000 } }, false, "#github");
    await page.waitForFunction(() => document.querySelector("#github-activity-chart").naturalWidth > 0);
    assert.ok(await page.locator("#github-activity-chart").isVisible());
    assert.equal(await page.locator("#github-activity-status").isVisible(), false);
    assert.equal(await page.getByRole("link", { name: "View activity" }).getAttribute("href"), "https://github.com/vishalsnghkush?tab=overview");
    await noOverflow(page);
    await goView(page, "certificates");
    assert.doesNotMatch(await page.locator("#certificates").textContent(), /when available|will be added|to be added/i);
    await goView(page, "experience");
    assert.deepEqual(await page.locator(".role-certificate").allTextContents(), ["Certificate earned", "Certificate earned"]);
    await context.close();
    const offline = await openPage({ viewport: { width, height: 1000 } }, true, "#github");
    await offline.page.locator("#github-activity-status").filter({ hasText: "Contribution graph unavailable" }).waitFor();
    assert.equal(await offline.page.locator("#github-activity-chart").isVisible(), false);
    assert.ok(await offline.page.getByRole("link", { name: "View activity" }).isVisible());
    await noOverflow(offline.page);
    await offline.context.close();
  }
});

test("contact resume link opens the supplied Google Drive file", async () => {
  const { context, page } = await openPage({}, false, "#contact");
  const resume = page.getByRole("link", { name: "View résumé" });
  assert.ok(await resume.isVisible());
  assert.equal(await resume.getAttribute("href"), "https://drive.google.com/file/d/1bD52DZPibzIIgjYtEWanllf5yxwSut1h/view?usp=sharing");
  assert.equal(await resume.getAttribute("target"), "_blank");
  assert.equal(await resume.getAttribute("rel"), "noopener noreferrer");
  assert.equal(await page.getByRole("link", { name: "Request résumé" }).count(), 0);
  await context.close();
});

test("contact form validates, preserves failed drafts, and submits with a softer theme", async () => {
  for (const [width, colorScheme] of [[1440, "dark"], [390, "dark"], [390, "light"]]) {
    const { context, page } = await openPage({ viewport: { width, height: 1000 }, colorScheme }, false, "#contact");
    const requests = [];
    await page.route("https://formspree.io/f/meaavkyo", async route => {
      requests.push(route.request().postDataJSON());
      await route.fulfill(requests.length > 1
        ? { json: { ok: true } }
        : { status: 422, json: { errors: [{ message: "Please verify the recipient email." }] } });
    });
    assert.equal(await page.locator("#contact-form").getAttribute("action"), "https://formspree.io/f/meaavkyo");
    assert.equal(await page.locator(".contact-form-privacy").count(), 0);
    const button = page.getByRole("button", { name: "Send message" });
    const status = page.locator("#contact-form-status");
    assert.equal(await page.locator("#contact").evaluate(el => getComputedStyle(el).backgroundColor), colorScheme === "dark" ? "rgb(45, 36, 43)" : "rgb(240, 220, 227)");
    await button.click();
    assert.equal(requests.length, 0);
    await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
    await page.getByLabel("Email address", { exact: true }).fill("not-an-email");
    await page.getByLabel("Your message", { exact: true }).fill("Hello! I'd like to discuss a project.");
    await button.click();
    assert.equal(requests.length, 0);
    await page.getByLabel("Email address", { exact: true }).fill("visitor@example.com");
    await button.click();
    await status.filter({ hasText: "Couldn't send your message" }).waitFor();
    assert.match(await status.textContent(), /Please verify the recipient email/);
    assert.equal(await page.locator("#contact-message").inputValue(), "Hello! I'd like to discuss a project.");
    assert.ok(await button.isEnabled());
    await button.click();
    await status.filter({ hasText: "Message submitted" }).waitFor();
    assert.equal(requests.length, 2);
    assert.equal(requests[1].email, "visitor@example.com");
    assert.equal(requests[1].name, "Test Visitor");
    assert.equal(requests[1]._gotcha, "");
    assert.equal(requests[1]._subject, "New message from your portfolio");
    assert.equal("_template" in requests[1], false);
    assert.equal(requests[1].message, "Hello! I'd like to discuss a project.");
    assert.equal(await page.locator("#contact-message").inputValue(), "");
    assert.ok(await button.isEnabled());
    await noOverflow(page);
    await page.screenshot({ path: `test-results/contact-form-${colorScheme}-${width}.png`, fullPage: true });
    await context.close();
  }
});

test("contact form handles Formspree outages and blocks duplicate and honeypot submissions", async () => {
  const { context, page } = await openPage({}, false, "#contact");
  let requests = 0;
  let finishRequest;
  await page.route("https://formspree.io/f/meaavkyo", async route => {
    requests++;
    if (requests === 1) {
      await route.fulfill({ status: 503, contentType: "text/html", body: "Service unavailable" });
    } else if (requests === 2) {
      await route.abort();
    } else {
      await new Promise(resolve => { finishRequest = resolve; });
      await route.fulfill({ json: { ok: true } });
    }
  });
  await page.locator("#contact-name").fill("Test Visitor");
  await page.locator("#contact-email").fill("visitor@example.com");
  await page.locator("#contact-message").fill("Please keep this draft if the service is offline.");
  const button = page.getByRole("button", { name: "Send message" });
  const status = page.locator("#contact-form-status");
  await button.click();
  await status.filter({ hasText: "HTTP 503" }).waitFor();
  await button.click();
  await status.filter({ hasText: "Check your connection" }).waitFor();
  assert.equal(await page.locator("#contact-message").inputValue(), "Please keep this draft if the service is offline.");
  await page.locator("#contact-website").evaluate(el => { el.value = "spam"; });
  await button.click();
  assert.equal(requests, 2);
  await page.locator("#contact-website").evaluate(el => { el.value = ""; });
  await button.click();
  await page.waitForFunction(() => document.querySelector("#contact-form").getAttribute("aria-busy") === "true");
  assert.ok(await page.getByRole("button", { name: "Sending…" }).isDisabled());
  await page.locator("#contact-form").evaluate(form => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
  assert.equal(requests, 3);
  finishRequest();
  await status.filter({ hasText: "Message submitted" }).waitFor();
  assert.equal(await page.locator("#contact-form").getAttribute("aria-busy"), null);
  await context.close();
});

test("experience shows the completed internship and a project playground", async () => {
  for (const width of [1440, 390]) {
    const { context, page } = await openPage({ viewport: { width, height: 1000 } }, false, "#experience");
    const internship = page.locator(".role-card").filter({ has: page.locator("#experience-studify-title") });
    assert.equal(await internship.locator(".role-period").textContent(), "Mar 2026–Aug 2026");
    assert.equal(await internship.locator(".role-status").textContent(), "Completed internship");
    assert.equal(await page.getByText("More to come", { exact: true }).count(), 0);
    assert.ok(await page.locator("#experience-playground-title").isVisible());
    await noOverflow(page);
    await page.locator('.experience-playground a[href="#projects"]').click();
    assert.ok(await page.locator("#projects").isVisible());
    await context.close();
  }
});

test("Home ends at Explore my work; other sections open as independent framed views", async () => {
  const { context, page } = await openPage({ viewport: { width: 1440, height: 1000 } });
  assert.equal(await page.locator("main > section:visible").count(), 1);
  assert.ok(await page.locator("#home").isVisible());
  assert.equal(await page.locator("#site-footer").isVisible(), false);
  assert.equal(await page.locator(".hero-bottom, .marquee").count(), 0);
  assert.equal(await page.locator(".hero-actions a").count(), 1);
  assert.equal(await page.locator(".view-frame").evaluate(el => getComputedStyle(el).borderTopStyle), "dashed");
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  await page.locator(".hero-actions a").click();
  assert.ok(await page.locator("#projects").isVisible());
  assert.equal(await page.locator("#home").isVisible(), false);
  assert.equal(await page.locator('nav a[href="#projects"]').getAttribute("aria-current"), "page");
  for (const id of ["about", "academics", "experience", "skills", "dsa", "github", "certificates", "contact", "home"]) {
    await goView(page, id);
    assert.equal(await page.locator("main > section:visible").count(), 1);
    assert.ok(await page.locator(`#${id}`).isVisible());
    await noOverflow(page);
  }
  await page.goBack();
  assert.ok(await page.locator("#contact").isVisible());
  await page.goForward();
  assert.ok(await page.locator("#home").isVisible());
  await page.goto(url + "#skills");
  assert.ok(await page.locator("#skills").isVisible());
  assert.equal(await page.title(), "Skills — Vishal Kushwaha");
  await page.reload();
  assert.ok(await page.locator("#skills").isVisible());
  await page.goto(url + "#unknown");
  assert.ok(await page.locator("#home").isVisible());
  await context.close();
});

test("desktop project filtering, scroll animation, and public GitHub sync", async () => {
  const { context, page } = await openPage({ viewport: { width: 1440, height: 1000 } }, false, "#projects");
  assert.equal(await page.locator(".project-card").count(), 10);
  await page.locator('[data-filter="Systems"]').click();
  assert.equal(await page.locator(".project-card").count(), 1);
  assert.equal(await page.locator(".project-info h3").textContent(), "CPU Scheduler Pro");
  await page.locator('[data-filter="All work"]').click();
  await page.evaluate(() => {
    const el = document.querySelector(".project-scroll");
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + el.offsetHeight * 0.42, behavior: "instant" });
  });
  await page.waitForFunction(() => document.querySelector(".project-info h3").textContent !== "AgriVerse");
  assert.equal(await page.locator('.project-card[aria-hidden="false"]').count(), 1);
  await page.screenshot({ path: "test-results/desktop-projects.png" });
  await goView(page, "github");
  await page.locator(".github-sync").filter({ hasText: "SYNCED WITH GITHUB" }).waitFor();
  assert.equal(await page.locator("#repo-count").textContent(), "23");
  assert.equal(await page.locator("#repo-list a").count(), 3);
  await noOverflow(page);
  await context.close();
});

test("mobile views, menu, filters, contact, and clipboard failure", async () => {
  const { context, page } = await openPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await noOverflow(page);
  assert.equal(await page.locator("#navigation").isVisible(), false);
  await page.screenshot({ path: "test-results/mobile-hero.png", fullPage: true });
  await goView(page, "projects");
  assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "false");
  assert.ok(await page.locator(".project-scroll").evaluate(el => el.classList.contains("static-projects")));
  for (const [category, count] of [["Web", 2], ["Mobile", 3], ["AI & ML", 4], ["Systems", 1], ["All work", 10]]) {
    await page.locator(`[data-filter="${category}"]`).click();
    assert.equal(await page.locator(".project-card").count(), count);
    await noOverflow(page);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "test-results/mobile-projects.png" });
  await goView(page, "contact");
  assert.ok(await page.locator('a[href="tel:+918726730327"]').isVisible());
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("denied")) }, configurable: true }));
  await page.locator("#copy-email").click();
  await page.locator("#copy-status").filter({ hasText: "Copy unavailable" }).waitFor();
  await context.close();
});

test("reduced-motion project view and offline GitHub fallback", async () => {
  const { context, page } = await openPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" }, true, "#projects");
  assert.equal(await page.locator('.project-card[aria-hidden="true"]').count(), 0);
  assert.ok(await page.locator(".mobile-project-details").first().isVisible());
  assert.equal(await page.locator(".orbital-sculpture").evaluate(el => getComputedStyle(el).animationName), "none");
  await noOverflow(page);
  await goView(page, "github");
  await page.locator(".github-sync").filter({ hasText: "PROFILE SNAPSHOT" }).waitFor();
  assert.equal(await page.locator("#repo-count").textContent(), "23");
  await context.close();
});

test("dark theme follows system, persists a toggle, and works without storage", async () => {
  const { context, page } = await openPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "dark" });
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  assert.equal(await page.locator('#theme-toggle').getAttribute('aria-pressed'), 'true');
  await page.screenshot({ path: 'test-results/dark-home.png' });
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await goView(page, 'experience');
  assert.equal(await page.locator('.role-card').count(), 2);
  assert.equal(await page.locator('.role-certificate').count(), 2);
  assert.equal(await page.locator('.role-certificate a').count(), 0);
  await page.screenshot({ path: 'test-results/dark-experience.png', fullPage: true });
  await noOverflow(page);
  await goView(page, 'dsa');
  assert.equal((await page.locator('.dsa-board > strong').textContent()).trim(), '260+');
  assert.equal(await page.locator('a[href="https://leetcode.com/u/Vishalsnghkush31/"]').count(), 1);
  assert.ok(await page.locator('.dsa-board > p').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 18));
  await page.screenshot({ path: 'test-results/dark-dsa.png' });
  await context.close();
  const blockedContext = await browser.newContext({ colorScheme: 'light', viewport: { width: 390, height: 844 } });
  await blockedContext.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } }));
  const blocked = await blockedContext.newPage();
  await blocked.route('https://api.github.com/**', r => r.abort());
  await blocked.goto(url);
  await blocked.emulateMedia({ colorScheme: 'dark' });
  await blocked.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  await blocked.getByRole('button', { name: 'Switch to light theme' }).click();
  assert.equal(await blocked.locator('html').getAttribute('data-theme'), 'light');
  await blockedContext.close();
});

test("all framed views fit small phone, tablet, and desktop widths", async () => {
  for (const width of [320, 360, 650, 768, 900, 1024]) {
    const { context, page } = await openPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    for (const id of ["home", "about", "academics", "experience", "skills", "projects", "dsa", "github", "certificates", "contact"]) {
      await goView(page, id);
      await noOverflow(page);
    }
    await context.close();
  }
});
