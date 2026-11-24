// Builds the ATS-friendly CV (EN + ES) as HTML and prints it to PDF with headless Chrome.
// Usage: node cv-src/build-cv.mjs   (from the project root)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const data = JSON.parse(readFileSync(join(here, "cv.json"), "utf8"));
const outDir = join(root, "public", "cv");
const htmlDir = join(here, "out");
mkdirSync(outDir, { recursive: true });
mkdirSync(htmlDir, { recursive: true });

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function html(d, c) {
  const contact = [
    esc(d.location),
    esc(c.phone),
    `<a href="mailto:${c.email}">${esc(c.email)}</a>`,
    `<a href="https://${c.linkedin}">${esc(c.linkedin)}</a>`,
    `<a href="https://${c.github}">${esc(c.github)}</a>`,
    `<a href="https://${c.site}">${esc(c.site)}</a>`,
  ].join(" &nbsp;|&nbsp; ");

  const skills = d.skills
    .map(([k, v]) => `<p class="skill"><strong>${esc(k)}:</strong> ${esc(v)}</p>`)
    .join("");

  const jobs = d.experience
    .map(
      (j) => `
    <div class="job">
      <div class="row"><h3>${esc(j.role)}</h3><span class="dates">${esc(j.dates)}</span></div>
      <div class="row sub"><span>${esc(j.company)}</span><span>${esc(j.where)}</span></div>
      <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    </div>`
    )
    .join("");

  const projects = d.projects
    .map(([n, t]) => `<li><strong>${esc(n)}</strong>: ${esc(t)}</li>`)
    .join("");

  const edu = d.education
    .map(
      ([deg, sch, yrs]) =>
        `<div class="row"><span><strong>${esc(deg)}</strong>, ${esc(sch)}</span><span class="dates">${esc(yrs)}</span></div>`
    )
    .join("");

  return `<!doctype html>
<html lang="${d.lang}">
<head>
<meta charset="utf-8">
<title>${esc(c.name)} | ${esc(d.title)}</title>
<meta name="author" content="${esc(c.name)}">
<meta name="keywords" content="AI Engineer, LLM, AI agents, Claude API, TypeScript, Next.js, Node.js, PostgreSQL, RAG, MCP">
<style>
  @page { size: Letter; margin: 0.5in 0.58in; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 9.6pt; line-height: 1.34; color: #111; margin: 0; }
  a { color: #111; text-decoration: none; }
  header { text-align: center; margin-bottom: 8pt; }
  h1 { font-size: 19pt; margin: 0; letter-spacing: 0.2pt; }
  .title { font-size: 10.6pt; font-weight: bold; margin: 3pt 0 4pt; color: #6e0112; }
  .contact { font-size: 8.8pt; color: #222; }
  h2 { font-size: 10.4pt; text-transform: uppercase; letter-spacing: 0.8pt; margin: 9pt 0 4pt; padding-bottom: 2pt; border-bottom: 1.2pt solid #ce0037; }
  h3 { font-size: 10pt; margin: 0; }
  p { margin: 0 0 3pt; }
  .skill { margin-bottom: 2.4pt; }
  .job { margin-bottom: 6pt; page-break-inside: auto; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .sub { font-style: italic; color: #333; margin-bottom: 2pt; }
  .dates { white-space: nowrap; font-weight: bold; }
  ul { margin: 2pt 0 0 0; padding-left: 13pt; }
  li { margin-bottom: 2.2pt; }
  .job li { page-break-inside: avoid; }
</style>
</head>
<body>
<header>
  <h1>${esc(c.name)}</h1>
  <div class="title">${esc(d.title)}</div>
  <div class="contact">${contact}</div>
</header>

<h2>${esc(d.h.summary)}</h2>
<p>${esc(d.summary)}</p>

<h2>${esc(d.h.skills)}</h2>
${skills}

<h2>${esc(d.h.experience)}</h2>
${jobs}

<h2>${esc(d.h.projects)}</h2>
<ul>${projects}</ul>

<h2>${esc(d.h.education)}</h2>
${edu}

<h2>${esc(d.h.languages)}</h2>
<p>${esc(d.languages)}</p>
</body>
</html>`;
}

for (const key of ["en", "es"]) {
  const d = data[key];
  const htmlPath = join(htmlDir, `${d.file}.html`);
  writeFileSync(htmlPath, html(d, data.contact));
  const pdfPath = join(outDir, `${d.file}.pdf`);
  execFileSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--user-data-dir=${join(htmlDir, ".chrome")}`,
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ], { stdio: "ignore" });
  console.log("PDF", pdfPath);
}
