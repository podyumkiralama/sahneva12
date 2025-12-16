import { NextResponse } from "next/server";

const EdgeHTMLRewriter = globalThis.HTMLRewriter;

const VOID_TAGS = [
  "meta",
  "link",
  "img",
  "input",
  "br",
  "hr",
  "area",
  "base",
  "col",
  "embed",
  "param",
  "source",
  "track",
  "wbr",
];

const HTML_ACCEPT_HEADER = "text/html";

class VoidElementFormatter {
  element(element) {
    const tagName = element.tagName?.toLowerCase();

    if (!tagName) {
      return;
    }

    const attributes = [];

    for (const [name, rawValue] of element.attributes) {
      const attributeName = name.toLowerCase();
      if (rawValue == null) {
        attributes.push(attributeName);
        continue;
      }

      const value = String(rawValue);

      if (value === "") {
        attributes.push(`${attributeName}=""`);
        continue;
      }

      attributes.push(`${attributeName}="${escapeAttribute(value)}"`);
    }

    const serialized = `<${tagName}${attributes.length ? " " + attributes.join(" ") : ""}>`;
    element.replace(serialized, { html: true });
  }
}

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;");
}

export const config = {
  matcher: ["/:path*"],
};

export default function proxy(request) {
  const accept = request.headers.get("accept");

  if (!accept || !accept.includes(HTML_ACCEPT_HEADER)) {
    return NextResponse.next();
  }

  if (!EdgeHTMLRewriter) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const rewriter = new EdgeHTMLRewriter();

  for (const tag of VOID_TAGS) {
    rewriter.on(tag, new VoidElementFormatter());
  }

  const transformed = rewriter.transform(response);
  transformed.headers.set("content-type", "text/html; charset=utf-8");
  return transformed;
}
