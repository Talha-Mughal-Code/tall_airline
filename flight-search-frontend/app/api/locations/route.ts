// app/api/locations/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return NextResponse.json([], { status: 200 });
  }

  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/locations/search?keyword=${keyword}`;

  const res = await fetch(backendUrl, { method: "GET", cache: "no-store" });
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
