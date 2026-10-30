/**
 * RepoBuddy AI — Lightweight Optional Backend Server (Node.js)
 * Serves the static frontend and provides a secure /api/ai proxy route
 * so API keys remain stored in .env on the server and are never exposed in browser code.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const AI_API_URL = process.env.AI_API_URL || "https://openrouter.ai/api/v1/chat/completions";
const AI_API_KEY = process.env.AI_API_KEY || "";
const AI_MODEL = process.env.AI_MODEL || "meta-llama/llama-3.3-70b-instruct:free";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer(async (req, res) => {
  // Secure AI Proxy Endpoint
  if (req.method === "POST" && req.url === "/api/ai") {
    if (!AI_API_KEY) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Server AI_API_KEY is not configured in .env." }));
      return;
    }

    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", async () => {
      try {
        const parsed = JSON.parse(body || "{}");
        const upstreamRes = await fetch(AI_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AI_API_KEY}`
          },
          body: JSON.stringify({
            model: parsed.model || AI_MODEL,
            temperature: 0.2,
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: parsed.systemPrompt || "Respond in valid JSON." },
              { role: "user", content: parsed.userPrompt || "" }
            ]
          })
        });

        const data = await upstreamRes.json();
        res.writeHead(upstreamRes.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "AI proxy request failed", details: err.message }));
      }
    });
    return;
  }

  // Static File Server (Zero external npm dependencies required!)
  let safePath = req.url.split("?")[0];
  if (safePath === "/") safePath = "/index.html";
  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`RepoBuddy AI running at http://localhost:${PORT}`);
});
