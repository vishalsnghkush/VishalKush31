import "./style.css";
import { projects } from "./projects.js";
import { experienceView } from "./experience.js";
import "./experience.css";
import "./theme.css";
import "./typography.css";
import { setupTheme } from "./theme.js";
import { contactFormMarkup, setupContactForm } from "./contact.js";

const github = "https://github.com/vishalsnghkush";
const linkedin = "https://www.linkedin.com/in/vishal-kushwaha-253891275/";
const email = "vishalsnghkush31@gmail.com";
const leetcode = "https://leetcode.com/u/Vishalsnghkush31/";
const resume = "https://drive.google.com/file/d/1bD52DZPibzIIgjYtEWanllf5yxwSut1h/view?usp=sharing";
const icons = {
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  down: '<path d="M12 4v16m-7-7 7 7 7-7"/>',
  github:
    '<path d="M9 19c-4 1-4-2-6-2m12 4v-4a3.5 3.5 0 0 0-1-3c3-.3 6-1.5 6-5a4 4 0 0 0-1-3 4 4 0 0 0-.1-3S17.7 2.7 15 4a11 11 0 0 0-6 0C6.3 2.7 5.1 3 5.1 3A4 4 0 0 0 5 6a4 4 0 0 0-1 3c0 3.5 3 4.7 6 5a3.5 3.5 0 0 0-1 3v4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20"/>',
  phone:
    '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
const external = (href, text, cls = "") =>
  `<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${text}${icon("arrow")}</a>`;
const label = (number, text) =>
  `<p class="section-label"><span>${number} /</span> ${text}</p>`;
const tags = (stack) => stack.map((t) => `<span>${t}</span>`).join("");
const navigation = [
  ["home", "Home"],
  ["about", "About"],
  ["academics", "Academics"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["dsa", "DSA"],
  ["github", "GitHub"],
  ["certificates", "Certificates"],
  ["contact", "Contact"],
];

function projectArt(p) {
  if (p.screenshots?.length) {
    const first = p.screenshots[0];
    return `<div class="project-screenshots"><a class="project-screenshot-link" href="${first.src}" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.name} screenshot at full size"><img class="project-screenshot" src="${first.src}" alt="${first.alt}" width="1567" height="803" decoding="async"></a>${p.screenshots.length > 1 ? `<div class="screenshot-controls" role="group" aria-label="${p.name} screenshots">${p.screenshots.map((shot, i) => `<button type="button" data-screenshot="${i}" aria-pressed="${i === 0}">${shot.label}</button>`).join("")}</div>` : ""}</div>`;
  }
  const shell = (content) =>
    `<div class="study-window"><div class="window-bar"><span class="window-dots">● ● ●</span><span>${p.name.toLowerCase().replaceAll(" ", "")} / workspace</span><span>↗</span></div>${content}</div>`;
  if (p.visual === "agri")
    return shell(
      `<div class="agri-ui"><aside><strong>agri<span>verse.</span></strong><i>◈ &nbsp; Overview</i><i>⌁ &nbsp; Crop health</i><i>☀ &nbsp; Weather</i><i>◷ &nbsp; Insights</i><div class="mini-leaf">✳</div></aside><div class="agri-content"><small>YOUR FARM, CONNECTED</small><h4>Good things<br>take <em>growing.</em></h4><div class="plant-illustration"><div class="stem"></div><b></b><b></b><b></b><b></b></div><div class="mini-stats"><div>☀<span>Weather insights</span></div><div>✳<span>Plant diagnosis</span></div></div><div class="mini-chart">${[30, 50, 43, 70, 60, 83, 73, 94, 85, 100, 90, 116].map((h) => `<i style="height:${h}%"></i>`).join("")}</div></div></div>`,
    );
  if (p.visual === "mobile")
    return `<div class="phone-art"><span class="art-orbit orbit-one"></span><span class="art-orbit orbit-two"></span><div class="phone-device"><div class="phone-notch"></div><div class="phone-screen"><div class="phone-top">9:41 <span>••• ▰</span></div><small>${p.id === "agriverse-mobile" ? "YOUR FARMING COMPANION" : "LEARN SOMETHING NEW"}</small><h4>${p.id === "agriverse-mobile" ? "A little care.<br>A greener tomorrow." : "Big ideas.<br>Small steps."}</h4><div class="course-art">${p.id === "agriverse-mobile" ? "✳" : "✺"}</div><strong>${p.id === "agriverse-mobile" ? "Your farm at a glance" : "Continue your journey"}</strong><div class="phone-course"><span>01</span><div>${p.id === "agriverse-mobile" ? "Crop health" : "Explore your courses"}<i></i></div>↗</div><div class="phone-course"><span>02</span><div>${p.id === "agriverse-mobile" ? "Weather & advice" : "Practice & assessments"}<i></i></div>↗</div><div class="phone-nav">⌂ <span>▦</span> ◷ ◉</div></div></div><span class="floating-note">Made for the everyday. ↗</span></div>`;
  if (p.visual === "learn" || p.visual === "adapt")
    return shell(
      `<div class="learning-ui"><div class="learning-top"><strong>${p.visual === "adapt" ? "adaptly" : "precisionprep"}<span>✳</span></strong><span>YOUR LEARNING SPACE</span></div><div class="learning-body"><span class="mini-pill">${p.visual === "adapt" ? "A PATH THAT FITS YOU" : "PRACTICE WITH PURPOSE"}</span><h4>${p.visual === "adapt" ? "Your next chapter,<br>mapped out." : "Less guessing.<br>More understanding."}</h4><div class="learning-road"><span>01<br><small>Discover</small></span><i></i><span>02<br><small>Practice</small></span><i></i><span>03<br><small>Grow</small></span></div><div class="learning-box"><span>✧</span><div><strong>${p.visual === "adapt" ? "Your personalized roadmap" : "Your next practice session"}</strong><p>One step closer to what comes next.</p></div><b>↗</b></div></div></div>`,
    );
  if (p.visual === "cpu")
    return shell(
      `<div class="cpu-ui"><div class="learning-top"><strong>cpu<span> / scheduler</span></strong><span>SIMULATION WORKSPACE</span></div><h4>Every process.<br>In its own time.</h4><div class="cpu-tabs"><span>Round Robin</span><span>FCFS</span><span>SJF</span></div><div class="gantt">${["P1", "P2", "P3", "P1", "P4", "P2"].map((s, i) => `<span style="--block:${i}">${s}</span>`).join("")}</div><div class="gantt-scale">0 <span>4</span><span>8</span><span>12</span><span>16</span><span>20</span></div><div class="cpu-bottom"><span>⌁ &nbsp; Visualize algorithms</span><span>◷ &nbsp; Compare performance</span></div></div>`,
    );
  if (p.visual === "retina")
    return shell(
      `<div class="retina-ui"><div class="learning-top"><strong>retina<span> / research</span></strong><span>EXPERIMENTAL PROTOTYPE</span></div><div class="retina-body"><div class="retina-eye"><svg viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="#edb9b2" stroke-width="2"><path d="M110 95 70 65 30 60m40 5-5-35m45 65 45-35 30-5m-30 5 5-40m-50 75-25 40-45 25m45-25 5 50m20-90 40 30 35 40m-35-40 30-10M110 95l-5-60m5 60-70 10-25 30m95-40 15 70 25 25"/></g><circle cx="110" cy="95" r="12" fill="#ffdba2"/></svg></div><div><small>COMPUTER VISION × PHYSICS</small><h4>A closer look.<br>A bigger picture.</h4><p>Vessel segmentation<br>Hemodynamic modelling<br>Research-led exploration</p></div></div></div>`,
    );
  if (p.visual === "map")
    return shell(
      `<div class="map-ui"><div class="learning-top"><strong>indoor<span> / navigator</span></strong><span>FIND YOUR WAY</span></div><div class="floor-map"><div></div><div></div><div></div><div></div><div></div><div></div><svg viewBox="0 0 500 200" aria-hidden="true"><path d="M80 150h120V55h180v90" fill="none" stroke="#9b4263" stroke-width="5" stroke-dasharray="9 7"/><circle cx="80" cy="150" r="9" fill="#9b4263"/><circle cx="380" cy="145" r="12" fill="#9b4263"/></svg></div><div class="map-caption">You are here <span>◎</span> Somewhere new awaits.</div></div>`,
    );
  return shell(
    `<div class="data-ui"><div class="learning-top"><strong>${p.id.includes("amazon") ? "entity" : "weather"}<span> / intelligence</span></strong><span>FROM DATA TO INSIGHT</span></div><h4>Find the signal.<br>Make it meaningful.</h4><div class="data-chart">${[38, 55, 42, 64, 51, 80, 68, 91, 77, 98, 83, 110, 99, 120, 106, 130].map((n, i) => `<i style="height:${n}px;--bar:${i}"></i>`).join("")}</div><div class="data-bottom"><span>Explore</span><span>Understand</span><span>Connect the dots ↗</span></div></div>`,
  );
}

const skills = [
  [
    "01",
    "The languages",
    "How I think in code.",
    ["Python", "JavaScript", "TypeScript", "C", "C++", "HTML & CSS"],
  ],
  [
    "02",
    "The interfaces",
    "From browser to pocket.",
    ["React", "Next.js", "React Native", "Expo", "Capacitor", "Tailwind CSS", "Redux Toolkit", "React Native SVG", "Chart.js", "Vite"],
  ],
  [
    "03",
    "The intelligence",
    "Making data do more.",
    ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "Computer Vision", "SciPy", "scikit-image", "NetworkX", "RapidFuzz", "LightGBM", "XGBoost", "Matplotlib"],
  ],
  [
    "04",
    "The foundations",
    "Everything underneath.",
    ["Flask", "FastAPI", "PostgreSQL", "MySQL", "Turso", "Firebase", "Drizzle ORM", "Git & GitHub", "Docker"],
  ],
];

document.querySelector("#app").innerHTML = `
  <header class="site-header">
    <a class="wordmark" href="#home" aria-label="Vishal, back to home">v<span>.</span></a>
    <nav id="navigation" aria-label="Main navigation">${navigation.map(([id, text]) => `<a href="#${id}" ${id === "home" ? 'class="active" aria-current="location"' : ""}>${text}</a>`).join("")}</nav>
    <a class="header-contact" href="mailto:${email}" aria-label="Email Vishal">Let's talk ${icon("arrow")}</a>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch to dark theme" aria-pressed="false"><span class="theme-toggle-icon" aria-hidden="true">☾</span><span class="theme-toggle-label">Dark</span></button>
    <button class="menu-toggle" aria-controls="navigation" aria-expanded="false" aria-label="Open navigation">${icon("menu")}</button>
  </header>
  <main id="main" class="view-frame">
    <section class="hero" id="home" aria-labelledby="hero-title">
      <div class="hero-meta"><span>THE PERSONAL SPACE OF A CURIOUS BUILDER</span><span class="availability"><i></i> OPEN TO CONVERSATIONS</span></div>
      <div class="hero-layout">
        <div class="hero-copy"><p class="hello">Hey there, I'm ${icon("sun")}</p><h1 id="hero-title">VISHAL<br><span>KUSHWAHA<span class="name-dot">.</span></span></h1><div class="hero-intro"><span class="small-star" aria-hidden="true">✳</span><p>I turn <em>“what if”</em> into <strong>“it works.”</strong><br>Building for the web, for your pocket,<br>and for a slightly smarter world.</p></div><div class="hero-actions"><a class="button button-dark" href="#projects">Explore my work ${icon("arrow")}</a></div></div>
        <div class="hero-art" aria-label="Abstract pink orbital sculpture"><div class="art-grid"></div><span class="art-coordinate coordinate-top">FIG. 01 — ALWAYS IN ORBIT</span><div class="orbital-sculpture"><div class="sculpture-shadow"></div><div class="sculpture-orbit orbit-a"></div><div class="sculpture-orbit orbit-b"></div><div class="sculpture-orbit orbit-c"></div><div class="sculpture-core"></div><span class="orbital-spark">✦</span></div><div class="floating-tag tag-code">${icon("code")} CODE. CREATE. REPEAT.</div><div class="floating-tag tag-curiosity"><span>↗</span> Powered by curiosity.</div><span class="art-coordinate coordinate-bottom">WEB / MOBILE / APPLIED AI</span><svg class="art-scribble" width="110" height="65" viewBox="0 0 110 65" aria-hidden="true"><path d="M4 13C45-10 102 5 85 30S30 70 45 40s60-13 55 10m-9-8 9 8 6-11" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div>
      </div>

    </section>

    <section class="about section-pad" id="about" aria-labelledby="about-title">
      ${label("01", "THE PERSON BEHIND THE PIXELS")}
      <div class="about-grid"><div><h2 id="about-title">A little logic.<br>A lot of <em>curiosity.</em></h2><div class="about-note"><span>✳</span> More than a job title.<br>Always a work in progress.</div></div><div class="about-copy"><p class="large-copy">I'm Vishal — a developer who likes connecting the dots between <span>good ideas and useful software.</span></p><p>I'm studying Computer Science & Engineering (AI & ML) at the University of Delhi, and previously built mobile experiences as a Mobile App Developer Intern at StudifySuccess.</p><p>My projects take me from crop-health tools and learning platforms to computer vision and operating-system simulators. Different problems. The same instinct: understand it, build it, make it better.</p><a class="text-link" href="${linkedin}" target="_blank" rel="noopener noreferrer">The professional side of me ${icon("arrow")}</a></div></div>
      <div class="about-stats"><div><strong>10<span>↗</span></strong><p>PROJECTS TO EXPLORE</p></div><div><strong>3<span>+</span></strong><p>WORLDS: WEB, MOBILE, AI</p></div><div><strong>260<span>+</span></strong><p>LEETCODE PROBLEMS</p></div><div class="stat-note">Not just learning<br>the tools. <em>Putting<br>them to work.</em></div></div>
    </section>
    <section class="academics section-pad" id="academics" aria-labelledby="academic-title">${label("02", "THE FOUNDATION")}<div class="section-heading"><h2 id="academic-title">Learning with <em>intent.</em></h2><span class="handwritten">and building along the way ↘</span></div><div class="education-card"><div class="education-mark" aria-hidden="true">DU<span>EST. 1922</span></div><div class="education-main"><span class="mini-pill">2024 — 2028 · PURSUING</span><h3>B.Tech, Computer Science & Engineering</h3><p>Artificial Intelligence & Machine Learning</p><span>Faculty of Technology, University of Delhi</span></div><div class="education-score"><strong>8.55<span>/10</span></strong><p>CGPA · PROFILE-LISTED¹</p></div></div><div class="experience-line"><span class="status-dot"></span><p><strong>Learning in the real world, too.</strong> Former Mobile App Developer Intern at StudifySuccess · React Native</p>${external(linkedin, "View profile")}</div></section>
    ${experienceView}
    <section class="skills section-pad" id="skills" aria-labelledby="skills-title">${label("04", "MY EVER-EVOLVING TOOLBOX")}<div class="section-heading"><h2 id="skills-title">The right tools.<br>The <em>builder's mindset.</em></h2><p>From the first idea to the last commit.<br>Here's what I build with.</p></div><div class="skills-grid">${skills.map(([n, title, subtitle, list]) => `<article class="skill-card"><span class="skill-number">${n} /</span><h3>${title}</h3><p>${subtitle}</p><div class="skill-tags">${tags(list)}</div></article>`).join("")}</div></section>
    <section class="projects-section" id="projects" aria-labelledby="projects-title"><div class="projects-heading section-pad">${label("05", "LESS TALK. MORE THINGS BUILT.")}<div class="section-heading"><h2 id="projects-title">Selected <em>work.</em><span class="project-count">(10)</span></h2><p>A collection of experiments, collaborations,<br>and ideas that made it out of my head.</p></div><div class="project-toolbar"><div class="project-filters" role="group" aria-label="Filter projects">${["All work", "Web", "Mobile", "AI & ML", "Systems"].map((s, i) => `<button data-filter="${s}" aria-pressed="${i === 0}">${s}${i === 0 ? " <span>10</span>" : ""}</button>`).join("")}</div><span class="scroll-hint">SCROLL TO UNFOLD ${icon("down")}</span></div></div><div class="project-scroll"><div class="project-sticky"><div class="project-info" aria-live="polite"></div><div class="project-deck" aria-label="Project gallery"></div></div></div><div class="projects-end"><span>THAT'S THE COLLECTION. MORE IDEAS ARE BREWING.</span>${external(github + "?tab=repositories", "Dig into the code")}</div></section>
    <section class="dsa section-pad" id="dsa" aria-labelledby="dsa-title">${label("06", "A LITTLE BETTER, EVERY PROBLEM")}<div class="dsa-grid"><div><h2 id="dsa-title">Behind the build,<br>there's the <em>thinking.</em></h2><p>Good software starts with good problem solving. I keep sharpening the fundamentals — one algorithm, one edge case, one better approach at a time.</p><div class="dsa-profile-links">${external(leetcode, "Visit my LeetCode", "button button-dark")}</div></div><div class="dsa-board"><div class="board-top"><span>THE PROBLEM-SOLVING SIDE</span>${icon("code")}</div><strong>260<span>+</span></strong><p>LeetCode problems solved</p><div class="board-tags">${tags(["Data structures", "Algorithms", "C++", "Python"])}</div><div class="board-achievement"><span>↗</span><p><strong>2nd Runner-Up</strong><br>Offline Competitive Programming Contest · DU¹</p></div></div></div></section>
    <section class="github-section section-pad" id="github" aria-labelledby="github-title">${label("07", "IN THE OPEN")}<div class="section-heading"><h2 id="github-title">The work continues<br><em>on GitHub.</em></h2>${external(github, "Meet me on GitHub", "button button-dark")}</div><div class="github-panel"><div class="github-identity">${icon("github")}<span>@vishalsnghkush</span><span class="github-sync" role="status">PUBLIC PROFILE</span></div><div class="github-body"><div class="github-metric"><strong id="repo-count">23</strong><span>PUBLIC REPOSITORIES</span><p>Projects, practice, and the occasional<br>“let's see if this works.”</p></div><div class="repo-list" id="repo-list">${projects
      .filter((p) => p.repo.startsWith(github))
      .slice(0, 3)
      .map(
        (p) =>
          `<a href="${p.repo}" target="_blank" rel="noopener noreferrer"><div>${icon("code")}<span>${p.repo.split("/").pop()}<small>${p.stack[0]}</small></span></div>${icon("arrow")}</a>`,
      )
      .join(
        "",
      )}</div></div><div class="github-activity" aria-labelledby="github-activity-title"><div class="github-activity-heading"><div><h3 id="github-activity-title">A year of building.</h3><p>GitHub contributions over the past 12 months — commits, pull requests, and more.</p></div>${external(github + "?tab=overview", "View activity", "text-link")}</div><div class="github-activity-scroll" tabindex="0" role="region" aria-label="Past-year GitHub contribution graph; scroll horizontally on smaller screens"><img id="github-activity-chart" src="https://ghchart.rshah.org/94556d/vishalsnghkush" alt="Vishal Kushwaha’s GitHub contribution calendar for the past year" width="722" height="112" decoding="async" referrerpolicy="no-referrer"></div><p id="github-activity-status" role="status">Loading contribution graph…</p><p class="github-activity-note">Public contribution calendar via GHChart. Counts reflect contributions, not commits alone.</p></div><div class="github-foot"><span>✳ GSSoC '25 open-source contributor¹</span><span id="github-source">Snapshot from public GitHub profile · Nov 2026</span></div></div></section>
    <section class="certificates section-pad" id="certificates" aria-labelledby="cert-title">${label("08", "STAYING A STUDENT")}<div class="section-heading"><h2 id="cert-title">Always room to <em>grow.</em></h2><p>A few stops on the learning journey.<br>Open a certificate to see the original.</p></div><div class="cert-list">${[
      ["01", "DSA in C++", "PW", "PROBLEM SOLVING"],
      ["02", "Data Science", "GeeksforGeeks", "DATA & ANALYTICS", "Data_Science.jpg"],
      ["03", "IBM AI Fundamentals", "IBM", "ARTIFICIAL INTELLIGENCE", "IBM.jpg"],
      ["04", "Quantum Computing", "CDAC", "EXPLORING WHAT’S NEXT", "Quantum_Computing.jpg"],
    ]
      .map(
        ([n, title, issuer, cat, file]) =>
          `<article class="certificate"><span>${n}</span><h3>${title}<small>${issuer}</small></h3><span class="cert-category">${cat}</span>${file ? `<a class="cert-link" href="${import.meta.env.BASE_URL}certificates/${file}" target="_blank" rel="noopener noreferrer" aria-label="View ${title} certificate (opens in a new tab)"><span>View certificate</span>${icon("arrow")}</a>` : '<span class="cert-symbol" aria-hidden="true">✧</span>'}</article>`,
      )
      .join(
        "",
      )}</div><div class="internship-certificates"><h3>Internship documents</h3><p>My StudifySuccess internship certificate, Best Intern recognition, and letter of recommendation.</p><a class="text-link" href="#experience">Explore my experience ${icon("arrow")}</a></div></section>
    <section class="contact section-pad" id="contact" aria-labelledby="contact-title"><div class="contact-top">${label("09", "GOOD THINGS START WITH A HELLO")}<span class="availability"><i></i> LET'S MAKE SOMETHING GOOD</span></div><h2 id="contact-title">HAVE A GOOD IDEA?<br>LET'S <em>talk.</em><a class="contact-arrow" href="mailto:${email}" aria-label="Start an email to Vishal">${icon("arrow")}</a></h2>${contactFormMarkup()}<div class="contact-bottom"><div class="contact-email"><a href="mailto:${email}">${email}</a><button id="copy-email" aria-label="Copy email address">${icon("copy")}</button><span id="copy-status" role="status"></span><p>A project, an opportunity, or just a hello.<br>My inbox is a pretty good place to start.</p></div><div class="contact-links">${external(linkedin, "LinkedIn")}${external(github, "GitHub")}<a href="tel:+918726730327">+91 87267 30327 ${icon("phone")}</a>${external(resume, "View résumé")}</div></div></section>
  </main>
  <footer id="site-footer"><a class="footer-logo" href="#home">vishal<span>.</span></a><p>BUILT WITH INTENT. AND A LITTLE TOO MUCH CURIOSITY.</p><span>© ${new Date().getFullYear()} VISHAL KUSHWAHA</span><a href="#home" class="back-top" aria-label="Back to top">↑</a></footer>
`;

setupTheme();
setupContactForm();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktop = window.matchMedia("(min-width: 901px)");
let visibleProjects = [...projects];
let activeIndex = -1;
let framePending = false;
const scrollArea = document.querySelector(".project-scroll");
const info = document.querySelector(".project-info");
const deck = document.querySelector(".project-deck");

function projectDetails(p, i) {
  return `<span class="project-position">${String(i + 1).padStart(2, "0")} <span>/ ${String(visibleProjects.length).padStart(2, "0")}</span></span><p class="project-eyebrow">${p.eyebrow}</p><h3>${p.name}</h3><p class="project-description">${p.description}</p><div class="project-tech">${tags(p.stack)}</div><div class="project-links">${p.live ? external(p.live, p.live.includes("play.google") ? "View on Google Play" : "Visit project", "button button-dark") : ""}${external(p.repo, icon("github") + " Source code", "project-source")}</div><div class="project-progress" aria-hidden="true">${visibleProjects.map((_, j) => `<span class="${i === j ? "on" : ""}"></span>`).join("")}</div>`;
}
function renderProjects() {
  activeIndex = -1;
  scrollArea.style.setProperty("--project-count", visibleProjects.length);
  deck.innerHTML = visibleProjects
    .map(
      (p, i) =>
        `<article class="project-card" style="--card-color:${p.color};--card-index:${i}" data-project="${p.id}" aria-label="${p.name}"><div class="card-topline"><span>${String(i + 1).padStart(2, "0")} / ${p.category.toUpperCase()}</span><span>${p.screenshots?.length ? "REAL PROJECT ↗" : "DESIGN STUDY ↗"}</span></div><div class="project-art">${projectArt(p)}</div><div class="card-footer"><strong>${p.name}</strong><span>${p.stack.slice(0, 2).join(" / ")}</span></div><p class="art-disclaimer">${p.screenshots?.length ? "Original project screenshots · click image to view full size" : "Illustrative interface study — not a product screenshot"}</p><div class="mobile-project-details">${projectDetails(p, i)}</div></article>`,
    )
    .join("");
  updateProjects();
}
function updateProjects() {
  if (document.getElementById("projects").hidden) return;
  const height = window.innerHeight;
  const rect = scrollArea.getBoundingClientRect();
  const isStack = desktop.matches && !reducedMotion.matches;
  scrollArea.classList.toggle("static-projects", !isStack);
  const travel = Math.max(1, scrollArea.offsetHeight - (height - 90));
  const progress = isStack
    ? Math.max(
        0,
        Math.min(
          visibleProjects.length - 1,
          ((-rect.top + 90) / travel) * (visibleProjects.length - 1),
        ),
      )
    : 0;
  const index = Math.min(
    visibleProjects.length - 1,
    Math.floor(progress + 0.35),
  );
  if (index !== activeIndex) {
    activeIndex = index;
    info.innerHTML = projectDetails(visibleProjects[index], index);
  }
  deck.querySelectorAll(".project-card").forEach((card, i) => {
    const delta = i - progress;
    if (isStack) {
      const past = Math.max(0, -delta);
      const ahead = Math.max(0, delta);
      card.style.transform = `translate3d(${past * -55}px, ${past * -660 + Math.min(ahead, 3) * 17}px, 0) rotate(${past * -8 + Math.min(ahead, 3) * 2.2}deg) scale(${1 - Math.min(ahead, 3) * 0.035})`;
      card.style.opacity = delta < -0.9 || delta > 3 ? "0" : "1";
      card.style.visibility = delta < -1.3 || delta > 3 ? "hidden" : "visible";
      card.setAttribute("aria-hidden", String(i !== index));
      card.inert = i !== index;
    } else {
      card.style.removeProperty("transform");
      card.style.removeProperty("opacity");
      card.style.removeProperty("visibility");
      card.removeAttribute("aria-hidden");
      card.inert = false;
    }
  });
}
renderProjects();
deck.addEventListener("click", (event) => {
  const button = event.target.closest("[data-screenshot]");
  if (!button) return;
  const card = button.closest("[data-project]");
  const project = projects.find((p) => p.id === card.dataset.project);
  const shot = project.screenshots[Number(button.dataset.screenshot)];
  const image = card.querySelector(".project-screenshot");
  image.src = shot.src;
  image.alt = shot.alt;
  card.querySelector(".project-screenshot-link").href = shot.src;
  card.querySelectorAll("[data-screenshot]").forEach((control) => {
    control.setAttribute("aria-pressed", String(control === button));
  });
});
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    visibleProjects =
      category === "All work"
        ? [...projects]
        : projects.filter((p) => p.category === category);
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    renderProjects();
  }),
);
function requestUpdate() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => {
    updateProjects();
    framePending = false;
  });
}
window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", requestUpdate);
reducedMotion.addEventListener("change", requestUpdate);
desktop.addEventListener("change", requestUpdate);

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("is-open");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  nav.classList.toggle("is-open", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
    if (nav.contains(document.activeElement)) menu.focus();
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".site-header")) closeMenu();
});

const navLinks = [...nav.querySelectorAll("a")];
const sections = navigation.map(([id]) => document.getElementById(id));
const viewNames = new Map(navigation);

function showView({ focus = false } = {}) {
  const requested = location.hash.slice(1) || "home";
  const id = viewNames.has(requested) ? requested : "home";
  if (requested !== id) history.replaceState(null, "", "#" + id);
  sections.forEach(section => { section.hidden = section.id !== id; });
  document.getElementById("site-footer").hidden = id === "home";
  document.body.dataset.view = id;
  navLinks.forEach(a => {
    const active = a.hash === "#" + id;
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = id === "home"
    ? "Vishal Kushwaha — Developer & Curious Builder"
    : `${viewNames.get(id)} — Vishal Kushwaha`;
  closeMenu();
  window.scrollTo({ top: 0, behavior: "instant" });
  if (id === "projects") updateProjects();
  if (focus) {
    const heading = document.getElementById(id).querySelector("h1, h2");
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

// Hash-based views work on static hosts, including deep links and browser history.
document.addEventListener("click", e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const id = link.hash.slice(1);
  if (!viewNames.has(id)) return;
  e.preventDefault();
  if (location.hash !== link.hash) history.pushState(null, "", link.hash);
  showView({ focus: true });
});
window.addEventListener("hashchange", () => showView({ focus: true }));
showView();

let copyTimer;
document.querySelector("#copy-email").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = "Copied!";
  } catch {
    status.textContent =
      "Copy unavailable — select the email or tap to email me.";
  }
  copyTimer = setTimeout(() => {
    status.textContent = "";
  }, 4500);
});

const activityChart = document.querySelector("#github-activity-chart");
const activityStatus = document.querySelector("#github-activity-status");
function updateActivityChart() {
  const loaded = activityChart.naturalWidth > 0;
  activityChart.hidden = !loaded;
  activityStatus.hidden = loaded;
  if (!loaded) {
    activityStatus.textContent = "Contribution graph unavailable right now. Use View activity to see the calendar on GitHub.";
  }
}
activityChart.addEventListener("load", updateActivityChart);
activityChart.addEventListener("error", updateActivityChart);
if (activityChart.complete) updateActivityChart();

// Keep a useful, linked snapshot visible if GitHub is offline or rate-limited.
async function syncGithub() {
  try {
    const signal = AbortSignal.timeout(7000);
    const [profileResponse, repoResponse] = await Promise.all([
      fetch("https://api.github.com/users/vishalsnghkush", { signal }),
      fetch(
        "https://api.github.com/users/vishalsnghkush/repos?sort=pushed&per_page=3",
        { signal },
      ),
    ]);
    if (!profileResponse.ok || !repoResponse.ok)
      throw new Error("GitHub unavailable");
    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    if (!Number.isInteger(profile.public_repos) || !Array.isArray(repos))
      throw new Error("Unexpected GitHub response");
    document.querySelector("#repo-count").textContent = String(
      profile.public_repos,
    );
    const list = document.querySelector("#repo-list");
    list.replaceChildren();
    repos.forEach((repo) => {
      if (
        typeof repo.name !== "string" ||
        !repo.html_url?.startsWith(github + "/")
      )
        return;
      const a = document.createElement("a");
      a.href = repo.html_url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      const inner = document.createElement("div");
      inner.innerHTML = icon("code");
      const text = document.createElement("span");
      text.textContent = repo.name;
      const lang = document.createElement("small");
      lang.textContent = repo.language || "Repository";
      text.append(lang);
      inner.append(text);
      a.append(inner);
      a.insertAdjacentHTML("beforeend", icon("arrow"));
      list.append(a);
    });
    document.querySelector(".github-sync").textContent = "SYNCED WITH GITHUB";
    document.querySelector("#github-source").textContent =
      "Live public data · " +
      new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
  } catch {
    document.querySelector(".github-sync").textContent = "PROFILE SNAPSHOT";
  }
}
syncGithub();
