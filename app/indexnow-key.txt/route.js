const indexNowKey = process.env.INDEXNOW_KEY;

export function GET() {
  if (!indexNowKey) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(indexNowKey, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
