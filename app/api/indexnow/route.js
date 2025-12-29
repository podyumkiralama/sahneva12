const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function getSiteOrigin(req) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (siteUrl) {
    return siteUrl;
  }

  const forwardedProto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");

  if (!host) {
    return null;
  }

  return `${forwardedProto}://${host}`;
}

export async function POST(req) {
  const indexNowKey = process.env.INDEXNOW_KEY;

  if (!indexNowKey) {
    return new Response(
      JSON.stringify({ ok: false, error: "INDEXNOW_KEY is not configured." }),
      { status: 500 },
    );
  }

  const body = await req.json();
  const urlList = Array.isArray(body?.urls) ? body.urls : [];

  if (urlList.length === 0) {
    return new Response(
      JSON.stringify({ ok: false, error: "urls array is required." }),
      { status: 400 },
    );
  }

  const siteOrigin = getSiteOrigin(req);

  if (!siteOrigin) {
    return new Response(
      JSON.stringify({ ok: false, error: "Unable to determine site origin." }),
      { status: 400 },
    );
  }

  const payload = {
    host: siteOrigin.replace(/^https?:\/\//, ""),
    key: indexNowKey,
    keyLocation: `${siteOrigin}/${indexNowKey}.txt`,
    urlList,
  };

  const indexNowResponse = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await indexNowResponse.text();

  return new Response(responseText, {
    status: indexNowResponse.status,
    headers: {
      "content-type": indexNowResponse.headers.get("content-type") ?? "text/plain",
    },
  });
}
