import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/searchIndex";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getSearchIndex());
}
