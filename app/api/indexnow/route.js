export const runtime = "nodejs";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function getSiteOrigin(req) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (siteUrl) return siteUrl;

  const forwardedProto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!host) return null;

  return `${forwardedProto}://${host}`;
}

export async function POST(req) {
  // ✅ Basit auth
  const token = req.headers.get("x-indexnow-token");
  if (!process.env.INDEXNOW_TOKEN || token !== process.env.INDEXNOW_TOKEN) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const indexNowKey = process.env.INDEXNOW_KEY;
  if (!indexNowKey) {
    return new Response(
      JSON.stringify({ ok: false, error: "INDEXNOW_KEY is not configured." }),
      { status: 500, headers: { "content-type": "application/json; charset=utf-8" } }
    );
  }

  const body = await req.json().catch(() => ({}));
  const urls = Array.isArray(body?.urls) ? body.urls : [];

  if (urls.length === 0) {
    return new Response(JSON.stringify({ ok: false, error: "urls array is required." }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  if (urls.length > 10000) {
    return new Response(JSON.stringify({ ok: false, error: "Too many URLs (max 10000)." }), {
      status: 413,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const siteOrigin = getSiteOrigin(req);
  if (!siteOrigin) {
    return new Response(JSON.stringify({ ok: false, error: "Unable to determine site origin." }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const cleanUrls = Array.from(new Set(urls))
    .filter((u) => typeof u === "string")
    .map((u) => u.trim())
    .filter((u) => u.startsWith(siteOrigin) && !u.includes("?") && !u.includes("#"));

  if (cleanUrls.length === 0) {
    return new Response(JSON.stringify({ ok: false, error: "No valid URLs after filtering." }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const payload = {
    host: siteOrigin.replace(/^https?:\/\//, ""),
    key: indexNowKey,
    keyLocation: `${siteOrigin}/${indexNowKey}.txt`,
    urlList: cleanUrls,
  };

  const r = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await r.text().catch(() => "");
  return new Response(text || JSON.stringify({ ok: r.ok }), {
    status: r.status,
    headers: { "content-type": r.headers.get("content-type") ?? "application/json; charset=utf-8" },
  });
}
