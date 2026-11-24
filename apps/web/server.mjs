// Zero-dependency static server for the built site (dist/). Listens on PORT (default 3000),
// the port Dokploy routes halonso.digital to.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./dist/", import.meta.url));
const port = Number(process.env.PORT ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif",
  ".woff2": "font/woff2", ".ico": "image/x-icon", ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};
const security = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(root, clean)];
  if (!extname(clean)) candidates.push(join(root, clean, "index.html"), join(root, `${clean}.html`));
  for (const file of candidates) {
    if (!file.startsWith(root)) continue;
    try { if ((await stat(file)).isFile()) return file; } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  try {
    const file = await resolveFile(req.url ?? "/");
    const status = file ? 200 : 404;
    const target = file ?? join(root, "404.html");
    const body = await readFile(target);
    const ext = extname(target);
    const immutable = /\/(_astro|fonts)\//.test(target);
    res.writeHead(status, {
      "Content-Type": types[ext] ?? "application/octet-stream",
      "Cache-Control": immutable ? "public, max-age=31536000, immutable" : ext === ".html" ? "public, max-age=0, must-revalidate" : "public, max-age=3600",
      ...security,
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
    console.error(err);
  }
}).listen(port, "0.0.0.0", () => console.log(`halonso.digital on :${port}`));
