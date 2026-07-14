/**
 * 零依賴靜態伺服器：供 E2E 測試與本機預覽 `out/`（next build 的靜態輸出）。
 * 用法：node scripts/serve-out.mjs [port]
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.argv[2] ?? process.env.PORT ?? 4173);
const ROOT = join(process.cwd(), "out");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
};

function resolvePath(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(
    /^(\.\.[/\\])+/,
    ""
  );
  const candidates = [
    join(ROOT, clean),
    join(ROOT, clean, "index.html"),
    join(ROOT, `${clean.replace(/\/$/, "")}.html`),
  ];
  for (const candidate of candidates) {
    if (
      candidate.startsWith(ROOT) &&
      existsSync(candidate) &&
      extname(candidate) !== ""
    ) {
      return candidate;
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const filePath = resolvePath(req.url ?? "/") ?? join(ROOT, "404.html");
  try {
    const body = await readFile(filePath);
    const found = !filePath.endsWith("404.html");
    res.writeHead(found ? 200 : 404, {
      "content-type": MIME[extname(filePath)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Serving ./out at http://localhost:${PORT}`);
});
