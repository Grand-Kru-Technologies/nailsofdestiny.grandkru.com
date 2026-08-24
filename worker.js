const REALM = "Nails of Destiny";
const COOKIE = "nod_auth";

function safeEqual(a, b) {
  const ab = new TextEncoder().encode(String(a ?? ""));
  const bb = new TextEncoder().encode(String(b ?? ""));
  const len = Math.max(ab.length, bb.length);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < len; i++) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

function loginPage(error) {
  const message = error
    ? `<p class="err">That user or password did not match.</p>`
    : `<p class="muted">This preview is gated. Ask Mark if you do not have the pair.</p>`;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Nails of Destiny — preview</title>
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Georgia, "Times New Roman", serif;
        background: #0e120d;
        color: #f3ead8;
      }
      form {
        width: min(22rem, calc(100vw - 2rem));
        padding: 1.5rem;
        border: 1px solid rgba(201, 162, 39, 0.35);
        background: #171d15;
      }
      h1 { font-size: 1.6rem; font-weight: 500; margin: 0 0 0.7rem; }
      p { margin: 0 0 1rem; line-height: 1.45; }
      .muted { color: #c4b59a; font-family: system-ui, sans-serif; font-size: 0.95rem; }
      .err { color: #e8c48a; font-family: system-ui, sans-serif; }
      label { display: block; font-family: system-ui, sans-serif; font-size: 0.8rem; margin: 0.75rem 0 0.35rem; }
      input {
        width: 100%;
        min-height: 48px;
        padding: 0.7rem 0.8rem;
        border: 1px solid rgba(201, 162, 39, 0.35);
        background: #0e120d;
        color: #f3ead8;
        font: 1rem system-ui, sans-serif;
      }
      button {
        margin-top: 1.1rem;
        min-height: 48px;
        width: 100%;
        border: 0;
        background: #c9a227;
        color: #1a1608;
        font: 600 1rem system-ui, sans-serif;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <form method="post" action="/__login">
      <h1>Nails of Destiny</h1>
      ${message}
      <label for="username">User</label>
      <input id="username" name="username" type="text" autocomplete="username" required />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required />
      <button type="submit">Enter</button>
    </form>
  </body>
</html>`;
}

function unauthorized(html) {
  return new Response(html ? loginPage() : "Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}"`,
      "Content-Type": html ? "text/html; charset=utf-8" : "text/plain; charset=utf-8",
      "Cache-Control": "private, no-store",
      "CDN-Cache-Control": "no-store",
    },
  });
}

function wantsHtml(request) {
  const accept = request.headers.get("Accept") || "";
  return accept.includes("text/html");
}

function credentialsMatch(user, password, env) {
  if (!env.AUTH_USER || !env.AUTH_PASSWORD) return false;
  return (
    safeEqual(String(user ?? "").trim(), String(env.AUTH_USER).trim()) &&
    safeEqual(String(password ?? "").trim(), String(env.AUTH_PASSWORD).trim())
  );
}

function fromBasic(header, env) {
  if (!header) return false;
  const space = header.indexOf(" ");
  if (space < 0) return false;
  if (header.slice(0, space).toLowerCase() !== "basic") return false;
  let decoded;
  try {
    decoded = atob(header.slice(space + 1).trim());
  } catch {
    return false;
  }
  const colon = decoded.indexOf(":");
  if (colon < 0) return false;
  return credentialsMatch(decoded.slice(0, colon), decoded.slice(colon + 1), env);
}

function fromCookie(header, env) {
  if (!header) return false;
  const match = header.match(/(?:^|;\s*)nod_auth=([^;]+)/);
  if (!match) return false;
  let decoded;
  try {
    decoded = atob(decodeURIComponent(match[1]));
  } catch {
    return false;
  }
  const colon = decoded.indexOf(":");
  if (colon < 0) return false;
  return credentialsMatch(decoded.slice(0, colon), decoded.slice(colon + 1), env);
}

function sessionCookie(env) {
  const token = encodeURIComponent(btoa(`${env.AUTH_USER}:${env.AUTH_PASSWORD}`));
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`;
}

function isAuthorized(request, env) {
  return fromBasic(request.headers.get("Authorization"), env) || fromCookie(request.headers.get("Cookie"), env);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/__login") {
      const form = await request.formData();
      if (credentialsMatch(form.get("username"), form.get("password"), env)) {
        return new Response(null, {
          status: 303,
          headers: {
            Location: "/",
            "Set-Cookie": sessionCookie(env),
            "Cache-Control": "private, no-store",
          },
        });
      }
      return new Response(loginPage(true), {
        status: 401,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "private, no-store",
          "CDN-Cache-Control": "no-store",
        },
      });
    }

    if (!isAuthorized(request, env)) {
      return unauthorized(wantsHtml(request));
    }

    if (url.pathname === "/__login") {
      return Response.redirect(new URL("/", url), 303);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "private, no-store");
    headers.set("CDN-Cache-Control", "no-store");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
