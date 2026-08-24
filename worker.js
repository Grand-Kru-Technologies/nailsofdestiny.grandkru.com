const REALM = 'Nails of Destiny';

function safeEqual(a, b) {
  const ab = new TextEncoder().encode(a);
  const bb = new TextEncoder().encode(b);
  const len = Math.max(ab.length, bb.length);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < len; i++) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function checkAuth(header, env) {
  if (!env.AUTH_USER || !env.AUTH_PASSWORD) return false;
  if (!header) return false;
  const space = header.indexOf(' ');
  if (space < 0 || header.slice(0, space) !== 'Basic') return false;
  let decoded;
  try {
    decoded = atob(header.slice(space + 1));
  } catch {
    return false;
  }
  const colon = decoded.indexOf(':');
  if (colon < 0) return false;
  return (
    safeEqual(decoded.slice(0, colon), env.AUTH_USER) &&
    safeEqual(decoded.slice(colon + 1), env.AUTH_PASSWORD)
  );
}

export default {
  async fetch(request, env) {
    if (!checkAuth(request.headers.get("Authorization"), env)) {
      return unauthorized();
    }
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "private, no-store");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
