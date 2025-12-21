#!/usr/bin/env node

const DEFAULT_ROUTES = ["/", "/sss", "/sahne-kiralama"];

const BASE_URL = process.env.BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";
const ROUTES = (process.env.COVERAGE_ROUTES || "")
  .split(",")
  .map((route) => route.trim())
  .filter(Boolean);

const targets = ROUTES.length ? ROUTES : DEFAULT_ROUTES;

const loadChromium = async () => {
  try {
    const { chromium } = await import("playwright");
    return chromium;
  } catch (error) {
    console.error(
      "Playwright is required for CSS coverage. Install it with `npm install -D playwright` before running this script.",
    );
    throw error;
  }
};

const labelForSheet = (header, id) => {
  if (!header) return `unknown@${id}`;
  if (header.sourceURL) return header.sourceURL;
  if (header.isInline) return `${header.frameId || "inline"}@${id}`;
  return header.origin || `stylesheet@${id}`;
};

const mergeRanges = (ranges) => {
  if (!ranges.length) return [];
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i += 1) {
    const [start, end] = sorted[i];
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
};

const calculateCoverage = (ruleUsage, sheetHeaders, sheetTexts) => {
  const usageBySheet = new Map();

  for (const { styleSheetId, startOffset, endOffset, used } of ruleUsage) {
    if (!usageBySheet.has(styleSheetId)) {
      usageBySheet.set(styleSheetId, { usedRanges: [] });
    }
    if (used) {
      usageBySheet.get(styleSheetId).usedRanges.push([startOffset, endOffset]);
    }
  }

  return Array.from(usageBySheet.entries()).map(([styleSheetId, { usedRanges }]) => {
    const text = sheetTexts.get(styleSheetId) || "";
    const header = sheetHeaders.get(styleSheetId);
    const totalBytes = Buffer.byteLength(text, "utf8");
    const mergedRanges = mergeRanges(usedRanges);
    const usedBytes = mergedRanges.reduce((sum, [start, end]) => sum + (end - start), 0);
    const unusedBytes = Math.max(totalBytes - usedBytes, 0);

    return {
      styleSheetId,
      label: labelForSheet(header, styleSheetId),
      totalBytes,
      usedBytes,
      unusedBytes,
    };
  });
};

async function getSheetTexts(client, sheetIds) {
  const sheetTexts = new Map();
  for (const styleSheetId of sheetIds) {
    try {
      const { text } = await client.send("CSS.getStyleSheetText", { styleSheetId });
      sheetTexts.set(styleSheetId, text || "");
    } catch {
      sheetTexts.set(styleSheetId, "");
    }
  }
  return sheetTexts;
}

async function main() {
  const chromium = await loadChromium();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const client = await context.newCDPSession(page);

  const sheetHeaders = new Map();
  client.on("CSS.styleSheetAdded", ({ header }) => {
    sheetHeaders.set(header.styleSheetId, header);
  });

  await client.send("DOM.enable");
  await client.send("CSS.enable");

  const summary = [];

  for (const route of targets) {
    const url = `${BASE_URL}${route}`;

    await client.send("CSS.startRuleUsageTracking");
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const { ruleUsage } = await client.send("CSS.stopRuleUsageTracking");

    const sheetIds = [...new Set(ruleUsage.map(({ styleSheetId }) => styleSheetId))];
    const sheetTexts = await getSheetTexts(client, sheetIds);
    const coverage = calculateCoverage(ruleUsage, sheetHeaders, sheetTexts).sort(
      (a, b) => b.unusedBytes - a.unusedBytes,
    );

    summary.push({ route: url, coverage });
  }

  await browser.close();

  console.log("CSS coverage (unused bytes shown high-to-low):");
  for (const { route, coverage } of summary) {
    console.log(`\nRoute: ${route}`);
    coverage
      .filter(({ totalBytes }) => totalBytes > 0)
      .forEach(({ label, totalBytes, usedBytes, unusedBytes }) => {
        const percentUnused = totalBytes ? ((unusedBytes / totalBytes) * 100).toFixed(1) : "0";
        console.log(
          `  - ${label}: ${usedBytes}/${totalBytes} bytes used, ${unusedBytes} bytes unused (${percentUnused}%)`,
        );
      });
  }
}

main().catch((error) => {
  console.error("Failed to collect CSS coverage", error);
  process.exitCode = 1;
});
